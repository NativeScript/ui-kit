package org.nativescript.widgets

import android.content.Context
import android.content.Intent
import android.widget.RemoteViewsService
import java.util.concurrent.ConcurrentHashMap

class RemoteViewsListService : RemoteViewsService() {

	data class ListData(
		val items: List<android.widget.RemoteViews>,
		val viewTypeCount: Int
	)

	companion object {
		private const val TAG = "RemoteViewsListService"
		private val itemsRegistry =
			ConcurrentHashMap<String, ListData>()

		const val EXTRA_KEY = "ns_list_key"

		fun registerItems(key: String, items: List<android.widget.RemoteViews>, viewTypeCount: Int) {
			itemsRegistry[key] = ListData(items, viewTypeCount)
		}

		fun unregisterItems(key: String) {
			itemsRegistry.remove(key)
		}

		fun getListData(key: String): ListData? {
			val data = itemsRegistry[key]
			return data
		}

		fun cleanupKeys(keys: Collection<String>) {
			for (key in keys) {
				itemsRegistry.remove(key)
			}
		}
	}

	override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
		val key = intent.getStringExtra(EXTRA_KEY) ?: ""
		return ListRemoteViewsFactory(applicationContext, key)
	}

	private class ListRemoteViewsFactory(
		private val context: Context,
		private val key: String
	) : RemoteViewsService.RemoteViewsFactory {

		private var items: List<android.widget.RemoteViews> = emptyList()
		private var viewTypeCount: Int = 1

		override fun onCreate() {
			val data = itemsRegistry[key]
			items = data?.items ?: emptyList()
			viewTypeCount = data?.viewTypeCount ?: 1
		}

		override fun onDataSetChanged() {
			val data = itemsRegistry[key]
			items = data?.items ?: emptyList()
			viewTypeCount = data?.viewTypeCount ?: 1
		}

		override fun onDestroy() {
		}

		override fun getCount(): Int {
			return items.size
		}

		override fun getViewAt(position: Int): android.widget.RemoteViews? {
			if (position < 0 || position >= items.size) return null
			return items[position]
		}

		override fun getLoadingView(): android.widget.RemoteViews? = null

		override fun getViewTypeCount(): Int {
			return viewTypeCount
		}

		override fun getItemId(position: Int): Long = position.toLong()

		override fun hasStableIds(): Boolean = true
	}
}
