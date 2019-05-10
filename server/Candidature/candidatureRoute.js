const router = require('express').Router();
const Joi = require('joi');
const candidatureAction = require('./candidatureAction');
const schema = Joi.object().keys({
        date : Joi.string().required(),
        dateTraitement : Joi.string().required(),
        cv : Joi.required(),
        cv : {
            nom : Joi.string().required(),
            date : Joi.string().required(),
            fichier : Joi.string().required(),
            type : Joi.string().required()
        },
        lm : {
            nom : Joi.string().required(),
            date : Joi.string().required(),
            fichier : Joi.string().required(),
            type : Joi.string().required()
        },
        releveNote : {
            nom : Joi.string().required(),
            date : Joi.string().required(),
            fichier : Joi.string().required(),
            type : Joi.string().required()
        },
        diplome : {
            nom : Joi.string().required(),
            date : Joi.string().required(),
            fichier : Joi.string().required(),
            type : Joi.string().required()
        },
        autresFichier : {
            nom : Joi.string().required(),
            date : Joi.string().required(),
            fichier : Joi.string().required(),
            type : Joi.string().required()
        }
    });

router.post('/validerSchema',(req,res) =>{
    const data = req.body;
    
    
    Joi.validate(data,schema,(err, result) =>{
        if(err){
            res.send("Non non non c est encore du caca la ! "+ err);
        }
        console.log(result);
        res.send('validation ok');
    })
    
})


//Get all candidatures
router.get('/getAllCandidatures', candidatureAction.getAllCandidatures);

//Renvoi les candidatures d'un candidat
router.get('/getCandidatures/:id',candidatureAction.getCandidaturesByID);

router.post('/newCandidature',candidatureAction.newCandidature);
//--Creation d'une candidature
Joi.validate(router.post('/newCandidature',candidatureAction.newCandidature),schema);

//-- Sauvegarder une candidature en brouillon
router.post('/saveCandidature',candidatureAction.saveCandidature);

// -- UPDATE
router.put('/edit/:id', candidatureAction.editCandidature);

// -- READ
router.get('/read/:id', candidatureAction.readCandidature);

//--Suppression d'une candidature
router.delete('/delete/:id', candidatureAction.deleteCandidature);

/*ATTENTION ECRIRE EN DERNIER*/ 
router.get('/:id', candidatureAction.getIdCandidat);
    
module.exports = router;