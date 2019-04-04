const Candidat = require("../Candidat/candidatModel");
const CandidatureProcess = require("./candidatureProcess");

//--ajouter une nouvelle candidature
function newCandidature(req, res) {
  CandidatureProcess.newCandidature(req, res);
}

function saveCandidature(req,res){
  CandidatureProcess.saveCandidature(req,res);
}

function validateDraft(req,res){
  CandidatureProcess.validateDraft(req,res);
}

//--afficher toutes les candidatures
function displayAll(req, res) {
 CandidatureProcess.displayAll(req,res);
}

//--récupérer toute les candidatures
function getAllCandidatures(req, res) {
  CandidatureProcess.getAllCandidatures(req,res);
}

//--afficher les nouvelle candidatures
function DisplayNewCandidature(req, res) {
  CandidatureProcess.DisplayNewCandidature(req,res);
}

//--Update d'une candidature
function editCandidature(req, res) {
  const idParam = req.params.id;
  console.log("idParam : "+idParam);
  CandidatureProcess.editCandidature(req,res,idParam);
}

// -- READ
function readCandidature(req, res) {
  CandidatureProcess.readCandidature(req,res)
}

//--Suppression d'une candidature
function deleteCandidature(req, res) {
  CandidatureProcess.deleteCandidature(req,res);
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une candidature en fonction de l'id*/

function getIdCandidat(req, res) {
  CandidatureProcess.getIdCandidature(req,res);
}

exports.newCandidature = newCandidature;
exports.displayAll = displayAll;
exports.getAllCandidatures = getAllCandidatures;
exports.DisplayNewCandidature = DisplayNewCandidature;
exports.editCandidature = editCandidature;
exports.readCandidature = readCandidature;
exports.deleteCandidature = deleteCandidature;
exports.getIdCandidat = getIdCandidat;
exports.saveCandidature = saveCandidature;
exports.validateDraft = validateDraft;
