package com.generatethumbnail;

import android.content.ContentProviderClient;
import android.content.ContentResolver;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.provider.MediaStore;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.rnanimation.R;
import com.shockwave.pdfium.PdfDocument;
import com.shockwave.pdfium.PdfiumCore;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;


public class ThumbnailView<onCreate> extends  LinearLayout {

   // ImageView thumbnail;

    public ThumbnailView(Context context) {
        super(context);
       // this.setBackgroundColor(Color.parseColor("#cccccc"));


        //ImageView thumbnail = new ImageView(getContext());
       // Bitmap bitmap = generateThumbnailForVideo("https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4");
      //  Bitmap bitmap =   generateImageFromPdf(context,Uri.parse("https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf"));
       // thumbnail.setImageBitmap(bitmap);

//        Glide.with(context)
//                .load(R.drawable.littlegirl)
//                .centerCrop()
//                .error(R.drawable.littlegirl)
//                .into(thumbnail);
//        thumbnail.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,
//                LayoutParams.WRAP_CONTENT));


       // this.addView(thumbnail);
        LinearLayout layout = (LinearLayout) findViewById(R.id.thumbnaillayoutid);
        ImageView thumbnail = (ImageView)  layout.findViewById(R.id.thumbnailid);
        Glide.with(context)
                .load(R.drawable.littlegirl)
                .centerCrop()
                .error(R.drawable.littlegirl)
                .into(thumbnail);
    }

    private void init(Context context, AttributeSet attrs) {
        inflate(context, R.layout.thumnaillayout, this);

       // thumbnail = (ImageView) findViewById(R.id.thumbnailid);

    }

    public ThumbnailView(Context context, AttributeSet attrs) {
        super(context, attrs);

      //  init(context,attrs);
    }

    public ThumbnailView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);


    }

   // public ImageView generateThumbnailForVideo( String videoUrl){
//        Bitmap thumbnail = ThumbnailUtils.createVideoThumbnail( videoUrl, MediaStore.Video.Thumbnails.MINI_KIND);
//        return thumbnail;

//        final ImageView myImageView;
//        RequestOptions requestOptions = new RequestOptions();
//        requestOptions.isMemoryCacheable();
//        Glide.with(getContext()).setDefaultRequestOptions(requestOptions).load("https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4").into(myImageView);
//        return  myImageView;
   // }

    public Bitmap generateImageFromPdf(Context context ,Uri pdfUri) {
        int pageNumber = 0;
        PdfiumCore pdfiumCore = new PdfiumCore(context);
        try {
            //http://www.programcreek.com/java-api-examples/index.php?api=android.os.ParcelFileDescriptor
            ContentResolver resolver =  context.getContentResolver();
            ContentProviderClient providerClient = resolver.acquireUnstableContentProviderClient(pdfUri);
            ParcelFileDescriptor fd = providerClient.openFile(pdfUri, "r");
            PdfDocument pdfDocument = pdfiumCore.newDocument(fd);
            pdfiumCore.openPage(pdfDocument, pageNumber);
            int width = pdfiumCore.getPageWidthPoint(pdfDocument, pageNumber);
            int height = pdfiumCore.getPageHeightPoint(pdfDocument, pageNumber);
            Bitmap bmp = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
            pdfiumCore.renderPageBitmap(pdfDocument, bmp, pageNumber, 0, 0, width, height);
            pdfiumCore.closeDocument(pdfDocument); // important!
            return bmp;
        } catch(Exception e) {
            //todo with exception
            return null;
        }
    }

}
