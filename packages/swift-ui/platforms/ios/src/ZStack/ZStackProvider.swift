import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class ZStackProvider: UIViewController, SwiftUIProvider {
    private var props = ZStackProps()
    private var swiftUI: ZStackView?
    
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
                if (key == "children") {
                    props.children = v as? [UIView]
                } else if (key == "alignment") {
                    let value = v as! String
                    switch (value) {
                        case "topLeading":
                            props.alignment = .topLeading
                        case "top": 
                            props.alignment = .top
                            case "topTrailing":
                            props.alignment = .topTrailing
                        case "leading":
                            props.alignment = .leading
                        case "center":
                            props.alignment = .center
                        case "trailing":
                            props.alignment = .trailing
                        case "bottomLeading":
                            props.alignment = .bottomLeading
                        case "bottom":
                            props.alignment = .bottom
                        case "bottomTrailing":
                            props.alignment = .bottomTrailing
                        default:    
                            props.alignment = .center
                    }
                } 
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = ZStackView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
