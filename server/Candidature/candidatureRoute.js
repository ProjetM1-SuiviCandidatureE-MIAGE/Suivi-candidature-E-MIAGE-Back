const router = require('express').Router();
const Joi = require('joi');
const candidatureAction = require('./candidatureAction');

const schema = Joi.object().keys({
    autresFichier : {
        nom : Joi.string().required(),
        date : Joi.string().required(),
        fichier : Joi.string().required(),
        type : Joi.string().required()
    }
}
);

//Get all candidatures
router.get('/getAllCandidatures', candidatureAction.getAllCandidatures);

//Renvoi les candidatures d'un candidat
router.get('/getCandidatures/:id',candidatureAction.getCandidaturesByID);

router.post('/newCandidature',candidatureAction.newCandidature);
//--Creation d'une candidature
//Joi.validate(router.post('/newCandidature',candidatureAction.newCandidature),schema);

//-- Sauvegarder une candidature en brouillon
router.post('/saveCandidature',candidatureAction.saveCandidature);


//-- Valider et envoyer un brouillon
Joi.validate(router.post('/validateDraft',candidatureAction.validateDraft),schema);

// -- UPDATE
router.put('/edit/:id', candidatureAction.editCandidature);

// -- READ
router.get('/read/:id', candidatureAction.readCandidature);

//--Suppression d'une candidature
router.delete('/delete/:id', candidatureAction.deleteCandidature);

/*ATTENTION ECRIRE EN DERNIER*/ 
router.get('/:id', candidatureAction.getIdCandidat);
    
module.exports = router;