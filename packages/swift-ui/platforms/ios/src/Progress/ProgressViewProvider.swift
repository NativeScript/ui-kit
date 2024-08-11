import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class ProgressViewProvider: UIViewController, SwiftUIProvider {
    private var props = ProgressProps()
    private var swiftUI: ProgressViewView?
    
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
                    props.value = v as? Double
                } else if (key == "total") {
                    props.total = v as! Double
                } else if (key == "label") {
                    props.label = v as! String
                } else if (key == "currentValueLabel") {
                    props.currentValueLabel = v as! String
                } else if (key == "modifiers") {
                    props.modifiers = v as! [[String : Any]]
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = ProgressViewView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
