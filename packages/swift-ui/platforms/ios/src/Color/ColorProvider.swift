import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class ColorProvider: UIViewController, SwiftUIProvider {
    var hostingController: UIHostingController<ColorView>?
    private var props = ColorProps()
    private var swiftUI: ColorView?
    
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
                if (key == "color") {
                    props.color = v as! String
                } else if (key == "modifiers") {
                    props.modifiers = v as! [[String : Any]]
                }
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = ColorView(props: props)
            self.hostingController = setupSwiftUIView(content: swiftUI!)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
