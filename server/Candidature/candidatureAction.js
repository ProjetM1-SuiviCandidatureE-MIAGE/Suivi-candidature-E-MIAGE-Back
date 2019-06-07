const CandidatureProcess = require("./candidatureProcess");
const mailFonction = require("./MailProcess");

//--ajouter une nouvelle candidature
function newCandidature(req, res) {
 console.log("creation test");
 try{
  CandidatureProcess.newCandidature(req).then((callback) =>{
    console.log("creation candidature passe par le process" + callback);

    const texteMailNewCandidature = `Bonjour, <br>
    Une nouvelle candidature a été créée par  ` + req.body.candidat.nom + "   "+ req.body.candidat.prenom ;
    
    mailFonction.sendMailAllAdmins("Nouvelle candidature",texteMailNewCandidature)
    res.send(callback);
  });
 }catch(err){
   console.log("Création d'un candidat impossible "+err);
   res.send(err);
 }
};


function saveCandidature(req,res){
    res.send(CandidatureProcess.saveCandidature(req));
}

//--récupérer toute les candidatures
function getAllCandidatures(req, res) {
  try{
    CandidatureProcess.getAllCandidatures().then((callback)=>{
      res.send(callback);
    });

  }catch(err){
    res.send(err);
  }
}

function getCandidaturesByID(req,res) {
   try{
     CandidatureProcess.getCandidaturesByID(req.params.id).then((callback) =>{
       console.log("Get Candidature By ID : " + callback);
       if(callback === null) {
          res.send({text: "vide"})
       } else {
          res.send(callback);
       }
     });

   }catch(err){
     console.log("erreur "  + err);
     res.send(err);
   }
};

//--Update d'une candidature
function editCandidature(req, res) {
  try{
    CandidatureProcess.editCandidature(req.body,req.params.id).then((callback) => {
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
    CandidatureProcess.readCandidature(req.params.id).then((callback) =>{
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
    CandidatureProcess.deleteCandidature(req.params.id).then((callback) =>{
      console.log("delete Candidature ");
      res.send(callback);
    });

  }catch(err){
    res.send(err);
  }
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
}

exports.newCandidature = newCandidature;
exports.getAllCandidatures = getAllCandidatures;
exports.getCandidaturesByID = getCandidaturesByID;
exports.editCandidature = editCandidature;
exports.readCandidature = readCandidature;
exports.deleteCandidature = deleteCandidature;
exports.getIdCandidat = getIdCandidat;
exports.saveCandidature = saveCandidature;
