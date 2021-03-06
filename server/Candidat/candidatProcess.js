const Candidat = require("../Models/candidatModel");
const mailFunction = require("../Candidature/MailProcess");
const bcrypt = require("bcrypt");
const generator = require('generate-password');
const auth = module.exports;

const salt = bcrypt.genSaltSync(10);

// AUTHENTIFICATION
auth.checkAuth = function(req, res, next) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Mot de passe vide ou mail vide"
    });
  } else {
    Candidat.findOne({ mail: req.body.mail }, function(err, candidat) {
      if (err) {
        res.status(500).json({
          text: "Erreur interne"
        });
      } else if (!candidat) {
        res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      } else {
        if (candidat.authenticate(req.body.mdp)) {
          console.log("connected");
          res.status(200).json({
            text: "Authentification réussi",
            prenom: candidat.prenom,
            nom: candidat.nom,
            id: candidat.id,
            token: candidat.getToken()
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

// get candidat
function getCandidat(req, res) {
  console.log(JSON.stringify(req.body));
  Candidat.findOne({ nom: req.params.candidat })
    .populate("candidatures")
    .then(
      candidat => {
        if (!candidat) return res.status(404).send("candidat introuvable");
        res.render("index", {
          candidat: candidat,
          candidatures: candidat.candidatures
        });
      },
      err => console.log(err)
    );
}

// --INSCRIPTION CANDIDAT
function signupCandidat(req, res) {

  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regex pour verifier le mail

  if (!req.body.mail || !req.body.mdp || !req.body.nom || !req.body.prenom || !req.body.mdpConfirmation) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Un champ est vide ou requête invalide !"
    });
  } 
  else if (req.body.mdpConfirmation !== req.body.mdp){
    res.status(401).json({
      text: "Les mots de passe ne correspondent pas"
    });
  }

  //---------Verification du mail--------
  else if (!re.test(req.body.mail)){
    res.status(401).json({
      text: "Le mail n'est pas correct."
    });
  } else {
    const candidat = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      mail: req.body.mail,
      mdp: bcrypt.hashSync(req.body.mdp, salt)
    };
    const findCandidat = new Promise(function(resolve, reject) {
      Candidat.findOne(
        {
          mail: candidat.mail
        },
        function(err, result) {
          if (err) {
            reject(500);
          } else {
            if (result) {
              reject(204);
            } else {
              resolve(true);
            }
          }
        }
      );
    });

    findCandidat.then(
      function() {
        const _a = new Candidat(candidat);
        _a.save(function(err, candidat) {
          if (err) {
            res.status(500).json({
              text: "Erreur interne"
            });
          } else {
            res.status(200).json({
              text: "Succès",
              id: candidat._id,
              token: candidat.getToken()
            });
          }
        });
      },
      function(error) {
        switch (error) {
          case 500:
            res.status(500).json({
              text: "Erreur interne"
            });
            break;
          case 204:
            res.status(204).json({
              text: "L'adresse email existe déjà"
            });
            break;
          default:
            res.status(500).json({
              text: "Erreur interne"
            });
        }
      }
    );
  }
}

// -- UPDATE
async function editCandidat(newInfo,idArg) {

  return await Candidat.updateOne({_id : idArg}, {
    $set :{"nom" : newInfo.nom,
          "prenom" : newInfo.prenom,
          "mail" : newInfo.mail        
  }});
};

// --------Edit password ---------
async function editPassword(newPsw,idArg) {

      return await Candidat.updateOne({_id : idArg}, {
        $set :{"mdp" : bcrypt.hashSync(newPsw, salt)}
      });
    
}

async function verifPassword(currentPsw,idArg) {
  
  const candidat = await Candidat.findOne({ _id : idArg });

    if( !candidat.authenticate(currentPsw)){
      return false
    } 
    else
      return true;
}

// ------ Recuperation de mdp ----
async function recupPassword(mailArg) {

  //Recuperation du mail du candidat
  Candidat.findOne({ mail: mailArg }, async function(err, candidat) {
    if(candidat === null) {
      return await {text : "Mail incorrect."};
    }
    const mail = candidat.mail;

    const newPsw = generator.generate({
      length: 10,
      numbers: true
    });
    
    await Candidat.updateOne({mail : mailArg}, {
      $set :{"mdp" : bcrypt.hashSync(newPsw, salt)   
    }});

    mailFunction.sendMail(
      {
        "mail" : mail,
        "sujet" : "Recuperation mot de passe",
        "texte" : `Bonjour, <br>
                  Voici votre mot de passe de récuperation :   ` + newPsw
      }
    );
  });
};

exports.getCandidat = getCandidat;
exports.signupCandidat = signupCandidat;
exports.editCandidat = editCandidat;
exports.editPassword = editPassword ;
exports.recupPassword = recupPassword;
exports.verifPassword = verifPassword;
