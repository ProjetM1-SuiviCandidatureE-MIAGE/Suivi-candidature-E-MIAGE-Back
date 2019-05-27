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

    cv : [
        {
            _id: false,
            nom : String,
            date : String,
            fichier : String,
            ancienNom : String
            
        }
    ],

    lm : [
        {
            _id: false,
            nom : String,
            date : String,
            fichier : String,
            ancienNom : String
        }
    ],

    releveNote : [
        {
            _id: false,
            nom : String,
            date : String,
            fichier : String,
            ancienNom : String
        }
    ],

    diplome : [
        {
            _id: false,
            nom : String,
            date : String,
            fichier : String,
            ancienNom : String
        }
    ],

    autresFichier : [

        {
            
            _id: false,
            nom : String,
            date : String,
            fichier : String,
            ancienNom : String
        }
    ],

    candidat : [
    {
        _id: false,
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
    ]

});

const Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;