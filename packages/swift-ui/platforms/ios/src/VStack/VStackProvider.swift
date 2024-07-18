import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class VStackProvider: UIViewController, SwiftUIProvider {
    private var props = VStackProps()
    private var swiftUI: VStackView?
    
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
                } else if (key == "spacing") {
                    props.spacing = v as? Float
                } else if (key == "alignment") {
                    let value = v as! String
                    switch (value) {
                        case "leading":
                            props.alignment = .leading
                        case "trailing":
                            props.alignment = .trailing
                        default:    
                            props.alignment = .center
                    }
                } 
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = VStackView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
