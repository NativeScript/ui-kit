package org.nativescript.widgets

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import androidx.work.WorkerParameters

open class AppWidgetProvider : android.appwidget.AppWidgetProvider() {
	private val providerName = this::class.java.name
	open val interval = 900000L

	override fun onReceive(context: Context, intent: Intent) {
		if (intent.action == RemoteViews.ACTION_CLICK) {
			val action = intent.getStringExtra(RemoteViews.EXTRA_CLICK_ACTION) ?: return
			val extras = intent.getBundleExtra(RemoteViews.EXTRA_CLICK_EXTRAS)
			AppWidgetManager.notifyAction(context, providerName, action, extras)
			return
		}


		if (intent.action == RemoteViews.ACTION_CHECK) {

			val action = intent.getStringExtra(RemoteViews.EXTRA_CHECK_ACTION) ?: return
			val extras = intent.getBundleExtra(RemoteViews.EXTRA_CHECK_EXTRAS) ?: Bundle()
			val checked: Boolean

			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				checked = intent.extras?.getBoolean(android.widget.RemoteViews.EXTRA_CHECKED, false) ?: false
			} else {
				// Pre-S: read persisted state from SharedPreferences and toggle it
				val widgetId = intent.getIntExtra(RemoteViews.EXTRA_WIDGET_ID, 0)
				val nodeId = intent.data?.pathSegments?.getOrNull(0)
				val layoutType = intent.getStringExtra(RemoteViews.EXTRA_LAYOUT_TYPE)

				if (widgetId != 0 && nodeId != null) {
					val currentState = AppWidgetManager.getCheckedState(context, widgetId, nodeId)
					checked = !currentState
					AppWidgetManager.setCheckedState(context, widgetId, nodeId, checked)
				} else {
					checked = false
				}

				// Ensure cache is warm, then swap the drawable for instant feedback
				if (widgetId != 0 && nodeId != null && layoutType != null) {
					// Rebuild if cache is cold (reboot / process death)
					if (AppWidgetManager.getCachedRootRv(widgetId) == null) {
						val manager = AppWidgetManager.getManager(providerName)
						AppWidgetManager.notifyUpdate(
							context, providerName, intArrayOf(widgetId),
							manager, android.appwidget.AppWidgetManager.getInstance(context)
						)
					}

					val cachedChildRv = AppWidgetManager.getCachedCompoundButton(widgetId, nodeId)
					val cachedRoot = AppWidgetManager.getCachedRootRv(widgetId)

					if (cachedChildRv != null && cachedRoot != null) {
						val viewId = when (layoutType) {
							"CheckBox" -> R.id.ns_remote_view_checkbox_compat
							"RadioButton" -> R.id.ns_remote_view_radio_button_compat
							"Switch" -> R.id.ns_remote_view_switch_compat
							else -> null
						}
						val drawableRes = when (layoutType) {
							"CheckBox" -> if (checked) R.drawable.ns_checkbox_on else R.drawable.ns_checkbox_off
							"RadioButton" -> if (checked) R.drawable.ns_radio_on else R.drawable.ns_radio_off
							"Switch" -> if (checked) R.drawable.ns_switch_on else R.drawable.ns_switch_off
							else -> null
						}

						if (viewId != null && drawableRes != null) {
							cachedChildRv.setImageViewResource(viewId, drawableRes)
							val appWidgetMgr = android.appwidget.AppWidgetManager.getInstance(context)
							appWidgetMgr.updateAppWidget(widgetId, cachedRoot)
						}
					}
				}
			}

			extras.putBoolean(RemoteViews.CHECKED_VALUE, checked)
			AppWidgetManager.notifyAction(context, providerName, action, extras)
			return
		}

		if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
			val appWidgetMgr = android.appwidget.AppWidgetManager.getInstance(context)
			val component = ComponentName(context, providerName)
			val ids = appWidgetMgr.getAppWidgetIds(component)
			if (ids.isNotEmpty()) {
				onUpdate(context, appWidgetMgr, ids)
			}
			return
		}

		super.onReceive(context, intent)
	}

	internal class WidgetWorker(
		context: Context,
		params: WorkerParameters
	) : AppWidgetWorker(context, params) {
		override fun doWork(): Result {
			val appWidgetManager = android.appwidget.AppWidgetManager.getInstance(applicationContext)
			val component = ComponentName(
				applicationContext, this.provider
			)
			val ids = appWidgetManager.getAppWidgetIds(component)
			if (ids.isEmpty()) {
				cancelPeriodic(
					applicationContext,
					this.provider
				)
				return Result.success()
			}

			val manager = AppWidgetManager.getManager(this.provider)
			AppWidgetManager.notifyUpdateAsync(
				applicationContext,
				this.provider,
				ids,
				manager,
				appWidgetManager
			)

			return Result.success()
		}
	}

	override fun onEnabled(context: Context) {
		super.onEnabled(context)
		AppWidgetManager.notifyEnabled(providerName)
		AppWidgetWorker.enqueuePeriodic<WidgetWorker>(context, providerName, intArrayOf(), interval)
	}

	override fun onUpdate(
		context: Context?,
		appWidgetManager: android.appwidget.AppWidgetManager?,
		appWidgetIds: IntArray?
	) {
		val context = context ?: return
		val ids = appWidgetIds ?: return
		val manager = AppWidgetManager.getManager(providerName)
		AppWidgetManager.notifyUpdate(
			context,
			providerName,
			ids,
			manager,
			appWidgetManager
		)
		AppWidgetWorker.enqueueImmediate<WidgetWorker>(
			context, providerName, ids
		)
	}

	override fun onDeleted(context: Context?, appWidgetIds: IntArray?) {
		super.onDeleted(context, appWidgetIds)
		val ctx = context ?: return
		appWidgetIds?.let {
			AppWidgetManager.notifyDeleted(ctx, providerName, it)
		}
	}

	override fun onDisabled(context: Context) {
		super.onDisabled(context)
		AppWidgetManager.notifyDisabled(providerName)
		AppWidgetWorker.cancelPeriodic(
			context, providerName
		)
	}


	override fun onAppWidgetOptionsChanged(
		context: Context?,
		appWidgetManager: android.appwidget.AppWidgetManager?,
		appWidgetId: Int,
		newOptions: Bundle?
	) {
		super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions)
		val ctx = context ?: return
		newOptions?.let {
			val manager = AppWidgetManager.getManager(providerName)
			AppWidgetManager.notifyOptionsChanged(
				ctx,
				providerName,
				appWidgetId,
				it,
				manager,
				appWidgetManager
			)
		}
	}
}
