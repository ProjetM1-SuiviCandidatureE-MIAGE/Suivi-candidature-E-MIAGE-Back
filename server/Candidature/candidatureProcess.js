const Candidature = require("./candidatureModel");
const Candidat = require("../Candidat/candidatModel");
const temporaryFile = 
  `{ 
    "nom" : "0", 
    "date" : "0", 
    "fichier" : "0",
    "type ": "0"
  }`;   

//--ajouter une nouvelle candidature
function newCandidature(req, res) {
  console.log(JSON.stringify(req.body));
  let newCandidature = new Candidature(req.body);
  newCandidature.id = newCandidature._id;

  newCandidature.save().then(
    () => {
      res.status(200).json(newCandidature._id);
    },
    err => {
      res.status(400).json(err);
    }
  );
}

//--valider le brouillon pour le transformer en candidature en attente
function validateDraft (req, res){

  if (req.body.candidat.mail == "temporaryMail" || req.body.cv == temporaryFile || req.body.lm == temporaryFile || req.body.releveNote == temporaryFile || req.body.diplome == temporaryFile){
    res.status(400).json("Les valeurs ne sont pas valides");
  }
  else {
    
    if (req.body.etat === "brouillon" )
        req.body.etat = "non traitée";

      this.newCandidature(req,res);
  }
}

//--Enregistrer la candidature comme brouillon 

function saveCandidature(req, res){
  console.log(JSON.stringify(req.body));
  
  if (req.body.etat !== "brouillon")
    res.status(400).json("Le fichier n'est pas un brouillon");
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
        res.status(200).json(newCandidature._id);
      },
      err => {
        res.status(400).json(err);
      }
    );
  }
}

//--afficher toutes les candidatures
function displayAll(req, res) {
  Candidature.find({})
    .populate("candidats")
    .then(candidatures => {
      res.send("index", { candidatures: candidatures });
    });
}

//--récupérer toute les candidatures
function getAllCandidatures(req, res) {
  Candidature.find({}, function(err, candidatures) {
    if (err) {
      console.log(err);
    }
    res.send(candidatures);
  });
}

//--Renvoi les candidatures en fonction de l'id d'un candidat
function getCandidaturesByID (id,res){
  Candidature.findOne({"candidat.id" : id}, function(err, candidatures) {
    if (err) {
      res.status(400).json(err);
    }
      res.send(candidatures);
  });
}

// -- UPDATE

function editCandidature(req,res, id) {

    console.log("Req : "+req);
    Candidature.updateOne(
      { _id: id },
      { $set: req.body },
      (err, updatedCandidature) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(updatedCandidature);
        }
      }
    );
  }


    //--afficher les nouvelle candidatures
function DisplayNewCandidature(req, res) {
  Candidat.find({}).then(candidats => {
    let candidature = new Candidature();
    res.render("index", {
      candidature: candidature,
      candidats: candidats,
      endpoint: "/"
    });
  });
}

//--Suppression d'une candidature
function deleteCandidature(req, res) {
  Candidature.find({ id: req.params.id })
    .deleteOne()
    .then(
      () => {
        res.status(204).json();
      },
      err => {
        res.status(400).json(err);
      }
    );
}

// -- READ
function readCandidature(req, res) {
  Candidature.findOne({ _id: req.params.id }).then(
    candidature => {
      if (candidature) {
        res.status(200).json(candidature);
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    },
    err => {
      res.status(400).json(err);
    }
  );
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une candidature en fonction de l'id*/

  function getIdCandidature(req, res) {
    Candidature.findOne({"candidat.mail" : req.mail}, function(err, result) {
        if (err) throw err;
        console.log("ID is : "+result._id);
      });
  }

  exports.getAllCandidatures = getAllCandidatures;
  exports.getCandidaturesByID = getCandidaturesByID;
  exports.newCandidature = newCandidature;
  exports.displayAll = displayAll;
  exports.DisplayNewCandidature = DisplayNewCandidature;
  exports.editCandidature = editCandidature;
  exports.deleteCandidature = deleteCandidature;
  exports.readCandidature = readCandidature;
  exports.getIdCandidature = getIdCandidature;
  exports.saveCandidature = saveCandidature;
  exports.validateDraft = validateDraft;
 
