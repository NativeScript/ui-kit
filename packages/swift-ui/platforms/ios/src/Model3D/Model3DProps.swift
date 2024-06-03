import SwiftUI
import UIKit

class Model3DProps: ObservableObject {
    @Published var depth: Double = 200
    @Published var name: String? = ""
    @Published var url: String? = ""
    @Published var modifiers = NSArray()
    var onEvent: ((NSDictionary) -> Void)?
}
