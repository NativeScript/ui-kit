package org.nativescript.widgets

import android.content.Context
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

	internal fun notifyDeleted(provider: String, appWidgetIds: IntArray) {
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

	fun updateAppWidget(context: Context, provider: String, root: RemoteViews) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		val component = android.content.ComponentName(context, provider)
		val ids = mgr.getAppWidgetIds(component)
		if (ids.isEmpty()) return
		val rv = root.build(context, provider) ?: return
		val adapterViewIds = root.manager?.adapterViewIds
		for (id in ids) {
			mgr.updateAppWidget(id, rv)
			adapterViewIds?.forEach { viewId ->
				mgr.notifyAppWidgetViewDataChanged(id, viewId)
			}
		}
	}

	@JvmOverloads
	fun updateAppWidget(context: Context, provider: String, widgetId: Int, root: RemoteViews) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		val rv = root.build(context, provider) ?: return
		mgr.updateAppWidget(widgetId, rv)
		root.manager?.adapterViewIds?.forEach { viewId ->
			mgr.notifyAppWidgetViewDataChanged(widgetId, viewId)
		}
	}

	@JvmOverloads
	fun updateAppWidget(context: Context, provider: String, widgetIds: IntArray, root: RemoteViews) {
		val mgr = android.appwidget.AppWidgetManager.getInstance(context)
		val rv = root.build(context, provider) ?: return
		val adapterViewIds = root.manager?.adapterViewIds
		for (id in widgetIds) {
			mgr.updateAppWidget(id, rv)
			adapterViewIds?.forEach { viewId ->
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
