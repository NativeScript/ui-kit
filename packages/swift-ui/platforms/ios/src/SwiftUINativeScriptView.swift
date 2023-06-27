import UIKit
import SwiftUI

@objc public class UIKitContainerView: UIView {
    @objc public var updateData: ((_ data: NSMutableDictionary) -> Void)? = nil
    
    func copyView<T:UIKitContainerView>() throws -> T? {
        let data = try NSKeyedArchiver.archivedData(withRootObject:self, requiringSecureCoding:false)
        return try NSKeyedUnarchiver.unarchivedObject(ofClass: T.self, from: data)
    }
}

@objc public class NativeScriptViewRegistry: NSObject {
    @objc public static var cnt = 1
    @objc public let views = NSMutableDictionary()
    @objc public var callback: ((String, UIKitContainerView) -> Void)? = nil
    @objc public static let shared = NativeScriptViewRegistry()
    @objc public static func initCallback(_ callback: @escaping (String, UIKitContainerView) -> Void) {
        NativeScriptViewRegistry.shared.callback = callback
    }
    @objc public func registerCallback(_ id: String, containerView: UIKitContainerView) {
        
    }
    @objc public static func register(id: String, containerView: UIKitContainerView) {
        print("register \(id)")
        NativeScriptViewRegistry.shared.views[id] = containerView
        NativeScriptViewRegistry.shared.callback!(id, containerView)
    }
    @objc public static func get(id: String) -> UIKitContainerView? {
        return NativeScriptViewRegistry.shared.views[id] as? UIKitContainerView
    }
}

struct NativeScriptView: UIViewRepresentable {
    @Binding var id: UUID
    @Binding var data: NSMutableDictionary
  
    func makeUIView(context: Context) -> UIKitContainerView {
        print("makeUIView \(id)")
       let containerView = NativeScriptViewRegistry.get(id: "card\(String(NativeScriptViewRegistry.cnt))") ?? UIKitContainerView()
        NativeScriptViewRegistry.cnt = NativeScriptViewRegistry.cnt + 1
        // let containerView = UIKitContainerView()
        // NativeScriptViewRegistry.register(id: id, containerView: containerView)
        print("got view \(containerView)")
        print("got view.subviews.count \(containerView.subviews.count)")
//        print("got view.subviews[0] \(view.subviews[0])")
        return containerView
        
//        do {
//            return try view.copyView()!
//        } catch {
//            return UIKitContainerView()
//        }
    }
    
    func updateUIView(_ uiView: UIKitContainerView, context: Context) {
        print("updateUIView id: \(id)")
        print("updateUIView data: \(data)")
        uiView.updateData!(data)
    }
}

//extension UIKitContainerView {
//    func copyObject<T:UIKitContainerView>() throws -> T? {
//        let data = try NSKeyedArchiver.archivedData(withRootObject:self, requiringSecureCoding:false)
//        return try NSKeyedUnarchiver.unarchivedObject(ofClass: T.self, from: data)
//    }
//}
