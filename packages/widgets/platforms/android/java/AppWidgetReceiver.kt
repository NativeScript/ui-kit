package org.nativescript.widgets

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import org.nativescript.widgets.AppWidgetProvider.WidgetWorker

class AppWidgetReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    if (intent.action == Intent.ACTION_MY_PACKAGE_REPLACED) {
      val appWidgetMgr = android.appwidget.AppWidgetManager.getInstance(context)
      val pm = context.packageManager
      for (provider in appWidgetMgr.installedProviders) {

        val receiverInfo = pm.getReceiverInfo(provider.provider, PackageManager.GET_META_DATA)
        val isManaged = receiverInfo.metaData?.getBoolean(
          "org.nativescript.widgets.MANAGED_WIDGET", false
        ) == true
        if (!isManaged) continue

        val ids = appWidgetMgr.getAppWidgetIds(provider.provider)
        if (ids.isNotEmpty()) {

          val providerName = "${provider.provider.packageName}.${provider.provider.className}"

          val manager = AppWidgetManager.getManager(providerName)

          AppWidgetManager.notifyUpdate(
            context, providerName, ids, manager, appWidgetMgr
          )
          AppWidgetWorker.enqueueImmediate<WidgetWorker>(
            context, providerName, ids
          )

        }
      }
      return
    }
  }
}
