import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class TextViewProvider: UIViewController, SwiftUIProvider {
    private var props = TextViewProps()
    private var swiftUI: TextView?
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    required public init() {
        super.init(nibName: nil, bundle: nil)
    }
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        props.onEvent = { data in
            self.onEvent!(data)
        }
    }
    
    /// Receive data from NativeScript
    func updateData(data: NSDictionary) {
        let enumerator = data.keyEnumerator()
        while let k = enumerator.nextObject() {
            let key = k as! String
            let v = data.object(forKey: key)
            if (v != nil) {
                if (key == "children") {
                    props.children = v as? [UIView]
                } else if (key == "text") {
                    props.text = v as! String
                } else if (key == "modifiers") {
                    props.modifiers = v as! NSArray
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = TextView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
