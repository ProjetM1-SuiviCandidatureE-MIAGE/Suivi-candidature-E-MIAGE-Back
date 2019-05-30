const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  nom: {
    type: String,
    require: [true, "Le champs prenom ne peut pas être vide"]
  },
  prenom: {
    type: String,
    require: [true, "Le champs prenom ne peut pas être vide"]
  },
  mail: {
    type: String,
    require: [true, "Le champs mail ne peut pas être vide"]
  },
  mdp: {
    type: String,
    require: [true, "Le champs mdp ne peut pas être vide"]
  },
  droit: String,
  token: String
});

adminSchema.methods = {
  authenticate: function(password) {
    return bcrypt.compareSync(password, this.mdp);
  }
};

adminSchema.methods.getToken = function() {
  console.log(this.token);
  if (this.token === undefined) {
    this.token = Date.now();
    console.log(this.token);
    this.save();
  }
  return this.token;
};

let Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
