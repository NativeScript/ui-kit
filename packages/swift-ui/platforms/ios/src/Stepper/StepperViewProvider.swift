import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class StepperViewProvider: UIViewController, SwiftUIProvider {
    var hostingController: UIHostingController<StepperView>?
    private var props = StepperProps()
    private var swiftUI: StepperView?
    
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
                    props.step = v as! Double
                } else if (key == "labelText") {
                    props.labelText = v as? String
                } else if (key == "range") {
                    props.range = v as! [Double]
                }
            }
        }
        
        if (self.swiftUI == nil) {
            swiftUI = StepperView(props: props)
            self.hostingController = setupSwiftUIView(content: swiftUI!)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
