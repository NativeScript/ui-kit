package org.nativescript.widgets

import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.res.Resources
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.util.TypedValue
import java.net.URL
import java.util.concurrent.atomic.AtomicLong
import android.view.View

open class RemoteViews(val layout: Layout, id: String? = null) {

	val id: String = id ?: generateId()

	companion object {
		private const val TAG = "RemoteViews"
		private val counter = AtomicLong(0)
		fun generateId(): String = "ns_rv_${counter.incrementAndGet()}"

		const val ACTION_CLICK = "org.nativescript.widgets.ACTION_CLICK"
		const val EXTRA_CLICK_ACTION = "ns_click_action"
		const val EXTRA_CLICK_EXTRAS = "ns_click_extras"
		const val ACTION_CHECK = "org.nativescript.widgets.ACTION_CHECK"
		const val EXTRA_CHECK_ACTION = "ns_check_action"
		const val EXTRA_CHECK_EXTRAS = "ns_check_extras"
		const val CHECKED_VALUE = "ns_checked_value"
		const val EXTRA_LAYOUT_TYPE = "ns_layout_type"
		const val EXTRA_WIDGET_ID = "ns_widget_id"

		@JvmField
		internal var buildContext: Context? = null
		@JvmField
		internal var buildProviderClass: String? = null
		@JvmField
		internal var buildForCollection: Boolean = false
		@JvmField
		internal var buildAppWidgetId: Int = 0
	}

	internal val commands = mutableMapOf<String, Command>()
	internal var stableId: Int? = null
	internal var manager: RemoteViewsManager? = null
	internal val adapterItemsBackingField: MutableList<RemoteViews> by lazy { mutableListOf() }
	internal var emptyViewBackingField: RemoteViews? = null

	sealed class Command {
		abstract fun applyTo(rv: android.widget.RemoteViews, targetId: Int)

		open fun applyToWithContext(rv: android.widget.RemoteViews, targetId: Int, context: Context) {
			applyTo(rv, targetId)
		}

		data class SetText(val value: String) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setTextViewText(targetId, value)
			}
		}

		data class SetTextColor(val value: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setTextColor(targetId, value)
			}
		}

		data class SetTextSize(val value: Float, val unit: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setTextViewTextSize(targetId, unit, value)
			}
		}

		data class SetImageResource(val resId: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setImageViewResource(targetId, resId)
			}
		}

		data class SetVisibility(val visibility: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setViewVisibility(targetId, visibility)
			}
		}

		data class SetByte(val method: String, val value: Byte) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setByte(targetId, method, value)
			}
		}

		data class SetShort(val method: String, val value: Short) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setShort(targetId, method, value)
			}
		}

		data class SetInt(val method: String, val value: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setInt(targetId, method, value)
			}
		}

		data class SetProgressBar(val max: Int, val progress: Int, val indeterminate: Boolean) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setProgressBar(targetId, max, progress, indeterminate)
			}
		}

		data class SetLong(val method: String, val value: Long) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setLong(targetId, method, value)
			}
		}

		data class SetFloat(val method: String, val value: Float) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setFloat(targetId, method, value)
			}
		}

		data class SetBoolean(val method: String, val value: Boolean) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setBoolean(targetId, method, value)
			}
		}

		data class SetString(val method: String, val value: String) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setString(targetId, method, value)
			}
		}

		data class SetBackgroundColor(val value: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setInt(targetId, "setBackgroundColor", value)
			}
		}


		data class SetImageURI(val value: Uri?) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setImageViewUri(targetId, value)
			}
		}

		data class SetImageBitmap(val value: Bitmap) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setImageViewBitmap(targetId, value)
			}
		}

		data class SetImageUrl(val url: String) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				// no-op: must be resolved via resolveRemoteResources() before build
			}

			fun resolve(): SetImageBitmap? {
				return try {
					val bitmap = URL(url).openStream().use { BitmapFactory.decodeStream(it) }
					bitmap?.let { SetImageBitmap(it) }
				} catch (e: Exception) {
					null
				}
			}
		}

		data class SetOnClickPendingIntent(val intent: PendingIntent) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setOnClickPendingIntent(targetId, intent)
			}
		}

		data class SetPendingIntentTemplate(val intent: PendingIntent) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setPendingIntentTemplate(targetId, intent)
			}
		}

		data class SetOnClickFillInIntent(val intent: Intent) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setOnClickFillInIntent(targetId, intent)
			}
		}

		data class SetOnClickAction(
			val action: String,
			val extras: android.os.Bundle?,
			val nodeId: String
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				// no-op — requires context to create PendingIntent
			}

			override fun applyToWithContext(
				rv: android.widget.RemoteViews,
				targetId: Int,
				context: Context
			) {
				val providerClass = buildProviderClass ?: return
				val intent = Intent(ACTION_CLICK).apply {
					component = android.content.ComponentName(context, providerClass)
					putExtra(EXTRA_CLICK_ACTION, action)
					if (extras != null) {
						putExtra(EXTRA_CLICK_EXTRAS, extras)
					}
					// mark as a click-origin event
					data = Uri.parse("ns://click/$nodeId/$action")
				}
				val requestCode = nodeId.hashCode() and 0x7FFFFFFF
					var flags = PendingIntent.FLAG_UPDATE_CURRENT
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
						flags = flags or PendingIntent.FLAG_MUTABLE
					} else {
						flags = flags or PendingIntent.FLAG_IMMUTABLE
					}
				val pi = PendingIntent.getBroadcast(context, requestCode, intent, flags)
				rv.setOnClickPendingIntent(targetId, pi)
			}
		}

		data class SetOnClickFillInAction(
			val action: String,
			val extras: android.os.Bundle?
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				val fillInIntent = Intent().apply {
					putExtra(EXTRA_CLICK_ACTION, action)
					if (extras != null) putExtra(EXTRA_CLICK_EXTRAS, extras)
				}
				rv.setOnClickFillInIntent(targetId, fillInIntent)
			}
		}

		data class SetWidth(val value: Float, val unit: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
					rv.setViewLayoutWidth(targetId, value, unit)
				} else {
					rv.setInt(
						targetId, "setMinimumWidth", TypedValue.applyDimension(
							unit, value, Resources.getSystem().displayMetrics
						).toInt()
					)
				}
			}
		}

		data class SetHeight(val value: Float, val unit: Int) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
					rv.setViewLayoutHeight(targetId, value, unit)
				} else {
					rv.setInt(
						targetId, "setMinimumHeight", TypedValue.applyDimension(
							unit, value, Resources.getSystem().displayMetrics
						).toInt()
					)
				}
			}
		}

		data class SetSize(
			val width: Float,
			val widthUnit: Int,
			val height: Float,
			val heightUnit: Int
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
					rv.setViewLayoutWidth(targetId, width, widthUnit)
					rv.setViewLayoutHeight(targetId, height, heightUnit)
				} else {
					rv.setInt(
						targetId, "setMinimumWidth", TypedValue.applyDimension(
							widthUnit, width, Resources.getSystem().displayMetrics
						).toInt()
					)

					rv.setInt(
						targetId, "setMinimumHeight", TypedValue.applyDimension(
							heightUnit, height, Resources.getSystem().displayMetrics
						).toInt()
					)
				}
			}
		}

		data class SetWidthDimen(val value: Float, val resource: String, val packageName: String?) :
			Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {}

			@SuppressLint("DiscouragedApi")
			override fun applyToWithContext(
				rv: android.widget.RemoteViews,
				targetId: Int,
				context: Context
			) {
				val res = context.resources.getIdentifier(
					resource, "dimen", packageName ?: context.packageName
				)
				if (res > 0) {
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
						rv.setViewLayoutWidthDimen(
							targetId,
							res
						)
					} else {
						val width = context.resources.getDimensionPixelSize(res)
						rv.setInt(
							targetId, "setMinimumWidth", width
						)
					}
				}
			}
		}

		data class SetHeightDimen(val value: Float, val resource: String, val packageName: String?) :
			Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {}

			@SuppressLint("DiscouragedApi")
			override fun applyToWithContext(
				rv: android.widget.RemoteViews,
				targetId: Int,
				context: Context
			) {
				val res = context.resources.getIdentifier(
					resource, "dimen", packageName ?: context.packageName
				)
				if (res > 0) {
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
						rv.setViewLayoutHeightDimen(
							targetId,
							res
						)
					} else {
						val height = context.resources.getDimensionPixelSize(res)
						rv.setInt(
							targetId, "setMinimumHeight", height
						)
					}
				}
			}
		}

		data class SetSizeDimen(
			val width: Float,
			val widthResource: String,
			val widthPackageName: String?,
			val height: Float,
			val heightResource: String,
			val heightPackageName: String?
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {}

			@SuppressLint("DiscouragedApi")
			override fun applyToWithContext(
				rv: android.widget.RemoteViews,
				targetId: Int,
				context: Context
			) {
				val widthRes = context.resources.getIdentifier(
					widthResource, "dimen", widthPackageName ?: context.packageName
				)
				if (widthRes > 0) {
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
						rv.setViewLayoutWidthDimen(
							targetId,
							widthRes
						)
					} else {
						val width = context.resources.getDimensionPixelSize(widthRes)
						rv.setInt(
							targetId, "setMinimumWidth", width
						)
					}
				}


				val heightRes = context.resources.getIdentifier(
					heightResource, "dimen", heightPackageName ?: context.packageName
				)
				if (heightRes > 0) {
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
						rv.setViewLayoutHeightDimen(
							targetId,
							heightRes
						)
					} else {
						val height = context.resources.getDimensionPixelSize(heightRes)
						rv.setInt(
							targetId, "setMinimumHeight", height
						)
					}
				}
			}
		}

		data class SetPadding(
			val left: Int,
			val top: Int,
			val right: Int,
			val bottom: Int
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setViewPadding(
					targetId, left, top, right, bottom
				)
			}
		}

		data class SetChronometer(
			val base: Long,
			val format: String?,
			val started: Boolean
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setChronometer(targetId, base, format, started)
			}
		}

		data class SetChronometerCountDown(val isCountDown: Boolean) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				rv.setChronometerCountDown(targetId, isCountDown)
			}
		}

		data class SetMargin(
			val left: Int,
			val top: Int,
			val right: Int,
			val bottom: Int
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
					rv.setViewLayoutMargin(targetId, android.widget.RemoteViews.MARGIN_LEFT, left.toFloat(), android.util.TypedValue.COMPLEX_UNIT_PX)
					rv.setViewLayoutMargin(targetId, android.widget.RemoteViews.MARGIN_TOP, top.toFloat(), android.util.TypedValue.COMPLEX_UNIT_PX)
					rv.setViewLayoutMargin(targetId, android.widget.RemoteViews.MARGIN_RIGHT, right.toFloat(), android.util.TypedValue.COMPLEX_UNIT_PX)
					rv.setViewLayoutMargin(targetId, android.widget.RemoteViews.MARGIN_BOTTOM, bottom.toFloat(), android.util.TypedValue.COMPLEX_UNIT_PX)
				}
			}
		}

		data class SetChecked(
			val value: Boolean,
			val layout: Layout
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
					rv.setCompoundButtonChecked(targetId, value)
				} else {
					val drawableRes = when (layout) {
						Layout.CheckBox -> if (value) R.drawable.ns_checkbox_on else R.drawable.ns_checkbox_off
						Layout.RadioButton -> if (value) R.drawable.ns_radio_on else R.drawable.ns_radio_off
						Layout.Switch -> if (value) R.drawable.ns_switch_on else R.drawable.ns_switch_off
						else -> return
					}
					rv.setImageViewResource(targetId, drawableRes)
				}
			}
		}

		data class SetOnCheckAction(
			val action: String,
			val extras: android.os.Bundle?,
			val nodeId: String,
			val checkedState: Boolean = false,
			val layout: Layout = Layout.CheckBox
		) : Command() {
			override fun applyTo(rv: android.widget.RemoteViews, targetId: Int) {
				// no-op — requires context to create PendingIntent
			}

			override fun applyToWithContext(
				rv: android.widget.RemoteViews,
				targetId: Int,
				context: Context
			) {
				val providerClass = buildProviderClass ?: return
				val intent = Intent(ACTION_CHECK).apply {
					component = android.content.ComponentName(context, providerClass)
					putExtra(EXTRA_CHECK_ACTION, action)
					if (extras != null) {
						putExtra(EXTRA_CHECK_EXTRAS, extras)
					}
					// Pre-S: embed layout type and widget ID so the receiver
					// can look up SharedPreferences and update the correct widget
					if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
						putExtra(EXTRA_LAYOUT_TYPE, layout.name)
						if (buildAppWidgetId != 0) {
							putExtra(EXTRA_WIDGET_ID, buildAppWidgetId)
						}
					}
					// mark as a check-origin event
					data = Uri.parse("ns://check/$nodeId/$action")
				}

				val requestCode = nodeId.hashCode() and 0x7FFFFFFF
				var flags = PendingIntent.FLAG_UPDATE_CURRENT
					if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
						flags = flags or PendingIntent.FLAG_MUTABLE
					} else {
						flags = flags or PendingIntent.FLAG_IMMUTABLE
					}

				val pi = PendingIntent.getBroadcast(context, requestCode, intent, flags)
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
          rv.setOnCheckedChangeResponse(
            targetId,
            android.widget.RemoteViews.RemoteResponse.fromPendingIntent(pi)
          )
        } else {
          rv.setOnClickPendingIntent(targetId, pi)
        }
			}
		}

	}

	fun resolveRemoteResources() {
		ensureManager()
		manager?.resolveRemoteResources()
	}

	fun build(packageName: String): android.widget.RemoteViews? {
		ensureManager()
		return manager?.build(id, packageName)
	}

	fun build(context: Context, providerClass: String): android.widget.RemoteViews? {
		ensureManager()
		return manager?.build(id, context, providerClass)
	}

	private fun ensureManager() {
		if (manager == null) {
			val mgr = RemoteViewsManager()
			mgr.add(this)
		}
	}

	internal fun buildSelf(packageName: String, forCollection: Boolean = false): android.widget.RemoteViews {
		val viewId = toViewId()
		val isCollectionItem = forCollection || buildForCollection
		val rv = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
			if(layout == Layout.Root) {
				// Root layout: use 2-param constructor (it IS the widget root)
				stableId = viewId
				android.widget.RemoteViews(packageName, toLayoutId())
			} else if (isCollectionItem) {
				// Collection items: use 2-param constructor for proper view recycling
				stableId = viewId
				android.widget.RemoteViews(packageName, toLayoutId())
			} else {
				// All other views (including AdapterLike): use 3-param constructor with unique ID
				// This enables multiple ListViews with different IDs
				stableId = View.generateViewId()
				android.widget.RemoteViews(packageName, toLayoutId(), stableId!!)
			}

		} else {
			stableId = viewId
			android.widget.RemoteViews(packageName, toLayoutId())
		}
		val ctx = buildContext

		// Pre-S: persist checked state to SharedPreferences and sync into onCheck command
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			val checkedCmd = commands["setChecked"] as? Command.SetChecked
			val checkActionCmd = commands["onCheck"] as? Command.SetOnCheckAction
			if (checkedCmd != null && checkActionCmd != null) {
				commands["onCheck"] = checkActionCmd.copy(checkedState = checkedCmd.value)
				if (ctx != null && buildAppWidgetId != 0) {
					AppWidgetManager.setCheckedState(ctx, buildAppWidgetId, id, checkedCmd.value)
				}
			}
		}

		// Commands target stableId - which is either the XML viewId (2-param) or generated id (3-param)
		if (ctx != null) {
			commands.values.forEach { cmd -> cmd.applyToWithContext(rv, stableId!!, ctx) }
		} else {
			commands.values.forEach { cmd -> cmd.applyTo(rv, stableId!!) }
		}
		return rv
	}

	enum class Layout {
		AdapterViewFlipper,
		Button,
		Chronometer,
		FrameLayout,
		GridLayout,
		GridView,
		ImageButton,
		ImageView,
		LinearLayout,
		HLinearLayout,
		ListView,
		ProgressBar,
		RelativeLayout,
		StackView,
		TextView,
		ViewFlipper,
		TextClock,
		VSpacer,
		VSpacerFixed,
		HSpacer,
		HSpacerFixed,
		Root,
		CheckBox,
		RadioButton,
		Switch
	}

	fun setBackgroundColor(value: Int): RemoteViews {
		commands["setBackgroundColor"] = Command.SetBackgroundColor(value)
		return this
	}

	fun setVisibility(visibility: Int): RemoteViews {
		commands["setVisibility"] = Command.SetVisibility(visibility)
		return this
	}

	fun setString(method: String, value: String): RemoteViews {
		commands["setString:$method"] = Command.SetString(method, value)
		return this
	}

	fun setByte(method: String, value: Byte): RemoteViews {
		commands["setByte:$method"] = Command.SetByte(method, value)
		return this
	}

	fun setInt(method: String, value: Int): RemoteViews {
		commands["setInt:$method"] = Command.SetInt(method, value)
		return this
	}

	fun setShort(method: String, value: Short): RemoteViews {
		commands["setShort:$method"] = Command.SetShort(method, value)
		return this
	}

	fun setLong(method: String, value: Long): RemoteViews {
		commands["setLong:$method"] = Command.SetLong(method, value)
		return this
	}

	fun setFloat(method: String, value: Float): RemoteViews {
		commands["setFloat:$method"] = Command.SetFloat(method, value)
		return this
	}

	fun setBoolean(method: String, value: Boolean): RemoteViews {
		commands["setBoolean:$method"] = Command.SetBoolean(method, value)
		return this
	}

	fun setWidth(value: Float, unit: Int): RemoteViews {
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			widthPx = TypedValue.applyDimension(
				unit, value, Resources.getSystem().displayMetrics
			).toInt()
			recomputePaddingPreS()
		} else {
			commands["setWidth"] = Command.SetWidth(value, unit)
		}
		return this
	}

	fun setHeight(value: Float, unit: Int): RemoteViews {
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			heightPx = TypedValue.applyDimension(
				unit, value, Resources.getSystem().displayMetrics
			).toInt()
			recomputePaddingPreS()
		} else {
			commands["setHeight"] = Command.SetHeight(value, unit)
		}
		return this
	}

	fun setSize(width: Float, widthUnit: Int, height: Float, heightUnit: Int): RemoteViews {
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			widthPx = TypedValue.applyDimension(
				widthUnit, width, Resources.getSystem().displayMetrics
			).toInt()
			heightPx = TypedValue.applyDimension(
				heightUnit, height, Resources.getSystem().displayMetrics
			).toInt()
			recomputePaddingPreS()
		} else {
			commands["setSize"] = Command.SetSize(width, widthUnit, height, heightUnit)
		}
		return this
	}

	fun setPadding(value: Int): RemoteViews {
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			leftPadding = value
			topPadding = value
			rightPadding = value
			bottomPadding = value
			recomputePaddingPreS()
		} else {
			commands["setPadding"] = Command.SetPadding(value, value, value, value)
		}
		return this
	}

	fun setPadding(
		left: Int,
		top: Int,
		right: Int,
		bottom: Int
	): RemoteViews {
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
			leftPadding = left
			topPadding = top
			rightPadding = right
			bottomPadding = bottom
			recomputePaddingPreS()
		} else {
			commands["setPadding"] = Command.SetPadding(left, top, right, bottom)
		}
		return this
	}

	fun setMargin(value: Int): RemoteViews {
		commands["setMargin"] = Command.SetMargin(value, value, value, value)
		return this
	}

	fun setMargin(
		left: Int,
		top: Int,
		right: Int,
		bottom: Int
	): RemoteViews {
		commands["setMargin"] = Command.SetMargin(left, top, right, bottom)
		return this
	}

	fun setOnClickPendingIntent(intent: PendingIntent): RemoteViews {
		commands["setOnClickPendingIntent"] = Command.SetOnClickPendingIntent(intent)
		return this
	}

	fun setPendingIntentTemplate(intent: PendingIntent): RemoteViews {
		commands["setPendingIntentTemplate"] = Command.SetPendingIntentTemplate(intent)
		return this
	}

	fun setOnClickFillInIntent(intent: Intent): RemoteViews {
		commands["setOnClickFillInIntent"] = Command.SetOnClickFillInIntent(intent)
		return this
	}

	@JvmOverloads
	fun onClick(action: String, extras: android.os.Bundle? = null): RemoteViews {
		commands["onClick"] = Command.SetOnClickAction(action, extras, id)
		return this
	}

	@JvmOverloads
	fun onItemClick(action: String, extras: android.os.Bundle? = null): RemoteViews {
		commands["onItemClick"] = Command.SetOnClickFillInAction(action, extras)
		return this
	}

	@JvmOverloads
	fun onCheck(action: String, extras: android.os.Bundle? = null): RemoteViews {
		commands["onCheck"] = Command.SetOnCheckAction(action, extras, id, layout = layout)
		return this
	}

	open fun toLayoutId(): Int {
		return when (layout) {
			Layout.AdapterViewFlipper -> R.layout.ns_remote_views_adapter_view_flipper
			Layout.Button -> R.layout.ns_remote_views_button
			Layout.Chronometer -> R.layout.ns_remote_views_chronometer
			Layout.FrameLayout -> R.layout.ns_remote_views_frame_layout
			Layout.GridLayout -> R.layout.ns_remote_views_grid_layout
			Layout.GridView -> R.layout.ns_remote_views_grid_view
			Layout.ImageButton -> R.layout.ns_remote_views_image_button
			Layout.ImageView -> R.layout.ns_remote_views_image_view
			Layout.LinearLayout -> R.layout.ns_remote_views_linear_layout
			Layout.HLinearLayout -> R.layout.ns_remote_views_linear_layout_horizontal
			Layout.ListView -> R.layout.ns_remote_views_list_view
			Layout.ProgressBar -> R.layout.ns_remote_views_progress_bar
			Layout.RelativeLayout -> R.layout.ns_remote_views_relative_layout
			Layout.StackView -> R.layout.ns_remote_views_stack_view
			Layout.TextView -> R.layout.ns_remote_views_text_view
			Layout.ViewFlipper -> R.layout.ns_remote_views_view_flipper
			Layout.TextClock -> R.layout.ns_remote_views_text_clock
			Layout.HSpacer -> R.layout.ns_remote_views_h_spacer
			Layout.HSpacerFixed -> R.layout.ns_remote_views_h_spacer_fixed
			Layout.VSpacer -> R.layout.ns_remote_views_v_spacer
			Layout.VSpacerFixed -> R.layout.ns_remote_views_v_spacer_fixed
			Layout.Root -> R.layout.ns_remote_views_root_layout
			Layout.CheckBox -> R.layout.ns_remote_views_checkbox_compat
			Layout.RadioButton -> R.layout.ns_remote_views_radio_button_compat
			Layout.Switch -> R.layout.ns_remote_views_switch_compat
		}
	}

	open fun toViewId(): Int {
		return when (layout) {
			Layout.AdapterViewFlipper -> R.id.ns_remote_view_adapter_view_flipper
			Layout.Button -> R.id.ns_remote_view_button
			Layout.Chronometer -> R.id.ns_remote_view_chronometer
			Layout.FrameLayout -> R.id.ns_remote_view_frame_layout
			Layout.GridLayout -> R.id.ns_remote_view_grid_layout
			Layout.GridView -> R.id.ns_remote_view_grid_view
			Layout.ImageButton -> R.id.ns_remote_view_image_button
			Layout.ImageView -> R.id.ns_remote_view_image_view
			Layout.LinearLayout -> R.id.ns_remote_view_linear_layout_vertical
			Layout.HLinearLayout -> R.id.ns_remote_view_linear_layout_horizontal
			Layout.ListView -> R.id.ns_remote_view_list_view
			Layout.ProgressBar -> R.id.ns_remote_view_progress_bar
			Layout.RelativeLayout -> R.id.ns_remote_view_relative_layout
			Layout.StackView -> R.id.ns_remote_view_stack_view
			Layout.TextView -> R.id.ns_remote_view_text_view
			Layout.ViewFlipper -> R.id.ns_remote_view_flipper
			Layout.TextClock -> R.id.ns_remote_view_text_clock
			Layout.HSpacer -> R.id.ns_remote_view_h_spacer
			Layout.HSpacerFixed -> R.id.ns_remote_view_h_spacer_fixed
			Layout.VSpacer -> R.id.ns_remote_view_v_spacer
			Layout.VSpacerFixed -> R.id.ns_remote_view_v_spacer_fixed
			Layout.Root -> R.id.ns_remote_view_root
			Layout.CheckBox -> R.id.ns_remote_view_checkbox_compat
			Layout.RadioButton -> R.id.ns_remote_view_radio_button_compat
			Layout.Switch -> R.id.ns_remote_view_switch_compat
		}
	}

	fun findViewById(id: String): RemoteViews? {
		return manager?.findViewById(this.id, id)
	}

	private var widthPx: Int = 0
	private var heightPx: Int = 0

	private var leftPadding: Int = 0
	private var topPadding: Int = 0
	private var rightPadding: Int = 0
	private var bottomPadding: Int = 0

	private fun recomputePaddingPreS() {
		commands["setPadding"] = Command.SetPadding(
			leftPadding,
			topPadding,
			rightPadding + widthPx,
			bottomPadding + heightPx
		)
	}


	fun getCommands(): MutableMap<String, Command> {
		return commands
	}

	class RootLayout(id: String? = null) : RemoteViews(Layout.Root, id), ViewGroupLike

	class AdapterViewFlipper(id: String? = null) : RemoteViews(Layout.AdapterViewFlipper, id),
		AdapterLike {
		var autoStart: Boolean = false

		fun setAutoStart(value: Boolean): AdapterViewFlipper {
			autoStart = value
			return this
		}

		override fun toLayoutId(): Int {
			return if (autoStart) {
				R.layout.ns_remote_views_adapter_view_flipper_auto
			} else {
				R.layout.ns_remote_views_adapter_view_flipper
			}
		}
	}

	class Button(id: String? = null) : RemoteViews(Layout.Button, id), TextLike

	class Chronometer(id: String? = null) : RemoteViews(Layout.Chronometer, id), TextLike {
		private var base: Long = android.os.SystemClock.elapsedRealtime()
		private var format: String? = null
		private var started: Boolean = false

		private fun updateChronometer(): Chronometer {
			commands["setChronometer"] = Command.SetChronometer(base, format, started)
			return this
		}

		fun setBase(base: Long): Chronometer {
			this.base = base
			return updateChronometer()
		}

		// Set base using Unix timestamp (Date.now() style) - converts to elapsedRealtime
		fun setTargetTime(targetTime: Long): Chronometer {
			val elapsed = android.os.SystemClock.elapsedRealtime()
			val now = System.currentTimeMillis()
			this.base = elapsed + (targetTime - now)
			return updateChronometer()
		}

		fun setFormat(format: String): Chronometer {
			this.format = format
			return updateChronometer()
		}

		fun setCountDown(countDown: Boolean): Chronometer {
			commands["setChronometerCountDown"] = Command.SetChronometerCountDown(countDown)
			return this
		}

		fun start(): Chronometer {
			this.started = true
			return updateChronometer()
		}

		fun stop(): Chronometer {
			this.started = false
			return updateChronometer()
		}
	}

	class FrameLayout(id: String? = null) : RemoteViews(Layout.FrameLayout, id), ViewGroupLike

	class GridLayout(id: String? = null) : RemoteViews(Layout.GridLayout, id), ViewGroupLike

	class GridView(id: String? = null) : RemoteViews(Layout.GridView, id), ViewGroupLike,
		AdapterLike

	class ImageButton(id: String? = null) : RemoteViews(Layout.ImageButton, id), ImageLike

	class ImageView(id: String? = null) : RemoteViews(Layout.ImageView, id), ImageLike

	class LinearLayout(id: String? = null) : RemoteViews(Layout.LinearLayout, id),
		ViewGroupLike {
		var flex: Boolean = false

		fun setFlex(value: Boolean): LinearLayout {
			flex = value
			return this
		}

		override fun toLayoutId(): Int {
			return if (flex) R.layout.ns_remote_views_linear_layout_vertical_flex else super.toLayoutId()
		}

		override fun toViewId(): Int {
			return if (flex) R.id.ns_remote_view_linear_layout_vertical_flex else super.toViewId()
		}
	}

	class HLinearLayout(id: String? = null) : RemoteViews(Layout.HLinearLayout, id),
		ViewGroupLike {
		var flex: Boolean = false

		fun setFlex(value: Boolean): HLinearLayout {
			flex = value
			return this
		}

		override fun toLayoutId(): Int {
			return if (flex) R.layout.ns_remote_views_linear_layout_horizontal_flex else super.toLayoutId()
		}

		override fun toViewId(): Int {
			return if (flex) R.id.ns_remote_view_linear_layout_horizontal_flex else super.toViewId()
		}
	}

	class ListView(id: String? = null) : RemoteViews(Layout.ListView, id), AdapterLike

	class ProgressBar(id: String? = null) : RemoteViews(Layout.ProgressBar, id) {
		private var indeterminate: Boolean = true
		private var max: Int = 100
		private var progress: Int = 0
		var flex: Boolean = false
		var fullWidth: Boolean = false

		fun setProgressBar(max: Int, progress: Int, indeterminate: Boolean): ProgressBar {
			this.max = max
			this.progress = progress
			this.indeterminate = indeterminate
			commands["setProgressBar"] = Command.SetProgressBar(max, progress, indeterminate)
			return this
		}

		fun setFlex(value: Boolean): ProgressBar {
			flex = value
			return this
		}

		fun setFullWidth(value: Boolean): ProgressBar {
			fullWidth = value
			return this
		}

		override fun toLayoutId(): Int {
			return when {
				indeterminate -> R.layout.ns_remote_views_progress_bar
				flex -> R.layout.ns_remote_views_progress_bar_determinate_flex
				fullWidth -> R.layout.ns_remote_views_progress_bar_determinate_full
				else -> R.layout.ns_remote_views_progress_bar_determinate
			}
		}

		override fun toViewId(): Int {
			return when {
				indeterminate -> R.id.ns_remote_view_progress_bar
				flex -> R.id.ns_remote_view_progress_bar_determinate_flex
				fullWidth -> R.id.ns_remote_view_progress_bar_determinate_full
				else -> R.id.ns_remote_view_progress_bar_determinate
			}
		}
	}

	class RelativeLayout(id: String? = null) : RemoteViews(Layout.RelativeLayout, id),
		ViewGroupLike

	class StackView(id: String? = null) : RemoteViews(Layout.StackView, id), ViewGroupLike,
		AdapterLike

	class TextView(id: String? = null) : RemoteViews(Layout.TextView, id), TextLike

	class ViewFlipper(id: String? = null) : RemoteViews(Layout.ViewFlipper, id), ViewGroupLike

	class TextClock(id: String? = null) : RemoteViews(Layout.TextClock, id), TextLike {
		fun setFormat12Hour(format: String?): TextClock {
			if (format != null) {
				commands["setFormat12Hour"] = Command.SetString("setFormat12Hour", format)
			}
			return this
		}

		fun setFormat24Hour(format: String?): TextClock {
			if (format != null) {
				commands["setFormat24Hour"] = Command.SetString("setFormat24Hour", format)
			}
			return this
		}

		fun setTimeZone(timeZone: String?): TextClock {
			if (timeZone != null) {
				commands["setTimeZone"] = Command.SetString("setTimeZone", timeZone)
			}
			return this
		}
	}

	class VSpacer(id: String? = null) : RemoteViews(Layout.VSpacer, id) {
		var fixed: Boolean = false

		fun setFixed(value: Boolean): VSpacer {
			fixed = value
			return this
		}

		override fun toLayoutId(): Int {
			return if (fixed) R.layout.ns_remote_views_v_spacer_fixed else super.toLayoutId()
		}

		override fun toViewId(): Int {
			return if (fixed) R.id.ns_remote_view_v_spacer_fixed else super.toViewId()
		}
	}

	class HSpacer(id: String? = null) : RemoteViews(Layout.HSpacer, id) {
		var fixed: Boolean = false

		fun setFixed(value: Boolean): HSpacer {
			fixed = value
			return this
		}

		override fun toLayoutId(): Int {
			return if (fixed) R.layout.ns_remote_views_h_spacer_fixed else super.toLayoutId()
		}

		override fun toViewId(): Int {
			return if (fixed) R.id.ns_remote_view_h_spacer_fixed else super.toViewId()
		}
	}


	class CheckBox(id: String? = null) : RemoteViews(Layout.CheckBox, id), CompoundButtonLike {

		override fun toLayoutId(): Int {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				return R.layout.ns_remote_views_checkbox
			} else {
				return R.layout.ns_remote_views_checkbox_compat
			 }
		}

		override fun toViewId(): Int {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				return R.id.ns_remote_view_checkbox
			} else {
				return R.id.ns_remote_view_checkbox_compat
			 }
		}
	}

	class RadioButton(id: String? = null) : RemoteViews(Layout.RadioButton, id), CompoundButtonLike {

		override fun toLayoutId(): Int {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				return R.layout.ns_remote_views_radio_button
			} else {
				return R.layout.ns_remote_views_radio_button_compat
			 }
		}

		override fun toViewId(): Int {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				return R.id.ns_remote_view_radio_button
			} else {
				return R.id.ns_remote_view_radio_button_compat
			 }
		}
	}

	class Switch(id: String? = null) : RemoteViews(Layout.Switch, id), CompoundButtonLike {

		override fun toLayoutId(): Int {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				return R.layout.ns_remote_views_switch
			} else {
				return R.layout.ns_remote_views_switch_compat
			 }
		}

		override fun toViewId(): Int {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				return R.id.ns_remote_view_switch
			} else {
				return R.id.ns_remote_view_switch_compat
			 }
		}
	}

	interface TextLike {
		fun getCommands(): MutableMap<String, Command>

		fun setText(value: String): TextLike {
			getCommands()["setText"] = Command.SetText(value)
			return this
		}

		fun setTextColor(value: Int): TextLike {
			getCommands()["setTextColor"] = Command.SetTextColor(value)
			return this
		}

		fun setTextSize(value: Float, unit: Int): TextLike {
			getCommands()["setTextSize"] = Command.SetTextSize(value, unit)
			return this
		}
	}

	interface ViewGroupLike {
		fun addView(child: RemoteViews): ViewGroupLike {
			val self = this as RemoteViews
			self.ensureManager()
			self.manager?.add(child, self.id)
			return this
		}

		fun removeView(child: RemoteViews): ViewGroupLike {
			val self = this as RemoteViews
			child.id.let { self.manager?.remove(it) }
			return this
		}
	}

	interface AdapterLike {
		fun getAdapterItems(): MutableList<RemoteViews> {
			return (this as RemoteViews).adapterItemsBackingField
		}

		fun addItem(item: RemoteViews): AdapterLike {
			getAdapterItems().add(item)
			return this
		}

		fun setItems(newItems: List<RemoteViews>): AdapterLike {
			val items = getAdapterItems()
			items.clear()
			items.addAll(newItems)
			return this
		}

		fun getItemCount(): Int = getAdapterItems().size

		fun getEmptyView(): RemoteViews? {
			return (this as RemoteViews).emptyViewBackingField
		}

		fun setEmptyView(view: RemoteViews): AdapterLike {
			(this as RemoteViews).emptyViewBackingField = view
			return this
		}
	}

	interface ImageLike {
		fun getCommands(): MutableMap<String, Command>

		fun setImageResource(value: Int): ImageLike {
			getCommands()["setImageResource"] = Command.SetImageResource(value)
			return this
		}

		fun setImageURI(value: Uri?): ImageLike {
			getCommands()["setImageURI"] = Command.SetImageURI(value)
			return this
		}

		fun setImageBitmap(value: Bitmap): ImageLike {
			getCommands()["setImageBitmap"] = Command.SetImageBitmap(value)
			return this
		}

		fun setImageUrl(url: String): ImageLike {
			getCommands()["setImageUrl"] = Command.SetImageUrl(url)
			return this
		}
	}

	interface CompoundButtonLike {
		fun getCommands(): MutableMap<String, Command>

		val layout: Layout

		fun setChecked(value: Boolean): CompoundButtonLike {
			getCommands()["setChecked"] = Command.SetChecked(value, layout)
			return this
		}
	}
}
