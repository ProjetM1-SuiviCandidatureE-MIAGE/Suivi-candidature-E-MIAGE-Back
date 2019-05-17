const app = require("express").Router();
const fs = require("fs"),
  path = require("path");
const formidable = require("formidable");
const CandidatureProcess = require("./CandidatureProcess");

// -- Récupérer un fichier
app.get("/getFile/:path", function(req, res) {
  const dir = (req.params.path).substring(0,2);
  const route = "../uploads/" +dir+ "/" + req.params.path;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader("Content-Dispositon","inline; filename=CV_Donnadieu_e93872.pdf");
  res.sendFile(path.join(__dirname, route));
});
// -- Télécharger un fichier vers le client
app.get("/downloadFile/:path", function(req, res) {
  const dir = (req.params.path).substring(0,2);
  const route = path.join(__dirname, "../uploads/" +dir+ "/" + req.params.path);
  res.download(route);
});
// -- Upload un fichier
app.post("/uploadFile", function(req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req);
  // Pour le moment il est copié en temporaire et il empêche de copier d'autres fichiers
  form.on("fileBegin", function(name, file) {
    const dir = (file.name).substring(0,2);
    file.path = "../Suivi-candidature-E-MIAGE-Back/server/uploads/"+dir+"/"+ file.name;
  });
  // Maintenant on le copie vraiment dans le répertoire, au même endroit que le temporaire
  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
    res.send({});
  });
});

// -- Fonction pour récupérer la candidature liée au fichier
function findCand(id, fichier) {
  if(id === null) {
    return ({etat: "rien"})
  } else {
    try{
      let callback = CandidatureProcess.readCandidature(id)
      return callback;
    }catch(err){
      console.log(err);
    }
  }

};

// -- Fonction qui vérifie que le fichier n'appartient pas à une candidature envoyée à l'enseignant
function verif(cand, fichier) {
  if(cand === null) {
    return ({text: "candidature null"});
  }
  if(cand.etat === "brouillon") {
    const dir = fichier.substring(0,2);
    const path = "../Suivi-candidature-E-MIAGE-Back/server/uploads/"+dir+"/"+ fichier;
    try {
      if (fs.existsSync(path)) {
          fs.unlinkSync(path);
          return ({ text: "fichier supprimé : " + fichier });
      } else {
        return ({text: "le fichier n'existe pas"});
      }
    } catch(err) {
      return ({text: "erreur"});
    }
  } else {
    return ({text: "fichier dans une candidature non brouillon"});
  }
}

// -- Supprimer un fichier
app.delete("/deleteFile", function(req, res) {
  console.info("Suppression du fichier : " + req.body.fichier);
  let retour = findCand(req.body.id, req.body.fichier).exec();
  retour.then(function (doc) {
    let ret = verif(doc, req.body.fichier);
    res.send(ret);
  });
});

module.exports = app;
