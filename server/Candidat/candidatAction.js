const CandidatProcess = require("./candidatProcess");
const auth = module.exports;

// AUTHENTIFICATION
auth.checkAuth = function(req, res, next) {
  CandidatProcess.checkAuth(req,res);
};


// get candidat
function getCandidat(req, res) {
 CandidatProcess.getCandidat(req, res);
}

// --INSCRIPTION CANDIDAT
function signupCandidat(req, res) {
 CandidatProcess.signupCandidat(req, res);
}

//--Update d'un candidat
function editCandidat(req, res) {
  const body = req.body ;

  //<
  body.mail = body.mail.trim();
  body.nom = body.nom.trim();
  body.prenom = body.prenom.trim();
  try{
    //Verification des nouvelles valeurs
    if (body.nom === "" || body.prenom === "" || body.mail === "") throw "Une valeur est nulle";
    CandidatProcess.editCandidat(body,req.params.id).then((callback) => {
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
};

// -----Update du mot de passe d'un candidat
async function editPassword(req,res){

  try{
    const response = await CandidatProcess.verifPassword(req.body.password,req.params.id);

    if(response===false){
      res.status(530).send({text : "Mauvais mot de passe"});
    }

    else if (req.body.newPassword.trim()==="") res.status(530).send({text: "Mot de passe vide"})

    else 
      CandidatProcess.editPassword(req.body.newPassword,req.params.id).then((callback) => {
        res.send(callback);
      });

  }catch(err){
    res.send(err);
  }
}

// -----Recuperation du mot de passe du candidat
function recupPassword(req,res){

  try{
    CandidatProcess.recupPassword(req.params.mail).then((callback) => {
      console.log(callback);
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
}

exports.getCandidat = getCandidat;
exports.signupCandidat = signupCandidat;
exports.editCandidat = editCandidat;
exports.editPassword = editPassword;
exports.recupPassword = recupPassword;