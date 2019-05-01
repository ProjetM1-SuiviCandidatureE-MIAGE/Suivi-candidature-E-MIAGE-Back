const Candidat = require("../Models/candidatModel");
const CandidatureProcess = require("./candidatureProcess");

//--ajouter une nouvelle candidature
function newCandidature(req, res) {
 console.log("creation test");
 try{
  CandidatureProcess.newCandidature(req).then((callback) =>{
    console.log("creation candidature passe par le process" + callback);
    res.send(callback);
  });
 }catch(err){
   console.log("Création d'un candidat impossible "+err);
   res.send(err);
 }
};

function validateDraft(req,res){
  CandidatureProcess.validateDraft(req);
}

function saveCandidature(req,res){
  CandidatureProcess.saveCandidature(req);
}

//--récupérer toute les candidatures
function getAllCandidatures(req, res) {
  try{
    CandidatureProcess.getAllCandidatures().then((callback)=>{
      console.log("get all candidature fonctionne");
      res.send(callback);
    });

  }catch(err){
    res.send(err);
  }
}

function getCandidaturesByID(req,res) {
   console.log("getCandidature test");
   try{
     CandidatureProcess.getCandidaturesByID(req).then((callback) =>{
       console.log("Get Candidature By ID : " + callback);
       res.send(callback);
     });

   }catch(err){
     console.log("erreur "  + err);
     res.send(err);
   }
  /* CandidatureProcess.getCandidaturesByID(req.params.id).then(
      result => {
        res.send.json(result);
      }
    );*/
};

//--Update d'une candidature
function editCandidature(req, res) {
  try{
    CandidatureProcess.editCandidature(req.body.id).then((callback) => {
      console.log("edit candidature ");
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
};

// -- READ
function readCandidature(req, res) {
  try{
    CandidatureProcess.readCandidature(req).then((callback) =>{
      console.log("read candidature : " + callback);

      res.send(callback);
    });

  }catch(err){
    res.send(err);
  }
};

//--Suppression d'une candidature
function deleteCandidature(req, res) {
  try{
    CandidatureProcess.deleteCandidature(req).then((callback) =>{
      console.log("delete Candidature ");
      res.send(callback);
    });

  }catch(err){
    res.send(err);
  }
 /* CandidatureProcess.deleteCandidature(req.params.id).then(
    result => { 
      res.send.json(result);
    }
  );*/
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une candidature en fonction de l'id*/

function getIdCandidat(req, res) {
  try{
    CandidatureProcess.getIdCandidat(req).then((callback) =>{
      console.log("get ID Candidat ");
      res.send(callback);
    });

  }catch(err){
    res.send(err);
  }
 /* CandidatureProcess.getIdCandidature(req.body.candidat.mail).then(
    result => { 
      res.send.json(result);
    }
  );*/
}

exports.newCandidature = newCandidature;
exports.getAllCandidatures = getAllCandidatures;
exports.getCandidaturesByID = getCandidaturesByID;
exports.editCandidature = editCandidature;
exports.readCandidature = readCandidature;
exports.deleteCandidature = deleteCandidature;
exports.getIdCandidat = getIdCandidat;
exports.saveCandidature = saveCandidature;
exports.validateDraft = validateDraft;
