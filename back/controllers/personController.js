'use strict';

const firebase = require('../db');
const Person = require('../models/person');
const firestore = firebase.firestore();
const database = firebase.database();
const databaseRef = database.ref('users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
 
    service: 'Gmail',
    auth: {
        user: 'testprj99@gmail.com',
        pass: 'oinelxntfvjtuxkm'
    }
});

const login = async (req, res, next) => {
    try {
        const { emailOrPhone, password } = req.body;
        if (!emailOrPhone) {
            return res.status(400).send("L'adresse e-mail ou le numéro de téléphone est manquant dans le corps de la requête");
        }

        let userQuery = null;
        if (emailOrPhone.includes('@')) {
            userQuery = databaseRef.orderByChild('email').equalTo(emailOrPhone).limitToFirst(1);
        } else {
            userQuery = databaseRef.orderByChild('phone').equalTo(emailOrPhone).limitToFirst(1);
        }

        userQuery.once('value', async snapshot => {
            const userObject = snapshot.val();
            if (!userObject) {
                return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
            }

            const userId = Object.keys(userObject)[0];
            const userData = userObject[userId];

            // Check if the user is verified
            if (!userData.isVerified) {
                return res.status(401).send('Votre compte n\'a pas encore été vérifié');
            }
            const isPasswordMatch = await bcrypt.compare(password, userData.password);
            if (!isPasswordMatch) {
                return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
            }

            const tokenPayload = {
                id: userId,
            };

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.json({ token, userId });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addPerson = async (req, res, next) => {
    try {
        const { name, lastName, gender, age, email, password, phone } = req.body;

        const existingUserQuery = databaseRef.orderByChild('email').equalTo(email).limitToFirst(1);
        existingUserQuery.once('value', snapshot => {
            if (snapshot.exists()) {
                return res.status(409).send('Cet utilisateur existe déjà avec cet email');
            } else {
                const hashedPassword = bcrypt.hashSync(password, 10);

                const data = {
                    name,
                    lastName,
                    gender,
                    age,
                    email,
                    password: hashedPassword,
                    phone,
                    isVerified: false
                };

                const newUserRef = databaseRef.push();
                newUserRef.set(data);
        
                // Generate a verification token (you can use a library like 'jsonwebtoken' for this)
                const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1d' });
        
                // Send verification email to the user
                const mailOptions = {
                    from: 'testprj99@gmail.com',
                    to: email,
                    subject: 'Account Verification',
                    html: `<p> <h1>Welcome to our application.</h1> Please click <a href="http://localhost:8080/verify?token=${token}">here</a> to verify your account.</p>`
                };
                
        
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('An error occurred while sending the verification email.');
                    }
                    console.log('Verification email sent:', info.response);
                    res.send('Registration successful. A verification email has been sent.');
                });
           }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};



const getAllPersons = async (req, res, next) => {
    try {
        const personsSnapshot = await databaseRef.once('value');
        const personsData = personsSnapshot.val();

        if (!personsData) {
            res.status(404).send('No person record found');
        } else {
            const personsArray = Object.keys(personsData).map(personId => ({
                id: personId,
                ...personsData[personId]
            }));
            res.send(personsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getPerson = async (req, res, next) => {
    try {
        const personId = req.person.id;
        const personSnapshot = await databaseRef.child(personId).once('value');
        const personData = personSnapshot.val();

        if (!personData) {
            res.status(404).send('Person with the given ID not found');
        } else {
            res.send(personData);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updatePerson = async (req, res, next) => {
    try {
        const personId = req.person.id;
        const data = req.body;

        await databaseRef.child(personId).update(data);

        res.send('Person record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deletePerson = async (req, res, next) => {
    try {
        const personId = req.person.id;

        // Delete the person data
        await databaseRef.child(personId).remove();

           // Delete associated health data
           const healthSnapshot = await database.ref('health').orderByChild('personId').equalTo(personId).once('value');
        
           const healthDeletionPromises = [];
           
           healthSnapshot.forEach(healthDataSnapshot => {
               healthDeletionPromises.push(healthDataSnapshot.ref.remove());
           });
           
           await Promise.all(healthDeletionPromises);

        res.send('Record and associated health data deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const logout = async (req, res, next) => {
    try {
        res.clearCookie(process.env.REFRESH_TOKEN_NAME);
        res.json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const sendPasswordResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const resetLink = 'http://localhost:3000/password'; 
        
        const mailOptions = {
            from: 'testprj99@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h1>Hello,</h1> 
                <p>
                We have received a request to reset the password associated with 
                your account. To proceed with resetting your password, </p>
                <a href="${resetLink}">Click here</a>
                <p>
                Once you have clicked on the link, you will be redirected to our website where you can continue to access our services.
                
                If you have any questions or concerns regarding the verification of your account, please do not hesitate to contact us by replying to this email.
                
                Thank you for your cooperation, \n
                
                Best regards,</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred while sending the password reset email.' });
    }
};


const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        // Check if the email exists in your Realtime Database (users node)
        const userSnapshot = await databaseRef.orderByChild('email').equalTo(email).once('value');
        if (!userSnapshot.exists()) {
            throw new Error('User not found');
        }

        // Hash the new password before storing it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Get the user's unique key (UID) from the snapshot
        const userId = Object.keys(userSnapshot.val())[0];

        // Update the user's password field in Realtime Database
        await databaseRef.child(userId).update({
            password: hashedPassword
        });

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
};


module.exports = {
    addPerson,
    getAllPersons,
    getPerson,
    updatePerson,
    deletePerson,
    login,
    logout,
    sendPasswordResetEmail,
    resetPassword
};
