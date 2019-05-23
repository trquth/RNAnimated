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
