# Dependencies
from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
import numpy as np
import sklearn 
# Your API definition
app = Flask(__name__)

# Load the model, model columns, and scaling parameters
model = joblib.load("model.pkl")  # Load "model.pkl"
print('Model loaded')
print(type(model))
model_columns = joblib.load("columns.pkl")  # Load "model_columns.pkl"
print('Model columns loaded')
print((model_columns))
scaling_params = joblib.load("para.pkl")  # Load "para.pkl"
print('Scaling parameters loaded')
print((scaling_params.tolist()))
@app.route('/predict', methods=['POST'])
def predict():
    if model:
        try:
            # Get the JSON data from the request
            json_data = request.json

            # Create a DataFrame from the JSON data
            query = pd.DataFrame(json_data, columns=model_columns)

            # Convert 'Gender' to numerical values (0 for 'female', 1 for 'male')
            query['Gender'].replace(['female', 'male'], [0, 1], inplace=True)

            # Scale the numerical columns using the loaded scaling parameters
            numerical_cols = ['Age','Systolic blood pressure','Blood sugar', 'CK-MB', 'Troponin']
            
            query[numerical_cols] = query[numerical_cols] * scaling_params.reshape(1, -1)
           
            print(query)
            # Make predictions using the loaded model
            prediction = list(model.predict(query))

            return jsonify({'prediction': str(prediction)})

        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return 'No model here to use'

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])  # This is for a command-line input
    except:
        port = 12345  # If you don't provide any port, the port will be set to 12345
  

  
    app.run(port=port, debug=True)


