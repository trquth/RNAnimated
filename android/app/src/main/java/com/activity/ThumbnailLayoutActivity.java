package com.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import com.rnanimation.MainActivity;
import com.rnanimation.R;

public class ThumbnailLayoutActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.thumnaillayout);
        Intent intent = new Intent(ThumbnailLayoutActivity.this, MainActivity.class);
        startActivity(intent);
}
}
