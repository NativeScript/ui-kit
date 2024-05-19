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

struct NativeScriptWindowContext {
    // Scene id
    var id = ""
    // Context data
    var data = Dictionary<String, Any>()
}
@objc open class NativeScriptWindowFactory: NSObject {
    var data: [NativeScriptWindowContext] = []
    @objc static var shared = NativeScriptWindowFactory()
    @objc public func updateData(id: String, updates: NSDictionary) {
        let index = data.firstIndex(where: { $0.id == id })
        if (index != nil) {
            data.remove(at: index!)
        }
        data.append(NativeScriptWindowContext(id: id, data: updates.nsToSwiftDictionary))
    }
    @objc public func removeWindow(id: String) {
        let index = data.firstIndex(where: { $0.id == id })
        if (index != nil) {
            data.remove(at: index!)
        }
    }
    func getContextForId(id: String) -> NativeScriptWindowContext? {
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

struct NativeScriptView: View {
   
    @State var id: String = ""
    @State private var updates = 0
    @Environment(\.scenePhase) private var scenePhase
    
    var view: NativeScriptViewRepresentable?
    
    var body: some View {
        if #available(iOS 17.0, *) {
            view.onChange(of: scenePhase) {
                if scenePhase == .inactive {
                    print("Inactive")
                } else if scenePhase == .active {
                    print("Active")
                } else if scenePhase == .background {
                    print("Background")
                    // window closed here!
                    view!.dispose()
                }
            }
        } else {
            view
        }
    }
    
   init(id: String) {
        // Each representable gets a unique instance id
        view = NativeScriptViewRepresentable(id: id + "-" + UUID().uuidString)
   }
}

struct NativeScriptViewRepresentable: UIViewRepresentable {
    @State var id: String
    @State var updates = 0
    func makeUIView(context: Context) -> UIView {
        return NativeScriptViewFactory.shared!.getViewById(id)
    }
     func updateUIView(_ uiView: UIView, context: Context) {
//         print("updateUIView \(context)")
         uiView.tag = updates
    }
    
    func dispose() {
//        print("NativeScriptViewRepresentable dispose \(id)")
        NativeScriptViewFactory.shared!.viewDestroyer!(id)
    }
}
