package com.generatethumbnail;

import android.content.ContentProviderClient;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.activity.ThumbnailLayoutActivity;
import com.bumptech.glide.Glide;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.rnanimation.R;
import com.shockwave.pdfium.PdfDocument;
import com.shockwave.pdfium.PdfiumCore;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import javax.annotation.Nullable;

public class GenerateThumbnailManager extends SimpleViewManager<ThumbnailLayout> {

    ThemedReactContext context;
    ThumbnailView thumbnail;

    private String resourceType = "video";

    private String resource = "";

    @Override
    public String getName() {
        return "GenerateThumbnail";
    }

    @Override
    protected ThumbnailLayout createViewInstance(ThemedReactContext reactContext) {
        context = reactContext;
        ThumbnailLayout layout = new ThumbnailLayout(reactContext);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));

        thumbnail = new ThumbnailView(reactContext);
        thumbnail.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        thumbnail.setBackgroundColor(Color.GRAY);
        layout.addView(thumbnail);

        return layout;

    }

    @ReactProp(name="url")
    public  void setUrl(View view, String url){
        Log.e("URL------>",url);
        this.resource = url;
        if(url != "" && this.resourceType.equals("video")){
            generateThumbnailForVideo(context, this.resource, thumbnail);
        }
    }

    @ReactProp(name="type")
    public  void setType(View view,String type){
        Log.e("TYPE------>",type);
        this.resourceType = type;
        if(resource != "" && type.equals("video")){
            generateThumbnailForVideo(context, resource, thumbnail);
        }
    }

    public  void generateThumbnailForVideo(Context context, String videoUrl, ImageView thumbnail){
        Glide.with(context)
                .load(videoUrl)
                .thumbnail(0.2f)
                .error(R.drawable.littlegirl)
                .into(thumbnail);
    }

    public void generateImageFromPdf(Context context , String pdfUri, ImageView thumbnail) {
        int pageNumber = 0;
        Uri uri =  Uri.parse(pdfUri);
        PdfiumCore pdfiumCore = new PdfiumCore(context);
        try {
            //http://www.programcreek.com/java-api-examples/index.php?api=android.os.ParcelFileDescriptor
            ContentResolver resolver =  context.getContentResolver();
            ContentProviderClient providerClient = resolver.acquireUnstableContentProviderClient(uri);
            ParcelFileDescriptor fd = providerClient.openFile(uri, "r");
            PdfDocument pdfDocument = pdfiumCore.newDocument(fd);
            pdfiumCore.openPage(pdfDocument, pageNumber);
            int width = pdfiumCore.getPageWidthPoint(pdfDocument, pageNumber);
            int height = pdfiumCore.getPageHeightPoint(pdfDocument, pageNumber);
            Bitmap bmp = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
            pdfiumCore.renderPageBitmap(pdfDocument, bmp, pageNumber, 0, 0, width, height);
            pdfiumCore.closeDocument(pdfDocument); // important!
            thumbnail.setImageBitmap(bmp);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}