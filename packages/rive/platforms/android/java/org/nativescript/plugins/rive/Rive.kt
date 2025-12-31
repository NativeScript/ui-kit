package org.nativescript.plugins.rive

import app.rive.runtime.kotlin.core.PlayableInstance

class Rive : app.rive.runtime.kotlin.controllers.RiveFileController.Listener {

    interface Events {
        fun notifyPause(name: String)

        fun notifyPlay(name: String)

        fun notifyStop(name: String)

        fun notifyLoop(name: String)

        fun notifyStateChanged(stateMachineName: String, stateName: String)
    }

    var events: Events? = null

    override fun notifyLoop(animation: PlayableInstance) {
        events?.notifyLoop(animation.name)
    }

    override fun notifyPause(animation: PlayableInstance) {
        events?.notifyPause(animation.name)
    }

    override fun notifyPlay(animation: PlayableInstance) {
        events?.notifyPlay(animation.name)
    }

    override fun notifyStateChanged(stateMachineName: String, stateName: String) {
        events?.notifyStateChanged(stateMachineName, stateName)
    }

    override fun notifyStop(animation: PlayableInstance) {
        events?.notifyStop(animation.name)
    }

}

