'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const personRoutes = require('./routes/personRoute');
const healthRoute=require('./routes/healthRoute')
const app = express();
const jwt = require('jsonwebtoken');
const firebase = require('./db');
const database = firebase.database();
const databaseRef = database.ref('users'); 

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/person', personRoutes.routes);
app.use('/health', healthRoute.routes)

// Verify endpoint
app.get('/verify', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).send('Missing verification token.');
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        const email = decoded.email;

        const userQuery = databaseRef.orderByChild('email').equalTo(email).limitToFirst(1);
        userQuery.once('child_added', snapshot => {
            // Check if the user is already verified
            if (snapshot.val().isVerified) {
                return res.send('Your account has already been verified.');
            }

            // Update the user's verification status in the database
            snapshot.ref.update({ isVerified: true });

            // Redirect the user to a success page on the frontend
            res.redirect('http://localhost:3000/');
        });
    } catch (error) {
            console.error('Verification Error:', error);
            res.redirect('http://your-frontend-website.com/verification-error');
        
    }
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));