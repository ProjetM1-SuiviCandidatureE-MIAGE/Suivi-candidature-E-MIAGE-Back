const router = require("express").Router();
const candidatAction = require("./candidatAction");

//--inscription
router.post("/signup", candidatAction.signupCandidat);

//--Connexion
router.post("/login", candidatAction.checkAuth);

//--afficher les candidatures
router.get("/candidat", candidatAction.getCandidat);

//--edit candidat
router.put("/editCandidat/:id", candidatAction.editCandidat);

//--edit password candidat
router.put("/editPassword/:id",candidatAction.editPassword);

//-- recup password
router.put("/recupPassword/:id",candidatAction.recupPassword);

module.exports = router;
