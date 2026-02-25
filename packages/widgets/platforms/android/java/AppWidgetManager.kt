package org.nativescript.widgets

import android.content.Context
import android.os.Build
import android.os.Bundle
import java.util.concurrent.ConcurrentHashMap

object AppWidgetManager {

	interface WidgetListener {
		fun onEnabled(provider: String) {}

		fun onUpdate(
			context: Context,
			provider: String,
			appWidgetIds: IntArray,
			manager: RemoteViewsManager,
			widgetManager: android.appwidget.AppWidgetManager?
		) {
		}


		fun onUpdateAsync(
			context: Context,
			provider: String,
			appWidgetIds: IntArray,
			manager: RemoteViewsManager,
			widgetManager: android.appwidget.AppWidgetManager?
		) {
		}

		fun onDisabled(provider: String) {}
		fun onDeleted(provider: String, appWidgetIds: IntArray) {}
		fun onOptionsChanged(
			context: Context,
			provider: String,
			appWidgetId: Int,
			newOptions: Bundle,
			manager: RemoteViewsManager,
			widgetManager: android.appwidget.AppWidgetManager?
		) {
		}

		fun onAction(
			context: Context,
			provider: String,
			action: String,
			extras: Bundle?
		) {
		}
	}

	private val listeners = ConcurrentHashMap<String, WidgetListener>()
	private val managers = ConcurrentHashMap<String, RemoteViewsManager>()

	// Pre-S: cached platform RemoteViews for immediate compound button updates, keyed by appWidgetId
	private val cachedRootRvs = ConcurrentHashMap<Int, android.widget.RemoteViews>()
	private val compoundButtonCaches = ConcurrentHashMap<Int, MutableMap<String, android.widget.RemoteViews>>()

	fun getCachedRootRv(widgetId: Int): android.widget.RemoteViews? = cachedRootRvs[widgetId]
	fun getCachedCompoundButton(widgetId: Int, nodeId: String): android.widget.RemoteViews? =
		compoundButtonCaches[widgetId]?.get(nodeId)

	// Pre-S: persist compound button checked state across reboots via SharedPreferences
	private const val PREFS_NAME = "ns_widget_checked_state"

	private fun checkedPrefs(context: Context) =
		context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

	private fun checkedKey(widgetId: Int, nodeId: String) = "${widgetId}_${nodeId}"

	fun getCheckedState(context: Context, widgetId: Int, nodeId: String): Boolean =
		checkedPrefs(context).getBoolean(checkedKey(widgetId, nodeId), false)

	fun setCheckedState(context: Context, widgetId: Int, nodeId: String, checked: Boolean) {
		checkedPrefs(context).edit().putBoolean(checkedKey(widgetId, nodeId), checked).apply()
	}

	private fun clearCheckedStates(context: Context, widgetId: Int) {
		val prefs = checkedPrefs(context)
		val prefix = "${widgetId}_"
		val editor = prefs.edit()
		prefs.all.keys.filter { it.startsWith(prefix) }.forEach { editor.remove(it) }
		editor.apply()
	}

	// Queued events that arrived before a listener was registered
	private sealed class PendingEvent {
		data class Update(
			val context: Context,
			val appWidgetIds: IntArray,
			val manager: RemoteViewsManager,
			val widgetManager: android.appwidget.AppWidgetManager?
		) : PendingEvent()

		data class Action(
			val context: Context,
			val action: String,
			val extras: Bundle?
		) : PendingEvent()
	}

	private val pendingEvents = ConcurrentHashMap<String, MutableList<PendingEvent>>()

	fun register(providerClass: String, listener: WidgetListener) {
		listeners[providerClass] = listener

		// Replay any queued events
		pendingEvents.remove(providerClass)?.forEach { event ->
			when (event) {
				is PendingEvent.Update -> listener.onUpdate(
					event.context, providerClass, event.appWidgetIds,
					event.manager, event.widgetManager
				)
				is PendingEvent.Action -> listener.onAction(
					event.context, providerClass, event.action, event.extras
				)
			}
		}
	}

	fun unregister(providerClass: String) {
		listeners.remove(providerClass)
		managers.remove(providerClass)
		pendingEvents.remove(providerClass)
	}

	fun getManager(providerClass: String): RemoteViewsManager {
		return managers.getOrPut(providerClass) { RemoteViewsManager() }
	}

	private fun queueEvent(provider: String, event: PendingEvent) {
		pendingEvents.getOrPut(provider) { mutableListOf() }.add(event)
	}

	internal fun notifyUpdate(
		context: Context,
		provider: String,
		appWidgetIds: IntArray,
		manager: RemoteViewsManager,
		widgetManager: android.appwidget.AppWidgetManager?
	) {
		val listener = listeners[provider]
		if (listener != null) {
			listener.onUpdate(context, provider, appWidgetIds, manager, widgetManager)
		} else {
			queueEvent(provider, PendingEvent.Update(context, appWidgetIds, manager, widgetManager))
		}
	}

	internal fun notifyUpdateAsync(
		context: Context,
		provider: String,
		appWidgetIds: IntArray,
		manager: RemoteViewsManager,
		widgetManager: android.appwidget.AppWidgetManager?
	) {
		val listener = listeners[provider]
		if (listener != null) {
			listener.onUpdateAsync(context, provider, appWidgetIds, manager, widgetManager)
		} else {
			queueEvent(provider, PendingEvent.Update(context, appWidgetIds, manager, widgetManager))
		}
	}

	internal fun notifyEnabled(provider: String) {
		listeners[provider]?.onEnabled(provider)
	}

	internal fun notifyDisabled(provider: String) {
		listeners[provider]?.onDisabled(provider)
	}

	internal fun notifyDeleted(context: Context, provider: String, appWidgetIds: IntArray) {
		for (id in appWidgetIds) {
			cachedRootRvs.remove(id)
			compoundButtonCaches.remove(id)
			clearCheckedStates(context, id)
		}
		listeners[provider]?.onDeleted(provider, appWidgetIds)
	}

	internal fun notifyAction(
		context: Context,
		provider: String,
		action: String,
		extras: Bundle?
	) {
		val listener = listeners[provider]
		if (listener != null) {
			listener.onAction(context, provider, action, extras)
		} else {
			queueEvent(provider, PendingEvent.Action(context, action, extras))
		}
	}

	internal fun notifyOptionsChanged(
		context: Context,
		provider: String,
		appWidgetId: Int,
		newOptions: Bundle,
		manager: RemoteViewsManager,
		widgetManager: android.appwidget.AppWidgetManager?,
	) {
		listeners[provider]?.onOptionsChanged(
			context,
			provider,
			appWidgetId,
			newOptions,
			manager,
			widgetManager
		)
	}

	private fun cachePreS(widgetId: Int, rv: android.widget.RemoteViews, root: RemoteViews) {
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			cachedRootRvs[widgetId] = rv
			root.manager?.compoundButtonCache?.let { cache ->
				compoundButtonCaches[widgetId] = HashMap(cache)
			}
		}
	}

	private fun buildForWidget(
		widgetId: Int,
		root: RemoteViews,
		context: Context,
		provider: String
	): android.widget.RemoteViews? {
		RemoteViews.buildAppWidgetId = widgetId
		try {
			val rv = root.build(context, provider) ?: return null
			cachePreS(widgetId, rv, root)
			return rv
		} finally {
			RemoteViews.buildAppWidgetId = 0
		}
	}

	fun updateAppWidget(context: Context, provider: String, root: RemoteViews) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		val component = android.content.ComponentName(context, provider)
		val ids = mgr.getAppWidgetIds(component)
		if (ids.isEmpty()) return
		for (id in ids) {
			val rv = buildForWidget(id, root, context, provider) ?: continue
			mgr.updateAppWidget(id, rv)
			root.manager?.adapterViewIds?.forEach { viewId ->
				mgr.notifyAppWidgetViewDataChanged(id, viewId)
			}
		}
	}

	@JvmOverloads
	fun updateAppWidget(context: Context, provider: String, widgetId: Int, root: RemoteViews) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		val rv = buildForWidget(widgetId, root, context, provider) ?: return
		mgr.updateAppWidget(widgetId, rv)
		root.manager?.adapterViewIds?.forEach { viewId ->
			mgr.notifyAppWidgetViewDataChanged(widgetId, viewId)
		}
	}

	@JvmOverloads
	fun updateAppWidget(context: Context, provider: String, widgetIds: IntArray, root: RemoteViews) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		for (id in widgetIds) {
			val rv = buildForWidget(id, root, context, provider) ?: continue
			mgr.updateAppWidget(id, rv)
			root.manager?.adapterViewIds?.forEach { viewId ->
				mgr.notifyAppWidgetViewDataChanged(id, viewId)
			}
		}
	}

	fun notifyDataChanged(context: Context, provider: String, viewId: Int) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		val component = android.content.ComponentName(context, provider)
		val ids = mgr.getAppWidgetIds(component)
		for (id in ids) {
			mgr.notifyAppWidgetViewDataChanged(id, viewId)
		}
	}

	fun notifyDataChanged(context: Context, widgetId: Int, viewId: Int) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		mgr.notifyAppWidgetViewDataChanged(widgetId, viewId)
	}
}
