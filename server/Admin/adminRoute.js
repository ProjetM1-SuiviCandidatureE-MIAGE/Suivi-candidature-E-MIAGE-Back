const router = require("express").Router();
const adminAction = require("./adminAction");

//--Connexion
//router.post('/login', account.login);
router.post("/login", adminAction.checkAuth);

//--edit Admin
router.put("/editAdmin/:id", adminAction.editAdmin);


//--edit password candidat
router.put("/editPassword/:id",adminAction.editPassword);

//-- recup password
router.put("/recupPassword/:id",adminAction.recupPassword);

module.exports = router;
