const router = require("express").Router();
const adminAction = require("./adminAction");

//--inscription
router.post("/signup", adminAction.signupAdmin);

//--Connexion
router.post("/login", adminAction.checkAuth);

//--edit Admin
router.put("/editAdmin/:id", adminAction.editAdmin);

//--edit password candidat
router.put("/editPassword/:id",adminAction.editPassword);

//-- recup password
router.put("/recupPassword/:mail",adminAction.recupPassword);

module.exports = router;
