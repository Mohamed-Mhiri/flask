package com.example.databaseapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.databaseapp.R
import android.animation.ObjectAnimator
import android.widget.ImageView
import android.widget.TextView

class Info : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_info)

        // Apply fade-in animation to the images and text
        animateViews(findViewById(R.id.image1))
        animateViews(findViewById(R.id.image2))
        animateViews(findViewById(R.id.infoText))
    }

    private fun animateViews(view: Any) {
        val fadeInAnimation = ObjectAnimator.ofFloat(view, "alpha", 0f, 1f)
        fadeInAnimation.duration = 1000
        fadeInAnimation.start()
    }
}