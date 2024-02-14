import SwiftUI
import AVKit

@main
struct NativeScriptApp: App {

    var body: some Scene {
        NativeScriptMainWindow()

        WindowGroup(id: "Video") {
            VideoPlayer(player: AVPlayer(url:  URL(string: "https://drive.usercontent.google.com/download?id=1MGUg4IblmT3zhWB8nYeGz1Ew7EqZQVYf")!))
                .frame(height: 400)
        }
        .windowStyle(.plain)
        // .defaultSize(width: 0.7, height: 0.7, depth: 0.7, in: .meters)
    }
}