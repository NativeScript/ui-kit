import UIKit
import SwiftUI
import SwiftUIWinterCG

@objc
class ListProvider: UIViewController, SwiftUIProvider {
    private var props = ListProps()
    private var swiftUI: ListView?
    
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
                } else if (key == "sections") {
                    let sections = (v as! [[String: Any]]).map { section in
                        let children = (section["children"] as! [[String: Any]]).map { child in
                            ListItem(title: child["title"] as! String)
                        }
                        return SectionItem(header: section["header"] as? String ?? "", footer: section["footer"] as? String ?? "", children: children)
                    }
                    props.sections = sections
                } else if (key == "modifiers") {
                    props.modifiers = v as! [[String : Any]]
                } 
            }
        }
        
        
        if (self.swiftUI == nil) {
            swiftUI = ListView(props: props)
            setupSwiftUIView(content: swiftUI)
        } else {
            // engage data binding right away
            self.swiftUI?.props = props
        }
    }
    
    /// Send data to NativeScript
    var onEvent: ((NSDictionary) -> ())?
}
