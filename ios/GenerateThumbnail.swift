//
//  GenerateVideoThumbnail.swift
//  rnanimation
//
//  Created by mac on 5/23/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
import Foundation

@objc(GenerateThumbnail)

class GenerateThumbnail: RCTViewManager{
  
  let PDF_TYPE = "pdf"
  let MP4_VIDEO = "video"
    
//  @objc func constantsToExport() -> NSObject {
//    return [
//      "name": currentDevice.name,
//      "systemName": currentDevice.systemName,
//      "systemVersion": currentDevice.systemVersion,
//      "localizedModel":currentDevice.localizedModel,
//      "model": currentDevice.model
//    ]
//  }
  
  override func view() -> UIView! {
    let bundle = Bundle(for: type(of: self))
    let nib = UINib(nibName: "Thumbnail", bundle: bundle)
    let thumbnail = nib.instantiate(withOwner: self, options: nil)[0] as! ThumbnailView
    return thumbnail
  }

  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
