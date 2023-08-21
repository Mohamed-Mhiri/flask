const express = require('express');
const { addPerson, getAllPersons, getPerson, updatePerson, deletePerson , login , logout , sendPasswordResetEmail,resetPassword} = require('../controllers/personController');
const router = express.Router();

const isAuth= require ('../middlware/auth')

router.post('/', addPerson);
router.get('/all',isAuth, getAllPersons);
router.get('/',isAuth, getPerson);
router.put('/',isAuth, updatePerson);
router.delete('/',isAuth, deletePerson);

router.post('/login', login);
router.post('/logout', logout);
router.post('/send-password-reset',sendPasswordResetEmail);
router.post('/resetpass',resetPassword);


module.exports = {
    routes: router
};
