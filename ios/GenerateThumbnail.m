//
//  GenerateVideoThumbnail.m
//  rnanimation
//
//  Created by mac on 5/23/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(GenerateThumbnail, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(url, NSString)
  RCT_EXPORT_VIEW_PROPERTY(type, NSString)
@end
