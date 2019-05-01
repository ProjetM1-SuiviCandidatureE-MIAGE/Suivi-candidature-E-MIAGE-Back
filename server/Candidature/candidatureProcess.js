const Candidature = require("../Models/candidatureModel");
const mongoose = require('mongoose');
const temporaryFile = 
  `{ 
    "nom" : "0", 
    "date" : "0", 
    "fichier" : "0",
    "type ": "0"
  }`;   

//--ajouter une nouvelle candidature
async function newCandidature(req) {
  console.log("Process : " + req.body.mail);

  let newCandidature = new Candidature(req);
  newCandidature.id = newCandidature._id;

  return await newCandidature.save();
};

//--valider le brouillon pour le transformer en candidature non traité
function validateDraft (req){

  if (req.body.candidat.mail == "temporaryMail" || req.body.cv == temporaryFile || req.body.lm == temporaryFile || req.body.releveNote == temporaryFile || req.body.diplome == temporaryFile){
   return "Les valeurs ne sont pas valides";
  }
  else {
    
    if (req.body.etat === "brouillon" )
        req.body.etat = "non traitée";

      this.newCandidature(req);
  }
}

//--Enregistrer la candidature comme brouillon 

function saveCandidature(req){
  
  if (req.body.etat !== "brouillon")
    return "Le fichier n'est pas un brouillon";
  else {
    if (req.body.candidat.mail == null || req.body.candidat.mail == ""){
      req.body.candidat.mail = "temporaryMail";     
    }
    if (req.body.cv == null){
     
      req.body.cv = temporaryFile;
    }
    if (req.body.lm == null){
      req.body.lm = temporaryFile;
    }
    if (req.body.releveNote == null){
      req.body.releveNote = temporaryFile;
    }
    if (req.body.diplome == null){
      req.body.diplome = temporaryFile;
    }
    let newCandidature = new Candidature(req.body);
    newCandidature.id = newCandidature._id;

    newCandidature.save().then(
      () => {
        return newCandidature._id;
      },
      err => {
        return err;
      }
    );
  }
}

//--récupérer toute les candidatures
async function getAllCandidatures(){
  return await Candidature.find();
};

//--Renvoi les candidatures en fonction de l'id d'un candidat
async function getCandidaturesByID (req){
  console.log("process : " + new mongoose.Types.ObjectId(req.params.id));
  return await Candidature.findOne({"candidat.id" : new mongoose.Types.ObjectId(req.params.id)})
};

// -- UPDATE

async function editCandidature(newCandidature,id) {
  return await Candidature.updateOne({_id : new mongoose.Types.ObjectId(id)}, {$set : newCandidature});
   /* Candidature.updateOne(
      { _id: id },
      { $set: newCandidature},
      (err, updatedCandidature) => {
        if (err) {
          return err;
        } else {
          return updatedCandidature;
        }
      }
    );*/
};


//--Suppression d'une candidature
async function deleteCandidature(req){
  return await Candidature.find({_id : new mongoose.Types.ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function readCandidature(req){
  return await Candidature.findOne({_id :new mongoose.Types.ObjectId(req.params.id)});
};

/*ATTENTION ECRIRE EN DERNIER
recupération d'une de l'id d'un candiat à partir d'une candidature*/

async function getIdCandidature(req) {
  return await Candidature.findOne({mail : req.body.mail});
};
  /*function getIdCandidature(mail) {
    Candidature.findOne({"candidat.mail" : mail}, function(err, result) {
        if (err) throw err;
        console.log("ID is : "+result._id);
      });
  }*/

  exports.getAllCandidatures = getAllCandidatures;
  exports.getCandidaturesByID = getCandidaturesByID;
  exports.newCandidature = newCandidature;
  exports.editCandidature = editCandidature;
  exports.deleteCandidature = deleteCandidature;
  exports.readCandidature = readCandidature;
  exports.getIdCandidature = getIdCandidature;
  exports.saveCandidature = saveCandidature;
  exports.validateDraft = validateDraft;
 
