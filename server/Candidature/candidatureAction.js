const Candidat = require("../Models/candidatModel");
const CandidatureProcess = require("./candidatureProcess");

//--ajouter une nouvelle candidature
function newCandidature(req, res) {
  CandidatureProcess.newCandidature(req.body).then(
    result => { 
      res.send.json(result);
    }
  );
}

function validateDraft(req,res){
  CandidatureProcess.validateDraft(req);
}

function saveCandidature(req,res){
  CandidatureProcess.saveCandidature(req);
}

//--récupérer toute les candidatures
function getAllCandidatures(req, res) {
  CandidatureProcess.getAllCandidatures().then(
    result => {
      res.send.json(result);
    }
  );
}

function getCandidaturesByID(req,res) {
    CandidatureProcess.getCandidaturesByID(req.params.id).then(
      result => {
        res.send.json(result);
      }
    );
}

//--Update d'une candidature
function editCandidature(req, res) {
  const idParam = req.params.id;
  CandidatureProcess.editCandidature(req.body,idParam).then(
    result => {
      res.send.json(result);
    }
  );
}

// -- READ
function readCandidature(req, res) {
  CandidatureProcess.readCandidature(req.params.id).then(
    result => { 
      res.send.json(result);
    }
  );
}

//--Suppression d'une candidature
function deleteCandidature(req, res) {
  CandidatureProcess.deleteCandidature(req.params.id).then(
    result => { 
      res.send.json(result);
    }
  );
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une candidature en fonction de l'id*/

function getIdCandidat(req, res) {
  CandidatureProcess.getIdCandidature(req.body.candidat.mail).then(
    result => { 
      res.send.json(result);
    }
  );
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
