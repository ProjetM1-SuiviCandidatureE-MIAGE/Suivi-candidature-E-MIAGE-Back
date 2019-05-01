const app = require("express").Router();
const fs = require("fs"),
  path = require("path");
const formidable = require("formidable");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -- LIRE UN REPERTOIRE
app.get("/", function(req, res) {
  console.log("Lecture répertoire");
});
// -- Récupérer un fichier
app.get("/getFiles/:path", function(req, res) {
  console.log("get files");
});
// -- Upload un fichier
app.post("/uploadFile", function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req);
  // Pour le moment il est copié en temporaire et il empêche de copier d'autres fichiers
  form.on("fileBegin", function(name, file) {
    const dir = (file.name).substring(0,2);
    file.path = "../Suivi-candidature-E-MIAGE-Back/server/uploads/" +dir+"/"+ file.name;
  });
  // Maintenant on le copie vraiment dans le répertoire, au même endroit que le temporaire
  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
    res.send({});
  });
});
// -- Supprimer un fichier
app.delete("/deleteFile", function(req, res) {
  console.info("Suppression du fichier : " + req.body.fichier);
  const dir = (req.body.fichier).substring(0,2);
  const path = "../Suivi-candidature-E-MIAGE-Back/server/uploads/" +dir+"/"+ req.body.fichier;
  try {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        res.send({ text: "fichier supprimé : " + req.body.fichier });
    } else {
      console.log("le fichier n'existe pas")
      res.send({text: "le fichier n'existe pas"})
    }
  } catch(err) {
    console.error(err)
    res.send({text: "erreur"})
  }

});

module.exports = app;
