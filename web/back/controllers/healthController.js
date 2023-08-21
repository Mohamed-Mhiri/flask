const axios = require('axios');
const Health = require('../models/health');
const firebase = require('../db');
const database = firebase.database();
const databaseRef = database.ref('users');

const addHealth = async (req, res, next) => {
    try {
        const personId = req.person.id;
        const personSnapshot = await databaseRef.child(personId).once('value');
        const personData = personSnapshot.val();
        console.log(personData)
        const data = req.body;

        const healthData1 = {
            Age: parseFloat (personData.age),
            Gender: personData.gender,
            'Systolic blood pressure': parseFloat(data.systolicBloodPressure),
            'Blood sugar': parseFloat(data.bloodSugar),
            'CK-MB':parseFloat( data.ckmb),
            Troponin: parseFloat(data.troponin1),
        };
        

        // Send a POST request to the API endpoint with the data
        const url = "https://sigh-ro67.onrender.com/predict";
        const response = await axios.post(url, [healthData1]);
        console.log(response.data)
        let resultValue = 1; 
        
        if (response.status === 200) {
            // Get the prediction from the response
            const prediction = response.data.prediction;
        
            // Remove brackets from prediction value
            const cleanPrediction = prediction.replace(/\[|\]/g, '');
        
            // Set the result value based on the cleaned prediction
            if (cleanPrediction === '0') {
                resultValue = 0;
            } else if (cleanPrediction === '1') {
                resultValue = 1;
            } else {
                console.log("Invalid prediction value:", prediction);
            } 
            
            console.log("Prediction:", resultValue);
        } else {
            console.log("Error:", response.data);
        }
        

        // Set the "result" attribute in the data object
        data.result = resultValue;

        // Create a new Health object with the updated data
        const healthRecord = new Health(data);

        // Convert the Health object to a plain object
        const healthData = {
            personId: personId,
            heartRate: healthRecord.heartRate,
            systolicBloodPressure: healthRecord.systolicBloodPressure,
            bloodSugar: healthRecord.bloodSugar,
            ckmb: healthRecord.ckmb,
            troponin: healthRecord.troponin1,
            result: healthRecord.result
        };

        // Check for undefined values in healthData object
        for (const key in healthData) {
            if (healthData[key] === undefined) {
                throw new Error(`Field ${key} has an undefined value.`);
            }
        }

        // Push the Health record to the Realtime Database
        const newHealthRef = database.ref('health').push();
        await newHealthRef.set(healthData);

        res.send('result: ' + healthData.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllHealthRecords = async (req, res, next) => {
    try {
        const healthRecordsSnapshot = await database.ref('health').once('value');
        const healthArray = [];

        healthRecordsSnapshot.forEach(healthSnapshot => {
            const healthData = healthSnapshot.val();
            const healthRecord = new Health({
                id: healthSnapshot.key,
                personId: healthData.personId,
                heartRate: healthData.heartRate,
                systolicBloodPressure: healthData.systolicBloodPressure,
                diastolicBloodPressure: healthData.diastolicBloodPressure,
                bloodSugar: healthData.bloodSugar,
                ckmb: healthData.ckmb,
                troponin1: healthData.troponin1,
                troponin2: healthData.troponin2,
                result: healthData.result
            });
            healthArray.push(healthRecord);
        });

        res.send(healthArray);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getHealthRecordById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const healthSnapshot = await database.ref('health').child(id).once('value');

        if (!healthSnapshot.exists()) {
            return res.status(404).send('Health record with the given ID not found');
        }

        const healthData = healthSnapshot.val();
        const healthRecord = new Health({
            id: id,
            personId: healthData.personId,
            heartRate: healthData.heartRate,
            systolicBloodPressure: healthData.systolicBloodPressure,
            diastolicBloodPressure: healthData.diastolicBloodPressure,
            bloodSugar: healthData.bloodSugar,
            ckmb: healthData.ckmb,
            troponin1: healthData.troponin1,
            troponin2: healthData.troponin2,
            result: healthData.result
        });

        res.send(healthRecord);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateHealthRecord = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await database.ref('health').child(id).update(data);

        res.send('Health record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteHealthRecord = async (req, res, next) => {
    try {
        const id = req.params.id;

        await database.ref('health').child(id).remove();

        res.send('Health record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addHealth,
    getAllHealthRecords,
    getHealthRecordById,
    updateHealthRecord,
    deleteHealthRecord
};
