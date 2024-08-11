import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class SliderViewProvider: UIViewController, SwiftUIProvider {
    private var props = SliderProps()
    private var swiftUI: SliderView?
    
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
                if (key == "value") {
                    props.value = v as! Double
                } else if (key == "step") {
                    props.step = v as? Double
                } else if (key == "labelText") {
                    props.labelText = v as? String
                } else if (key == "range") {
                    props.range = v as! [Double]
                } else if (key == "modifiers") {
                    props.modifiers = v as! [[String : Any]]
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = SliderView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
