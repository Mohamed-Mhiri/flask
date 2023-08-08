package com.example.databaseapp

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException

class FormActivity : AppCompatActivity() {

    private lateinit var ageText: EditText
    private lateinit var systolicText: EditText
    private lateinit var bloodSugarText: EditText
    private lateinit var ckMbText: EditText
    private lateinit var troponinText: EditText
    private lateinit var genderText: EditText
    private lateinit var checkButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_form)

        ageText = findViewById(R.id.AgeText)
        systolicText = findViewById(R.id.SystolicText)
        bloodSugarText = findViewById(R.id.BloodSugarText)
        ckMbText = findViewById(R.id.CK_MBText)
        troponinText = findViewById(R.id.TroponinText)
        genderText = findViewById(R.id.GenderText)
        checkButton = findViewById(R.id.buttonCheck)

        checkButton.setOnClickListener {
            val age = ageText.text.toString()
            val systolic = systolicText.text.toString()
            val bloodSugar = bloodSugarText.text.toString()
            val ckMb = ckMbText.text.toString()
            val troponin = troponinText.text.toString()
            val gender = genderText.text.toString()

            // Prepare the data to send to the API
            val jsonArray = JSONArray()
            val jsonData = JSONObject()
            jsonData.put("Age", age)
            jsonData.put("Systolic blood pressure", systolic)
            jsonData.put("Blood sugar", bloodSugar)
            jsonData.put("CK-MB", ckMb)
            jsonData.put("Troponin", troponin)
            jsonData.put("Gender", gender)
            jsonArray.put(jsonData)

            // Send the data to the API
            sendDataToAPI(jsonArray)
        }

    }
    private fun sendDataToAPI(data: JSONArray) {
        val url = "https://sigh-ro67.onrender.com/predict"
        val client = OkHttpClient()

        // Convert numerical values to float
        for (i in 0 until data.length()) {
            val jsonData = data.getJSONObject(i)
            jsonData.put("Age", jsonData.getString("Age").toDouble())
            jsonData.put("Systolic blood pressure", jsonData.getString("Systolic blood pressure").toDouble())
            jsonData.put("Blood sugar", jsonData.getString("Blood sugar").toDouble())
            jsonData.put("CK-MB", jsonData.getString("CK-MB").toDouble())
            jsonData.put("Troponin", jsonData.getString("Troponin").toDouble())
        }

        // Send the data to the API
        val mediaType = "application/json".toMediaTypeOrNull()
        val requestBody = data.toString().toRequestBody(mediaType)
        val request = Request.Builder()
            .url(url)
            .post(requestBody)
            .build()


        //Log.d("API Request", data.toString())

        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call: Call, response: Response) {
                val responseBodyString = response.body?.string()
                if (response.isSuccessful && responseBodyString != null) {
                    val jsonResponse = JSONObject(responseBodyString)
                    val prediction = jsonResponse.optString("prediction")

                    Log.d("API Response", jsonResponse.toString())
                    // Process the prediction result here
                    runOnUiThread {
                        val predictionTextView = findViewById<TextView>(R.id.predictionText)
                        predictionTextView.text = "Prediction: $prediction"
                    }

                } else {
                    // Handle API error
                    runOnUiThread {
                        // For example, show an error toast message
                        // Toast.makeText(applicationContext, "Error: ${responseBody}", Toast.LENGTH_SHORT).show()
                    }
                }
            }


            override fun onFailure(call: Call, e: IOException) {
                // Handle request failure
                runOnUiThread {
                    // For example, show an error toast message
                    // Toast.makeText(applicationContext, "Request Failed: ${e.message}", Toast.LENGTH_SHORT).show()
                }

                Log.e("API Error", e.message ?: "Unknown error")
            }
        })
    }
}
