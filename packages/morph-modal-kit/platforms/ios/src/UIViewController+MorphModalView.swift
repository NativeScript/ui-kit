//
//  UIViewController+MorphModalView.swift
//
//
//  Created by Nathan Walker on 07/06/2025.
//  Example adaptation from Joseph Smith.
//

import MorphModalKit
import UIKit

@objcMembers
public class MorphModalAnimationSettings: NSObject {
  /// Animation duration in seconds
  public var duration: TimeInterval = 0.4
  /// Spring damping ratio (0…1)
  public var damping: CGFloat = 0.86
  /// Initial spring velocity
  public var velocity: CGFloat = 0.8

  /// Default initializer matches your struct’s defaults
  public override init() {
    super.init()
  }

  /// Designated initializer
  public init(
    duration: TimeInterval = 0.4,
    damping: CGFloat = 0.86,
    velocity: CGFloat = 0.8
  ) {
    self.duration = duration
    self.damping = damping
    self.velocity = velocity
    super.init()
  }
}

@objcMembers
public class MorphModalOptions: NSObject {
  // MARK: Layout
  public var horizontalInset: CGFloat? = 10
  public var cornerRadius: CGFloat? = 32
  public var stackVerticalSpacing: CGFloat? = 20
  public var bottomSpacing: CGFloat? = nil
  public var keyboardSpacing: CGFloat? = 10
  public var centerOnIpad: Bool? = true
  public var centerIPadWidthMultiplier: CGFloat? = 0.7

  // MARK: Background dimming
  public var dimBackgroundColor: UIColor? = .black
  public var dimOpacityMultiplier: CGFloat? = 0.06
  public var overlayColor: UIColor? = .black
  public var overlayOpacity: CGFloat? = 0.2

  // MARK: Appearance
  public var maxVisibleStack: Int? = 2
  public var removesSelfWhenCleared: Bool? = true
  public var modalBackgroundColor: UIColor? = .secondarySystemGroupedBackground
  public var cornerMask: CACornerMask? = [
    .layerMinXMinYCorner, .layerMaxXMinYCorner,
    .layerMinXMaxYCorner, .layerMaxXMaxYCorner,
  ]
  public var showsHandle: Bool? = true
  public var handleColor: UIColor? = .tertiarySystemGroupedBackground

  // MARK: Behavior
  public var usesSnapshots: Bool? = true
  public var usesSnapshotsForMorph: Bool? = false

  // MARK: Animations
  public var animation: MorphModalAnimationSettings? = .init()
  public var morphAnimation: MorphModalAnimationSettings? = .init(
    duration: 0.4,
    damping: 0.95,
    velocity: 1
  )

  // MARK: Card shadow (flattened tuple)
  public var cardShadowColor: UIColor? = .black
  public var cardShadowOpacity: Float? = 0.12
  public var cardShadowRadius: CGFloat? = 9
  public var cardShadowOffset: CGSize? = .init(width: 0, height: 2)

  public var modalPreferredHeight: CGFloat? = nil

  // default initializer is synthesized; if you ever need custom setup:
  public override init() {
    super.init()
  }
}

@objc
extension UIViewController {

  @objc public func openMorphModal(_ view: UIView? = nil, _ options: MorphModalOptions? = nil) {
    var opt: ModalOptions = ModalOptions.default

    if options != nil {
      // Layout
      opt.horizontalInset = options!.horizontalInset ?? opt.horizontalInset
      opt.cornerRadius = options!.cornerRadius ?? opt.cornerRadius
      opt.stackVerticalSpacing = options!.stackVerticalSpacing ?? opt.stackVerticalSpacing
      opt.bottomSpacing = options!.bottomSpacing ?? opt.bottomSpacing
      opt.keyboardSpacing = options!.keyboardSpacing ?? opt.keyboardSpacing
      opt.centerOnIpad = options!.centerOnIpad ?? opt.centerOnIpad
      opt.centerIPadWidthMultiplier =
        options!.centerIPadWidthMultiplier ?? opt.centerIPadWidthMultiplier

      // Background dimming
      opt.dimBackgroundColor = options!.dimBackgroundColor ?? opt.dimBackgroundColor
      opt.dimOpacityMultiplier = options!.dimOpacityMultiplier ?? opt.dimOpacityMultiplier
      opt.overlayColor = options!.overlayColor ?? opt.overlayColor
      opt.overlayOpacity = options!.overlayOpacity ?? opt.overlayOpacity

      // Appearance
      opt.maxVisibleStack = options!.maxVisibleStack ?? opt.maxVisibleStack
      opt.removesSelfWhenCleared = options!.removesSelfWhenCleared ?? opt.removesSelfWhenCleared
      opt.modalBackgroundColor = options!.modalBackgroundColor ?? opt.modalBackgroundColor
      opt.cornerMask = options!.cornerMask ?? opt.cornerMask
      opt.showsHandle = options!.showsHandle ?? opt.showsHandle
      opt.handleColor = options!.handleColor ?? opt.handleColor

      // Behavior
      opt.usesSnapshots = options!.usesSnapshots ?? opt.usesSnapshots
      opt.usesSnapshotsForMorph = options!.usesSnapshotsForMorph ?? opt.usesSnapshotsForMorph

      // Animations
      if options!.animation != nil {
        opt.animation = ModalAnimationSettings(
          duration: options!.animation!.duration, damping: options!.animation!.damping,
          velocity: options!.animation!.velocity)
      }
      if options!.morphAnimation != nil {
        opt.morphAnimation = ModalAnimationSettings(
          duration: options!.morphAnimation!.duration, damping: options!.morphAnimation!.damping,
          velocity: options!.morphAnimation!.velocity)
      }

      // Card shadow (flattened)
      if options!.cardShadowColor != nil && options!.cardShadowOpacity != nil
        && options!.cardShadowRadius != nil && options!.cardShadowOffset != nil
      {
        opt.cardShadow = (
          color: options!.cardShadowColor!,
          opacity: options!.cardShadowOpacity!,
          radius: options!.cardShadowRadius!,
          offset: options!.cardShadowOffset!
        )
      }

    }

    // Example, full width modal
    // options.horizontalInset = 0
    // options.bottomSpacing = 0
    // options.cornerMask = [.layerMinXMinYCorner, .layerMaxXMinYCorner]

    // We pass the elements we want to be sticky through morphs when we present the modal
    // these can be inherited (default) by future pushes or overwritten
    let menuModal = MenuModal()
    if options!.modalPreferredHeight != nil {
      menuModal.modalPreferredHeight = options!.modalPreferredHeight!
    } else {
      menuModal.modalPreferredHeight = 324  // Default preferred height for the menu modal
    }
    if view != nil {
      // Set the container to the view we want to show
      // If not set, it displays a demo mode
      menuModal.container = view
    }
    self.presentModal(menuModal, options: opt, sticky: .sticky(StickyElements.self))
  }
}
