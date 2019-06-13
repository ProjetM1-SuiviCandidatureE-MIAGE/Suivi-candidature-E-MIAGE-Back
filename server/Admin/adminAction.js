let auth = module.exports;
const AdminProcess = require("./adminProcess");

auth.checkAuth = function(req, res, next) {
  AdminProcess.checkAuth(req, res);
};

// --INSCRIPTION Admin
function signupAdmin(req, res) {
 AdminProcess.signupAdmin(req, res);
}

//--Update d'un admin
function editAdmin(req, res) {
  const body = req.body ;

  //<
  body.mail = body.mail.trim();
  body.nom = body.nom.trim();
  body.prenom = body.prenom.trim();
  try{
    //Verification des nouvelles valeurs
    if (body.nom === "" || body.prenom === "" || body.mail === "") throw "Une valeur est nulle";
    AdminProcess.editAdmin(body,req.params.id).then((callback) => {
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
};

// -----Update du mot de passe d'un admin
async function editPassword(req,res){

  try{
    const response = await AdminProcess.verifPassword(req.body.password,req.params.id);

    if(response===false){
      res.status(530).send({text : "Mauvais mot de passe"});
    }

    else if (req.body.newPassword.trim()==="") res.status(530).send({text: "Mot de passe vide"})

    else
      AdminProcess.editPassword(req.body.newPassword,req.params.id).then((callback) => {
        res.send(callback);
      });
  }catch(err){

    res.send(err);
  }
}

// -----Recuperation du mot de passe du admin
function recupPassword(req,res){

  try{
    AdminProcess.recupPassword(req.params.mail).then((callback) => {
      console.log(callback);
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
}

exports.signupAdmin = signupAdmin;
exports.editAdmin = editAdmin;
exports.editPassword = editPassword;
exports.recupPassword = recupPassword;