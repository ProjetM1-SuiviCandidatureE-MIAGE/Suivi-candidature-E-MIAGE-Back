const router = require("express").Router();
const adminAction = require("./adminAction");

//--Connexion
//router.post('/login', account.login);
router.post("/login", adminAction.checkAuth);

//--edit Admin
router.put("/editAdmin/:id", adminAction.editAdmin);

module.exports = router;
