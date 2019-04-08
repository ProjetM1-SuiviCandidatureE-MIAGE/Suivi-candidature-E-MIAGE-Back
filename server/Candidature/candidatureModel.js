const mongoose = require('mongoose');

//model pour une candidature
const candidatureSchema = new mongoose.Schema({

    etat : String,
    commentaire : String,
    date : String,
    dateTraitement : String,

    cv : {

        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    lm : {
        
        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    releveNote : {
        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    diplome : {
        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    autresFichier : [

        {
        nom : String,
        date : String,
        fichier : String,
        type : String,
        }
    ],

    candidat : {
        id : {
            type : String,
            required :true
        },
        nom : {
            type : String,
            required :true
        },
        prenom : {
            type : String,
            required : true
        },
        mail : {
            type: String,
            required: true
        },
        mdp : {
            type : String,
        },
        /* type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat' */
    }

});

const Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;