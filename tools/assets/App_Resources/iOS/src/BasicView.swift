import UIKit
import SwiftUI 

struct BasicView: View {
    
    var body: some View {
        ScrollView {
            VStack(spacing: 60) {
                
            }.padding(30)
            VStack(spacing: 60) {
                items
            }
            .padding(30)
        }
    }
    
    var items: some View {
        ForEach(cards) { card in
            NativeScriptView(id: card.$id, data: card.$data).frame(maxWidth: .infinity).frame(height: 300)
                .scrollTransition { content, phase in
                    content
                        .rotation3D(.degrees(phase.isIdentity ? 0 : 60), axis: (x: -1, y: 1, z: 0), perspective: 0.5)
                        .rotationEffect(.degrees(phase.isIdent   ity ? 0 : -30))
                        .offset(x: phase.isIdentity ? 0 : -200)
                        .blur(radius: phase.isIdentity ? 0 : 10)
                        .scaleEffect(phase.isIdentity ? 1 : 0.7)
                }
        }
    }
}

struct TestCard: Identifiable {
    @State var id = UUID()
    @State var data: NSMutableDictionary = [:]
    init(text: String) {
        data.setValue(text, forKey: "label")
    }
}

var cards: [TestCard] = [
    // Card(title: "3D House", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image8)),
    // Card(title: "Sunset", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image4)),
    // Card(title: "Sunrise", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image3)),
    // Card(title: "Blue Hour", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image2)),
    // Card(title: "Night", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image10)),
    // Card(title: "Morning", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image9)),
    // Card(title: "Day", text: "modern architecture, an isometric tiny house, cute illustration, minimalist, vector art, sunset view --q 2 --v 5.1", image: Image(.image12))

    TestCard(text: "Angular"),
    TestCard(text: "React"),
    TestCard(text: "Solid"),
    TestCard(text: "Svelte"),
    TestCard(text: "Vue"),
    // TestCard(text: "Night"),
    // TestCard(text: "Morning"),
    // TestCard(text: "Day")
]

// struct BasicView: View {
//     @State var id = "test"
//     @State var data = NSMutableDictionary()
//     @ObservedObject var props = ButtonProps()
    
//     var body: some View {
        
//         VStack(alignment: .center, spacing: 0) {
//             HStack(alignment: .center) {
//                 NativeScriptView(id: $id, data: $data).frame(maxWidth: .infinity, maxHeight: .infinity)
//             }
//             HStack(alignment:.center) {
//                 Text("Count \(props.count)")
//                     .padding()
//                     .scaledToFill()
//                     .minimumScaleFactor(0.5)
//             }
//             HStack(alignment: .center) {
//                 Button(action: {
//                     self.props.incrementCount?()
//                     self.data = ["count": self.props.count]
//                 }) {
//                     Image(systemName: "plus.circle.fill")
//                         .foregroundColor(.white)
//                         .padding()
//                         .background(LinearGradient(
//                             gradient: Gradient(
//                                 colors: [Color.purple, Color.pink]), startPoint: .top, endPoint: .bottom
//                         ))
//                         .clipShape(Circle())
//                 }
//             }
            
//         }
//         .padding()
//         // .clipShape(Circle())
//     }
// }

// struct BasicView_Previews: PreviewProvider {
//     static var previews: some View {
//         BasicView()
//     }
// }
