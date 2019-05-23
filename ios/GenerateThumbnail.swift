//
//  GenerateVideoThumbnail.swift
//  rnanimation
//
//  Created by mac on 5/23/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(GenerateVideoThumbnail)

class GenerateThumbnail: RCTViewManager {
  
  override func view() -> UIView! {
    let bundle = Bundle(for: type(of: self))
    let nib = UINib(nibName: "VideoThumbnail", bundle: bundle)
    let thumbnail = nib.instantiate(withOwner: self, options: nil)[0] as! ThumbnailView
    guard let image = createThumbnailOfVideoFromRemoteUrl(url: "http://techslides.com/demos/sample-videos/small.mp4") else { return UIView() }
    thumbnail.setupView(image)
    return thumbnail
  }
  
  func createThumbnailOfVideoFromRemoteUrl(url: String) -> UIImage? {
    let asset = AVAsset(url: URL(string: url)!)
    let assetImgGenerate = AVAssetImageGenerator(asset: asset)
    assetImgGenerate.appliesPreferredTrackTransform = true
    let time = CMTimeMakeWithSeconds(1.0, preferredTimescale: 600)
    do {
      let img = try assetImgGenerate.copyCGImage(at: time, actualTime: nil)
      let thumbnail = UIImage(cgImage: img)
      return thumbnail
    } catch {
      print(error.localizedDescription)
      return nil
    }
  }
}
