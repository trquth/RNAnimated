package com.rnanimation;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.tom_roush.pdfbox.util.PDFBoxResourceLoader;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rnanimation";
    }

    @Override
    protected void onStart() {
        super.onStart();
        PDFBoxResourceLoader.init(getApplicationContext());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
