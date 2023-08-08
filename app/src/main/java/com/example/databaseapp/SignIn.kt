package com.example.databaseapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class SignIn : AppCompatActivity() {
    companion object{
        const val KEY1="com.example.databaseapp.SignIn.email"
        const val KEY2="com.example.databaseapp.SignIn.name"
        const val KEY3="com.example.databaseapp.SignIn.username"
    }
    private lateinit var database: DatabaseReference
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        val usernameLayout = findViewById<TextInputLayout>(R.id.uniqueid)
        val signing = findViewById<Button>(R.id.signin)

        signing.setOnClickListener{
            val usernameString=usernameLayout.editText?.text.toString()

            if(usernameString.isNotEmpty()){
                readData(usernameString)
            }else{
                Toast.makeText(applicationContext, "Please enter your username.", Toast.LENGTH_LONG).show()
            }
        }
    }

     private fun readData(usernameString: String) {
         database = FirebaseDatabase.getInstance().getReference("users")
         database.child(usernameString).get().addOnSuccessListener {
             if(it.exists()){
                 // redirect to welcome page
                 val email=it.child("email").value
                 val name=it.child("name").value
                 val username=it.child("username").value

                 val intent=Intent(applicationContext,Welcome::class.java)
                 intent.putExtra(KEY1,email.toString())
                 intent.putExtra(KEY2,name.toString())
                 intent.putExtra(KEY3,username.toString())
                 startActivity(intent)
             }else{
                 Toast.makeText(applicationContext, "User not found", Toast.LENGTH_LONG).show()
             }
         }.addOnFailureListener{
             Toast.makeText(applicationContext, "Server Error.", Toast.LENGTH_LONG).show()
         }
    }
}