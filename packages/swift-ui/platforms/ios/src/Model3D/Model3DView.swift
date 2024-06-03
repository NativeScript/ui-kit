import SwiftUI
import RealityKit


struct Model3DView: View {
    @ObservedObject var props: Model3DProps
    var orientation: SIMD3<Double> = .zero
    
    var body: some View {
#if os(visionOS)
        if (props.url != nil && props.url!.count > 0) {
            Model3D(url: URL(string: props.url!)!) { model in
                modelWithSettings(model: model)
            } placeholder: {
                placeholderView()
            }
        } else {
            Model3D(named: props.name!) { model in
                modelWithSettings(model: model)
            } placeholder: {
                placeholderView()
            }
        }
#else
        EmptyView()
#endif
        
    }
    
#if os(visionOS)
    func modelWithSettings(model: ResolvedModel3D) -> some View {
        model.resizable()
            .scaledToFit()
            .rotation3DEffect(
                Rotation3D(
                    eulerAngles: .init(angles: orientation, order: .xyz)
                )
            )
            .frame(depth: props.depth)
            .offset(z: -props.depth / 2)
            .nsViewModifiers(mods: props.modifiers)
            .offset(z: props.depth)
    }
    
    func placeholderView() -> some View {
        ProgressView()
            .offset(z: -props.depth * 0.75)
    }
#endif
}
