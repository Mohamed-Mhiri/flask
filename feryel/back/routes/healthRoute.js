const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const isAuth= require ('../middlware/auth')


// Route pour ajouter un enregistrement de santé
router.post('/',isAuth, healthController.addHealth);

// Route pour récupérer tous les enregistrements de santé
router.get('/all', isAuth, healthController.getAllHealthRecords);

// Route pour récupérer un enregistrement de santé par ID
router.get('/:id',isAuth, healthController.getHealthRecordById);

// Route pour mettre à jour un enregistrement de santé par ID
router.put('/:id',isAuth, healthController.updateHealthRecord);

// Route pour supprimer un enregistrement de santé par ID
router.delete('/:id', isAuth, healthController.deleteHealthRecord);


module.exports = {
    routes: router
};
