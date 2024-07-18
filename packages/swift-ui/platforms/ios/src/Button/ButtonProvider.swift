import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class ButtonProvider: UIViewController, SwiftUIProvider {
    private var props = ButtonProps()
    private var swiftUI: ButtonView?
    
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
                } else if (key == "title") {
                    props.title = v as? String
                } 
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = ButtonView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
