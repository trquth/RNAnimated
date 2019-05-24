//
//  GenerateImageService.swift
//  rnanimation
//
//  Created by mac on 5/23/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import  AVFoundation
import PDFKit

class GenerateImageService {
  
  static let instance = GenerateImageService()
  
  init() {}
  
  func generataVideoThumbnail(url: String) -> UIImage? {
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
  
  func generatePdfThumbnail(of thumbnailSize: CGSize , for documentUrl: URL, atPage pageIndex: Int) -> UIImage? {
    if #available(iOS 11.0, *) {
      let pdfDocument = PDFDocument(url: documentUrl)
      let pdfDocumentPage = pdfDocument?.page(at: pageIndex)
      return pdfDocumentPage?.thumbnail(of: thumbnailSize, for: PDFDisplayBox.trimBox)
    } else {
      return nil
    }
  }
}
