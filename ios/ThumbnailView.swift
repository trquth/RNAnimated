//
//  VideoThumbnail.swift
//  rnanimation
//
//  Created by mac on 5/23/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

class ThumbnailView: UIView {
  
  @IBOutlet weak var thumbnailImage: UIImageView!
  
  @objc var type : NSString = "pdf"
  @objc var url : NSString = "" {
    didSet {
      if type == "pdf" {
            let url = URL(string: self.url as String)!
            var image =  GenerateImageService.instance.generatePdfThumbnail(of: CGSize(width: 100, height: 100), for: url, atPage: 0)
        setupView(image)
      } else {
        guard let image = GenerateImageService.instance.generataVideoThumbnail(url: url as String) else { return }
             setupView(image)
      }
    }
  }
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupImageView()
  }
  
  override func awakeFromNib() {
    setupImageView()
  }
  
  func setupImageView() {
    self.backgroundColor = .lightGray
  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }
  
  func setupView(_ image : UIImage?){
    guard  let data = image else {
      return
    }
    thumbnailImage.image = data
  }

}
