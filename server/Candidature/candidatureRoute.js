const router = require('express').Router();
const candidatureAction = require('./candidatureAction');

//--afficher toutes les candidatures
router.get('/displayAll', candidatureAction.displayAll);

//Get all candidatures
router.get('/getAllCandidatures', candidatureAction.getAllCandidatures);

//Renvoi les candidatures d'un candidat
router.get('/getCandidatures',candidatureAction.getCandidaturesByID);

//--afficher les nouvelle candidatures
router.get('/DisplayNewCandidature',candidatureAction.DisplayNewCandidature); 

//--Creation d'une candidature
router.post('/newCandidature',candidatureAction.newCandidature);

//-- Sauvegarder une candidature en brouillon
router.post('/saveCandidature',candidatureAction.saveCandidature);

//-- Valider et envoyer un brouillon
router.post('/validateDraft',candidatureAction.validateDraft);

// -- UPDATE
router.put('/edit/:id', candidatureAction.editCandidature);

// -- READ
router.get('/read/:id', candidatureAction.readCandidature);

//--Suppression d'une candidature
router.delete('/delete/:id', candidatureAction.deleteCandidature);

/*ATTENTION ECRIRE EN DERNIER*/ 
router.get('/:id', candidatureAction.getIdCandidat);
    
module.exports = router;