package com.example.databaseapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class Welcome : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_welcome)

        val uemail=intent.getStringExtra(SignIn.KEY1)
        val uname=intent.getStringExtra(SignIn.KEY2)
        val uusername=intent.getStringExtra(SignIn.KEY3)

        val welmsg=findViewById<TextView>(R.id.name)
        val email=findViewById<TextView>(R.id.email)
        val username=findViewById<TextView>(R.id.username)

        welmsg.text= "Welcome, $uname"
        email.text="Email : $uemail"
        username.text="UserID : $uusername"

        val button1 = findViewById<Button>(R.id.button1)
        val button2 = findViewById<Button>(R.id.button2)

        button1.setOnClickListener {
            // Start the InfoActivity when button1 is clicked
            val intent = Intent(this, Info::class.java)
            startActivity(intent)
        }

        button2.setOnClickListener {
            // ... (Your existing code for button2 click)
            val intent = Intent(this, FormActivity::class.java)
            startActivity(intent)
        }
    }

    // ... (Your existing showToast function)
}