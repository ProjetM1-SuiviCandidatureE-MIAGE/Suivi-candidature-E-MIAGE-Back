const Candidature = require("../Models/candidatureModel");
 
//--ajouter une nouvelle candidature
async function newCandidature(req) {
  let newCandidature = new Candidature(req.body);
  newCandidature.id = newCandidature._id;

  return await newCandidature.save();
};

//--Enregistrer la candidature comme brouillon 

function saveCandidature(req){
  
  if (req.body.etat !== "brouillon")
    return "Le fichier n'est pas un brouillon";
  else {
    return newCandidature(req);
  }
}

//--récupérer toute les candidatures
async function getAllCandidatures(){
  return await Candidature.find();
};

//--Renvoi les candidatures en fonction de l'id d'un candidat
async function getCandidaturesByID (id){
  return await Candidature.find({"candidat.id" : id})
};

// -- UPDATE
async function editCandidature(newCandidature,id) {
  console.log("Edit");
  return await Candidature.updateOne({_id : id}, {$set : newCandidature});
};


//--Suppression d'une candidature
async function deleteCandidature(id){
  return await Candidature.find({_id : id}).deleteOne();
};

// -- READ
function readCandidature(id){
  return Candidature.findOne({_id :id});
};

/*ATTENTION ECRIRE EN DERNIER
recupération d'une de l'id d'un candiat à partir d'une candidature*/

async function getIdCandidature(req) {
  return await Candidature.findOne({mail : req.body.mail});
};

  exports.getAllCandidatures = getAllCandidatures;
  exports.getCandidaturesByID = getCandidaturesByID;
  exports.newCandidature = newCandidature;
  exports.editCandidature = editCandidature;
  exports.deleteCandidature = deleteCandidature;
  exports.readCandidature = readCandidature;
  exports.getIdCandidature = getIdCandidature;
  exports.saveCandidature = saveCandidature;
 
