import Capacitor
import CapawesomeCapacitorLiveUpdate
import IonicPortals
import UIKit

@objc(NSCIonicPortals)
public class NSCIonicPortals: NSObject {
    private static var liveUpdateManagers: [String: LiveUpdateIonicManager] = [:]

    @objc public static func configureLiveUpdates(portalId: String, configuration: [String: Any]) throws {
        liveUpdateManagers[portalId] = try LiveUpdateIonicManager(configuration: configuration)
    }

    @objc public static func createPortalView(portalId: String, initialContext: [String: Any]) -> PortalUIView {
        let portal = Portal(
            name: portalId,
            initialContext: JSTypes.coerceDictionaryToJSObject(initialContext) ?? [:],
            liveUpdateSource: liveUpdateManagers[portalId].map { .provider(manager: $0) }
        )
        return PortalUIView(portal: portal)
    }

    @objc public static func syncLiveUpdates(portalId: String, completion: @escaping (NSError?) -> Void) {
        guard let manager = liveUpdateManagers[portalId] else {
            completion(NSError(
                domain: "NSCIonicPortals",
                code: 1,
                userInfo: [NSLocalizedDescriptionKey: "No live updates configured for portal '\(portalId)'."]
            ))
            return
        }
        Task { @MainActor in
            do {
                _ = try await manager.sync()
                completion(nil)
            } catch {
                completion(error as NSError)
            }
        }
    }
}
