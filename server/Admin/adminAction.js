let auth = module.exports;
const AdminProcess = require("./adminProcess");

auth.checkAuth = function(req, res, next) {
  AdminProcess.checkAuth(req, res);
};

//--Update d'un Admin
function editAdmin(req, res) {
  try{
    console.log("edit");
    AdminProcess.editAdmin(req.body,req.params.id).then((callback) => {
      console.log("edit candidat ");
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
};

exports.editAdmin = editAdmin;