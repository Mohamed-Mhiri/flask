package com.example.databaseapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class MainActivity : AppCompatActivity() {
    private lateinit var database: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val emailLayout = findViewById<TextInputLayout>(R.id.email)
        val nameLayout = findViewById<TextInputLayout>(R.id.name)
        val passwordLayout = findViewById<TextInputLayout>(R.id.password)
        val signup = findViewById<Button>(R.id.signup)
        val usernameLayout = findViewById<TextInputLayout>(R.id.uniqueid)


        signup.setOnClickListener {
            val email = emailLayout.editText?.text.toString()
            val name = nameLayout.editText?.text.toString()
            val password = passwordLayout.editText?.text.toString()
            val username = usernameLayout.editText?.text.toString()

            val user = User(name, email, password, username)

            val sanitizedId = username.replace("[.#$\\[\\]]".toRegex(), "")

            database = FirebaseDatabase.getInstance().getReference("users")
            database.child(sanitizedId).setValue(user).addOnSuccessListener {
                Toast.makeText(applicationContext, "User Registered Successfully", Toast.LENGTH_LONG).show()
            }.addOnFailureListener {
                Toast.makeText(applicationContext, "Error", Toast.LENGTH_LONG).show()
            }
        }
        val login=findViewById<TextView>(R.id.login)
        login.setOnClickListener{
            val intent= Intent(applicationContext,SignIn::class.java)
            startActivity(intent)
        }
    }
}
