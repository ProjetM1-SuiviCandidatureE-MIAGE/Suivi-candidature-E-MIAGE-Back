const mail = require("./MailProcess");
const app = require("express").Router();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send", (req, res) => {
  	mail.sendMail(req.body).then((callback) => {
    	res.send(callback);
  	});
});

app.post("/sendAdmins", (req, res) => {
	mail.sendMailAllAdmins(req.body.sujet, req.body.texte).then((callback) => {
    	res.send(callback);
  	});
});

module.exports = app;

