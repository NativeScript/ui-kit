import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class DatePickerProvider: UIViewController, SwiftUIProvider {
    var hostingController: UIHostingController<DatePickerView>?
    private var props = DatePickerProps()
    private var swiftUI: DatePickerView?
    
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
                if (key == "title") {
                    props.title = v as! String
                } else if (key == "selection") {
                    props.selection = v as! String
                } else if (key == "displayedComponents") {
                    props.displayedComponents = v as! [String]
                } else if (key == "modifiers") {
                    props.modifiers = v as! [[String : Any]]
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = DatePickerView(props: props)
            self.hostingController = setupSwiftUIView(content: swiftUI!)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
