const Candidature = require("../Models/candidatureModel");
const temporaryFile = 
  `{ 
    "nom" : "0", 
    "date" : "0", 
    "fichier" : "0",
    "type ": "0"
  }`;   

//--ajouter une nouvelle candidature
function newCandidature(bodyCandidature) {
  let newCandidature = new Candidature(bodyCandidature);
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
function getAllCandidatures() {
  Candidature.find({}, function(err, candidatures) {
    if (err) 
      return err;
    else
      return candidatures;
  });
}

//--Renvoi les candidatures en fonction de l'id d'un candidat
function getCandidaturesByID (id){
  Candidature.findOne({"candidat.id" : id}, function(err, candidatures) {
    if (err) {
     return err;
    }
     return candidatures;
  });
}

// -- UPDATE

function editCandidature(newCandidature,id) {

    Candidature.updateOne(
      { _id: id },
      { $set: newCandidature},
      (err, updatedCandidature) => {
        if (err) {
          return err;
        } else {
          return updatedCandidature;
        }
      }
    );
  }


//--Suppression d'une candidature
function deleteCandidature(idArg) {
  Candidature.find({ id: idArg })
    .deleteOne()
    .then(
      err => {
        return (err);
      }
    );
}

// -- READ
function readCandidature(idArg) {
  Candidature.findOne({ _id: idArg }).then(
    candidature => {
      if (candidature) {
        return candidature;
      } else {
        return "Not Found" ;
      }
    },
    err => {
      return err;
    }
  );
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une de l'id d'un candiat à partir d'une candidature*/

  function getIdCandidature(mail) {
    Candidature.findOne({"candidat.mail" : mail}, function(err, result) {
        if (err) throw err;
        console.log("ID is : "+result._id);
      });
  }

  exports.getAllCandidatures = getAllCandidatures;
  exports.getCandidaturesByID = getCandidaturesByID;
  exports.newCandidature = newCandidature;
  exports.editCandidature = editCandidature;
  exports.deleteCandidature = deleteCandidature;
  exports.readCandidature = readCandidature;
  exports.getIdCandidature = getIdCandidature;
  exports.saveCandidature = saveCandidature;
  exports.validateDraft = validateDraft;
 
