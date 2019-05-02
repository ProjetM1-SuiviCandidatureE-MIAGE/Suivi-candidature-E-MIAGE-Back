const mongoose = require('mongoose');

//model pour une candidature
const candidatureSchema = new mongoose.Schema({

    etat : {
        type : String,
        required : true
    },
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
            type : String
        },
        nom : {
            type : String
        },
        prenom : {
            type : String,
        },
        mail : {
            type: String,
            required : true
        },
        /* type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat' */
    }

});

const Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;