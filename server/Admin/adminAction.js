let auth = module.exports;
const AdminProcess = require("./adminProcess");

auth.checkAuth = function(req, res, next) {
  AdminProcess.checkAuth(req, res);
};

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
function editPassword(req,res){

  try{
  AdminProcess.editPassword(req.body.password,req.body.newPassword,req.params.id).then((callback) => {
    res.send(callback);
  });

  }catch(err){
    res.send(err);
  }
}

// -----Recuperation du mot de passe du admin
function recupPassword(req,res){

  try{
  AdminProcess.recupPassword(req.params.id).then((callback) => {
    res.send(callback);
  });
  }catch(err){
    res.send(err);
  }
}

exports.editAdmin = editAdmin;
exports.editPassword = editPassword;
exports.recupPassword = recupPassword;