import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class TextFieldViewProvider: UIViewController, SwiftUIProvider {
    var hostingController: UIHostingController<TextFieldView>?
    private var props = TextFieldProps()
    private var swiftUI: TextFieldView?
    
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
                if (key == "placeholder") {
                    props.placeholder = v as! String
                } else if (key == "text") {
                    props.text = v as! String
                } else if (key == "type") {
                    props.type = v as! String
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = TextFieldView(props: props)
            self.hostingController = setupSwiftUIView(content: swiftUI!)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
