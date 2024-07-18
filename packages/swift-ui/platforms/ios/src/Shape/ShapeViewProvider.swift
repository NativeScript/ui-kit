import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class ShapeViewProvider: UIViewController, SwiftUIProvider {
    private var props = ShapeProps()
    private var swiftUI: ShapeCGView?
    
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
                if (key == "type") {
                    props.type = v as! String
                } else if (key == "cornerRadius") {
                    props.cornerRadius = v as! CGFloat
                } else if (key == "cornerRadii") {
                    props.cornerRadii = v as? NSDictionary
                } else if (key == "modifiers") {
                    props.modifiers = v as! NSArray
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = ShapeCGView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
