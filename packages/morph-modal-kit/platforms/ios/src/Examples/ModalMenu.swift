//
//  MenuModal.swift
//  UIKitExample
//
//  Created by Joseph Smith on 05/07/2025.
//

import Foundation
import MorphModalKit
import UIKit

extension UIButton {
  fileprivate static func menuTile(
    title: String,
    symbol: String,
    iconColor: UIColor = .label,
    textColor: UIColor = .systemGray
  ) -> UIButton {
    var cfg = UIButton.Configuration.plain()
    let symCfg = UIImage.SymbolConfiguration(pointSize: 20, weight: .bold)
    cfg.image = UIImage(systemName: symbol, withConfiguration: symCfg)
    cfg.imagePlacement = .top
    cfg.imagePadding = 16
    cfg.imageColorTransformer = UIConfigurationColorTransformer { _ in iconColor }
    cfg.title = title.uppercased()
    cfg.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { incoming in
      var out = incoming
       out.font = .rounded(ofSize: 12, weight: .heavy)
      out.foregroundColor = textColor
      return out
    }
    let btn = UIButton(configuration: cfg)
    btn.backgroundColor = .tertiarySystemGroupedBackground
    btn.layer.cornerRadius = 4
    btn.layer.cornerCurve = .continuous
    btn.clipsToBounds = true
    btn.translatesAutoresizingMaskIntoConstraints = false
    let square = btn.heightAnchor.constraint(equalTo: btn.widthAnchor)
    square.priority = .defaultHigh
    square.isActive = true
    return btn
  }
}

class MenuModal: UIViewController, ModalView {
  private lazy var pushBtn = UIButton.menuTile(title: "Push", symbol: "arrow.up.right")
  private lazy var popBtn = UIButton.menuTile(title: "Pop", symbol: "arrow.down")
  private lazy var morphBtn = UIButton.menuTile(title: "Morph", symbol: "cube.transparent.fill")
  private lazy var inputBtn = UIButton.menuTile(title: "Input", symbol: "signature")
  private lazy var listBtn = UIButton.menuTile(title: "Scroll", symbol: "scroll.fill")
  private lazy var closeBtn = UIButton.menuTile(title: "Close", symbol: "xmark")
  public var container: UIView?
  public var modalPreferredHeight: CGFloat = 324
  private let col = UIStackView()

  override func viewDidLoad() {
    super.viewDidLoad()

    var isDemo = false

    if container == nil {
      // show demo examples when no container is defined
      isDemo = true
      container = UIView()
    }
    container!.layer.cornerCurve = .continuous
    container!.layer.cornerRadius = 20
    container!.clipsToBounds = true
    container!.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(container!)

    // Buttons
    if isDemo {
      let rows: [[UIButton]] = [
        [pushBtn, popBtn],
        [morphBtn, inputBtn],
        [listBtn, closeBtn],
      ]
      col.axis = .vertical
      col.spacing = 4
      col.distribution = .fillEqually
      col.translatesAutoresizingMaskIntoConstraints = false
      rows.forEach { row in
        let h = UIStackView(arrangedSubviews: row)
        h.axis = .horizontal
        h.spacing = 4
        h.distribution = .fillEqually
        col.addArrangedSubview(h)
      }
      container!.addSubview(col)
    }

    // Actions
    if isDemo {
      NSLayoutConstraint.activate([
        container!.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
        container!.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
        container!.topAnchor.constraint(equalTo: view.topAnchor, constant: 20),
        container!.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -20),

        col.leadingAnchor.constraint(equalTo: container!.leadingAnchor),
        col.trailingAnchor.constraint(equalTo: container!.trailingAnchor),
        col.topAnchor.constraint(equalTo: container!.topAnchor),
        col.bottomAnchor.constraint(equalTo: container!.bottomAnchor),
      ])
      pushBtn.addTarget(self, action: #selector(pushAnotherMenu), for: .touchUpInside)
      popBtn.addTarget(self, action: #selector(popModal), for: .touchUpInside)
      morphBtn.addTarget(self, action: #selector(openMorph), for: .touchUpInside)
      inputBtn.addTarget(self, action: #selector(openInput), for: .touchUpInside)
      listBtn.addTarget(self, action: #selector(openList), for: .touchUpInside)
      closeBtn.addTarget(self, action: #selector(closeFlow), for: .touchUpInside)
    } else {
      NSLayoutConstraint.activate([
        container!.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
        container!.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
        container!.topAnchor.constraint(equalTo: view.topAnchor, constant: 20),
        container!.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -20),
      ])
    }
  }

  // MARK: Navigation

  // Morph inner content
  @objc private func openMorph() { modalVC?.replace(with: MorphModal(step: .one)) }
  // Programatically pop a modal
  @objc private func popModal() { modalVC?.pop() }

  // Example push - same MenuModal
  /// It's likely you won't be pushing the same modal content in your real usage
  /// but for simplicity we'll reuse the same menuModal and we'll inherit the previous stacks sticky elements here to be used during morph
  @objc private func pushAnotherMenu() { modalVC?.push(MenuModal(), sticky: .inherit) }

  // Navigate to other views
  @objc private func openInput() { modalVC?.push(InputModal()) }
  @objc private func closeFlow() { modalVC?.hide() }

  // Example of pushing with a new StickyElementsContainer view
  @objc private func openList() {
    modalVC?.push(ScrollModal(), sticky: .sticky(ScrollStickyElements.self))
  }

  func modalDidDisappear() {
    NotificationCenter.default.post(name: NSNotification.Name("MorphModalClosed"), object: nil)
  }

  func preferredHeight(for _: CGFloat) -> CGFloat { modalPreferredHeight }
}
