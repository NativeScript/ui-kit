package org.nativescript.plugins.ionicportals

import io.ionic.liveupdateprovider.ProviderManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

object NSCIonicPortals {
    interface SyncCallback {
        fun onSuccess()

        fun onError(error: Throwable)
    }

    @JvmStatic
    fun sync(manager: ProviderManager, callback: SyncCallback) {
        CoroutineScope(Dispatchers.IO).launch {
            val result = runCatching { manager.sync() }
            withContext(Dispatchers.Main) {
                result.fold({ callback.onSuccess() }, { callback.onError(it) })
            }
        }
    }
}
