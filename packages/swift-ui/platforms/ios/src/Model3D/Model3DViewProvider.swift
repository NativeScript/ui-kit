import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class Model3DViewProvider: UIViewController, SwiftUIProvider {
    private var props = Model3DProps()
    private var swiftUI: Model3DView?
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    required public init() {
        super.init(nibName: nil, bundle: nil)
    }
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        props.onEvent = { data in
            self.onEvent!(data as NSDictionary)
        }
    }
    
    /// Receive data from NativeScript
    func updateData(data: NSDictionary) {
        let enumerator = data.keyEnumerator()
        while let k = enumerator.nextObject() {
            let key = k as! String
            let v = data.object(forKey: key)
            if (v != nil) {
                if (key == "name") {
                    props.name = v as? String
                } else if (key == "url") {
                    props.url = v as? String
                } else if (key == "depth") {
                    props.depth = v as! CGFloat
                } else if (key == "modifiers") {
                    props.modifiers = v as! [[String : Any]]
                }
            }
        }
        
        if (self.swiftUI == nil) {
            swiftUI = Model3DView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
