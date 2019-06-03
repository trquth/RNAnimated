package com.generatethumbnail;

import android.content.Intent;

import com.activity.ThumbnailLayoutActivity;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class GenerateThumbnailManager extends SimpleViewManager<ThumbnailView> {

    @Override
    public String getName() {
        return "GenerateThumbnail";
    }

    @Override
    protected ThumbnailView createViewInstance(ThemedReactContext reactContext) {
//        final Intent intent = new Intent(reactContext.getCurrentActivity(), ThumbnailLayoutActivity.class);
//        reactContext.startActivity(intent);
        return new ThumbnailView(reactContext);

    }


}
