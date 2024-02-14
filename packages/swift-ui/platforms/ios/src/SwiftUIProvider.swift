import UIKit
import SwiftUI

@objc
protocol SwiftUIProvider where Self: UIViewController {
    func updateData(data: NSDictionary)
    var onEvent: ((NSDictionary) -> ())? { get set }
}

extension SwiftUIProvider {
    
    func setupSwiftUIView<Content>(content: Content) where Content: View {
        let childVC = buildViewController(content: content)
        childVC.view.backgroundColor = .clear
        addChild(childVC)
        // childVC.view.translatesAutoresizingMaskIntoConstraints = false
        childVC.view.frame = view.bounds
        childVC.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(childVC.view)
        // childVC.view.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
        // childVC.view.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
        // childVC.view.widthAnchor.constraint(equalToConstant: 128).isActive = true
        // childVC.view.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor).isActive = true
        childVC.didMove(toParent: self)
    }
    
    private func buildViewController<Content>(content: Content) -> UIViewController where Content : View {
        return UIHostingController(rootView: content)
    }
}

struct NativeScriptSceneContext {
    // Scene id
    var id = ""
    // Context data
    var data = Dictionary<String, Any>()
}
@objc open class NativeScriptSceneRegistry: NSObject {
    var data: [NativeScriptSceneContext] = []
    @objc static var shared = NativeScriptSceneRegistry()
    @objc public func updateData(id: String, updates: NSDictionary) {
        let index = data.firstIndex(where: { $0.id == id })
        if (index != nil) {
            data.remove(at: index!)
        }
        data.append(NativeScriptSceneContext(id: id, data: updates.nsToSwiftDictionary))
    }
    func getContextForId(id: String) -> NativeScriptSceneContext? {
        let context = data.filter({ $0.id == id}).first
        if (context != nil) {
            return context!
        }
        return nil
    }
}

extension NSDictionary {
    var nsToSwiftDictionary: Dictionary<String, Any> {
        var swiftDictionary = Dictionary<String, Any>()

        for key : Any in self.allKeys {
            let stringKey = key as! String
            if let keyValue = self.value(forKey: stringKey){
                swiftDictionary[stringKey] = keyValue
            }
        }

        return swiftDictionary
    }
}