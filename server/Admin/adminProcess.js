const Admin = require("../Models/adminModel");
const mailFunction = require("../Candidature/MailProcess");
const bcrypt = require("bcrypt");
const generator = require('generate-password');
const auth = module.exports;

const salt = bcrypt.genSaltSync(10);

auth.checkAuth = function(req, res, next) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Mot de passe vide ou mail vide"
    });
  } else {
    Admin.findOne({ mail: req.body.mail }, function(err, admin) {
      if (err) {
        res.status(500).json({
          text: "Erreur interne"
        });
      } else if (!admin) {
        res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      } else {
        if (admin.authenticate(req.body.mdp)) {
          console.log("connected");
          res.status(200).json({
            text: "Authentification réussi",
            prenom: admin.prenom,
            nom: admin.nom,
            id: admin._id,
            token: admin.getToken()
          });
        } else {
          console.log("not connected");
          res.status(401).json({
            text: "Mot de passe incorrect"
          });
        }
      }
    });
  }
};

// -- UPDATE
async function editAdmin(newInfo,id) {
  return await Admin.updateOne({_id : id}, {
    $set :{"nom" : newInfo.nom,
          "prenom" : newInfo.prenom,
          "mail" : newInfo.mail        
  }});
};


// --------Edit password ---------
async function editPassword(newPsw,idArg) {

      return await Admin.updateOne({_id : idArg}, {
        $set :{"mdp" : bcrypt.hashSync(newPsw, salt)}
      });
    
}

async function verifPassword(currentPsw,idArg) {
  
  const admin = await Admin.findOne({ _id : idArg });

    if( !admin.authenticate(currentPsw)){
      return false
    } 
    else
      return true;
}

// ------ Recuperation de mdp ----
async function recupPassword(mailArg) {

  //Recuperation du mail du admin
  Admin.findOne({ mail: mailArg }, async function(err, admin) {
    const mail = admin.mail;

    const newPsw = generator.generate({
      length: 10,
      numbers: true
    });
    
    await Admin.updateOne({ mail: mailArg }, {
      $set :{"mdp" : bcrypt.hashSync(newPsw, salt)   
    }});

    mailFunction.sendMail(
      {
        "mail" : mail,
        "sujet" : "Recuperation mot de passe",
        "texte" : `Bonjour ${admin.prenom} ${admin.nom}, <br><br>
                  Voici votre mot de passe de récuperation :   ` + newPsw
      }
    );
  });
};

exports.editAdmin = editAdmin;
exports.verifPassword = verifPassword;
exports.editPassword = editPassword ;
exports.recupPassword = recupPassword;
