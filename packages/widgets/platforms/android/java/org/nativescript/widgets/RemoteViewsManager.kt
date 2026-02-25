package org.nativescript.widgets

import android.app.PendingIntent
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build

class RemoteViewsManager {
	companion object {
		private const val TAG = "RemoteViewsManager"
	}
	
	private val nodes = mutableMapOf<String, RemoteViews>()
	private val parents = mutableMapOf<String, String?>()
	private val children = mutableMapOf<String, MutableList<String>>()
	private val registeredServiceKeys = mutableSetOf<String>()
	internal val adapterViewIds = mutableListOf<Int>()

	// Pre-S: cached platform RemoteViews for immediate compound button updates
	internal var cachedRootRv: android.widget.RemoteViews? = null
	internal val compoundButtonCache = mutableMapOf<String, android.widget.RemoteViews>()

	// Pending adapter setups to apply to the root RemoteViews
	private data class PendingAdapter(
		val viewId: Int,
		val items: android.widget.RemoteViews.RemoteCollectionItems?,
		val serviceIntent: Intent?,
		val pendingIntentTemplate: PendingIntent?
	)
	private val pendingAdapters = mutableListOf<PendingAdapter>()

	fun add(node: RemoteViews, parentId: String? = null) {
		val id = node.id
		val oldManager = node.manager

		node.manager = this
		nodes[id] = node
		parents[id] = parentId
		children[id] = mutableListOf()

		// register as child of parent
		parentId?.let { children[it]?.add(id) }

		// migrate children from old manager when re-parenting across managers
		if (oldManager != null && oldManager !== this) {
			migrateChildren(oldManager, id)
		}
	}

	private fun migrateChildren(oldManager: RemoteViewsManager, parentId: String) {
		val oldChildren = oldManager.children[parentId] ?: return
		for (childId in oldChildren) {
			val childNode = oldManager.nodes[childId] ?: continue
			childNode.manager = this
			nodes[childId] = childNode
			parents[childId] = parentId
			children[parentId]?.add(childId)
			children[childId] = mutableListOf()
			// recursively migrate grandchildren
			migrateChildren(oldManager, childId)
		}
	}

	fun remove(id: String) {
		// detach from parent
		parents[id]?.let { parentId ->
			children[parentId]?.remove(id)
		}
		// reparent children to null or could reparent to grandparent
		children[id]?.forEach { childId ->
			parents[childId] = null
		}
		nodes[id]?.manager = null
		nodes.remove(id)
		parents.remove(id)
		children.remove(id)
	}

	fun reparent(id: String, newParentId: String?) {
		// detach from old parent
		parents[id]?.let { oldParentId ->
			children[oldParentId]?.remove(id)
		}
		// attach to new parent
		parents[id] = newParentId
		newParentId?.let { children[it]?.add(id) }
	}

	fun getById(id: String): RemoteViews? = nodes[id]

	fun findViewById(parentId: String, targetId: String): RemoteViews? {
		if (parentId == targetId) return nodes[parentId]
		children[parentId]?.forEach { childId ->
			if (childId == targetId) return nodes[childId]
			val found = findViewById(childId, targetId)
			if (found != null) return found
		}
		return null
	}

	fun getChildren(id: String): List<RemoteViews> {
		return children[id]?.mapNotNull { nodes[it] } ?: emptyList()
	}

	fun getParent(id: String): RemoteViews? {
		return parents[id]?.let { nodes[it] }
	}

	fun resolveRemoteResources() {
		for (node in nodes.values) {
			val iterator = node.commands.entries.iterator()
			val resolved = mutableMapOf<String, RemoteViews.Command>()
			while (iterator.hasNext()) {
				val entry = iterator.next()
				val cmd = entry.value
				if (cmd is RemoteViews.Command.SetImageUrl) {
					val bitmap = cmd.resolve()
					if (bitmap != null) {
						resolved[entry.key] = bitmap
					} else {
						iterator.remove()
					}
				}
			}
			node.commands.putAll(resolved)
		}
	}

	private fun preBuild() {
		cleanupServiceKeys()
		adapterViewIds.clear()
		pendingAdapters.clear()
		compoundButtonCache.clear()
	}

	private fun postBuild(rv: android.widget.RemoteViews): android.widget.RemoteViews {
		applyPendingAdapters(rv)
		cachedRootRv = rv
		return rv
	}

	fun build(packageName: String): android.widget.RemoteViews? {
		val rootId = parents.entries.firstOrNull { it.value == null }?.key ?: return null
		val root = nodes[rootId] ?: return null
		preBuild()
		val rv = buildNode(rootId, packageName, root)
		return postBuild(rv)
	}

	fun build(rootId: String, packageName: String): android.widget.RemoteViews? {
		val root = nodes[rootId] ?: return null
		preBuild()
		val rv = buildNode(rootId, packageName, root)
		return postBuild(rv)
	}

	fun build(context: Context, providerClass: String): android.widget.RemoteViews? {
		val rootId = parents.entries.firstOrNull { it.value == null }?.key ?: return null
		val root = nodes[rootId] ?: return null
		preBuild()
		RemoteViews.buildContext = context
		RemoteViews.buildProviderClass = providerClass
		try {
			val rv = buildNode(rootId, context.packageName, root)
			return postBuild(rv)
		} finally {
			RemoteViews.buildContext = null
			RemoteViews.buildProviderClass = null
		}
	}

	fun build(rootId: String, context: Context, providerClass: String): android.widget.RemoteViews? {
		val root = nodes[rootId] ?: return null
		preBuild()
		RemoteViews.buildContext = context
		RemoteViews.buildProviderClass = providerClass
		try {
			val rv = buildNode(rootId, context.packageName, root)
			return postBuild(rv)
		} finally {
			RemoteViews.buildContext = null
			RemoteViews.buildProviderClass = null
		}
	}
	
	private fun applyPendingAdapters(rootRv: android.widget.RemoteViews) {
		for (pending in pendingAdapters) {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && pending.items != null) {
				rootRv.setRemoteAdapter(pending.viewId, pending.items)
			} else if (pending.serviceIntent != null) {
				@Suppress("DEPRECATION")
				rootRv.setRemoteAdapter(pending.viewId, pending.serviceIntent)
			}
			pending.pendingIntentTemplate?.let { pi ->
				rootRv.setPendingIntentTemplate(pending.viewId, pi)
			}
		}
		pendingAdapters.clear()
	}

	fun cleanup() {
		cleanupServiceKeys()
	}

	private fun cleanupServiceKeys() {
		if (registeredServiceKeys.isNotEmpty()) {
			RemoteViewsListService.cleanupKeys(registeredServiceKeys)
			registeredServiceKeys.clear()
		}
	}

	internal fun buildNode(
		id: String,
		packageName: String,
		node: RemoteViews
	): android.widget.RemoteViews {

		if (node is RemoteViews.AdapterLike) {
			val adapterItems = node.getAdapterItems()
			val emptyView = node.getEmptyView()

			// If no items and an empty view is provided, render the empty view instead
			if (adapterItems.isEmpty() && emptyView != null) {
				return emptyView.build(packageName) ?: emptyView.buildSelf(packageName)
			}

			val rv = node.buildSelf(packageName)

			if (adapterItems.isNotEmpty()) {
				// Set flag so all nested buildSelf calls use collection-safe mode
				RemoteViews.buildForCollection = true
				val builtItems = try {
					adapterItems.mapIndexed { index, item ->
						// Use buildNode directly for items with children (NOT build() which clears pendingAdapters!)
						val built = when {
							// Item has its own manager with children - build through that manager
							item.manager != null && item.manager !== this -> {
								item.manager!!.buildNode(item.id, packageName, item)
							}
							// Item is registered in this manager with children - use this buildNode
							nodes.containsKey(item.id) && children[item.id]?.isNotEmpty() == true -> {
								buildNode(item.id, packageName, item)
							}
							// Simple item without children - just buildSelf
							else -> {
								item.buildSelf(packageName)
							}
						}
						built
					}
				} finally {
					RemoteViews.buildForCollection = false
				}

				val viewTypeCount = builtItems.map { it.layoutId }.distinct().count().coerceAtLeast(1)

				// Build pending intent template if any item has onItemClick
				var pendingIntentTemplate: PendingIntent? = null
				val ctx = RemoteViews.buildContext
				val providerClass = RemoteViews.buildProviderClass
				if (ctx != null && providerClass != null) {
					val hasItemClicks = adapterItems.any { it.commands.containsKey("onItemClick") }
					if (hasItemClicks) {
						val templateIntent = Intent(RemoteViews.ACTION_CLICK).apply {
							component = ComponentName(ctx, providerClass)
						}
						val flags = PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
						pendingIntentTemplate = PendingIntent.getBroadcast(ctx, node.id.hashCode() and 0x7FFFFFFF, templateIntent, flags)
					}
				}

				// Queue adapter setup to be applied to root RemoteViews later
				// (setRemoteAdapter must be called on the widget root, not on the ListView itself)
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
					val builder = android.widget.RemoteViews.RemoteCollectionItems.Builder()
					builtItems.forEachIndexed { index, itemRv ->
						builder.addItem(index.toLong(), itemRv)
					}
					builder.setViewTypeCount(viewTypeCount)
					builder.setHasStableIds(true)
					val collectionItems = builder.build()
					pendingAdapters.add(PendingAdapter(node.stableId!!, collectionItems, null, pendingIntentTemplate))
				} else {
					val key = "${packageName}_${node.id}"
					RemoteViewsListService.registerItems(key, builtItems, viewTypeCount)
					registeredServiceKeys.add(key)

					val intent = Intent().apply {
						component = ComponentName(
							packageName,
							"org.nativescript.widgets.RemoteViewsListService"
						)
						putExtra(RemoteViewsListService.EXTRA_KEY, key)
						data = Uri.parse("ns://list/${node.id}")
					}
					pendingAdapters.add(PendingAdapter(node.stableId!!, null, intent, pendingIntentTemplate))
				}

				adapterViewIds.add(node.stableId!!)
			}
			return rv
		}

		val rv = node.buildSelf(packageName)

		// Pre-S: cache compound button RVs for immediate checked drawable updates
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S && node is RemoteViews.CompoundButtonLike) {
			compoundButtonCache[id] = rv
		}

		val childIds = children[id]
		if (!childIds.isNullOrEmpty()) {
			// Clear existing children before adding new ones.
			// This is essential for collection items where Android reuses views
			// via reapply(), which would otherwise accumulate stale children.
			rv.removeAllViews(node.stableId!!)
			childIds.forEach { childId ->
				val childNode = nodes[childId] ?: return@forEach
				val childRv = buildNode(childId, packageName, childNode)
				rv.addView(node.stableId!!, childRv)
			}
		}
		return rv
	}
}
