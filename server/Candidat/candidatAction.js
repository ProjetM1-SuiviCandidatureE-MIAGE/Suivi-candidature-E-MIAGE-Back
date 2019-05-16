const CandidatProcess = require("./candidatProcess");
const auth = module.exports;

// AUTHENTIFICATION
auth.checkAuth = function(req, res, next) {
  CandidatProcess.checkAuth(req,res);
};


// get candidat
function getCandidat(req, res) {
 CandidatProcess.getCandidat(req, res);
}

// --INSCRIPTION CANDIDAT
function signupCandidat(req, res) {
 CandidatProcess.signupCandidat(req, res);
}

//--Update d'un candidat
function editCandidat(req, res) {
  try{
    console.log("edit");
    CandidatProcess.editCandidat(req.body,req.params.id).then((callback) => {
      console.log("edit candidat ");
      res.send(callback);
    });
  }catch(err){
    res.send(err);
  }
};


exports.getCandidat = getCandidat;
exports.signupCandidat = signupCandidat;
exports.editCandidat = editCandidat;
