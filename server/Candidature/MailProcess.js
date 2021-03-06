const nodemailer = require("nodemailer");
const adminFonction = require("../Admin/adminProcess");


// Fonction pour envoyer un mail
async function sendMail (body) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gestioncandidaturem1miaa@gmail.com",
      pass: "azertyM1MIAA"
    },
    tls: { rejectUnauthorized: false }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
    from: "gestioncandidaturem1miaa@gmail.com", // sender address
    to: body.mail, // list of receivers
    subject: body.sujet, // Subject line
    //text: "Hello world?", // plain text body
    html: body.texte // html body
  };
  
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erreur lors de l'envoi du mail");
      return console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId);
      return ({ text: "succès, mail envoyé" });
    }
  });
}

// Fonction pour envoyer un mail à tous les enseignants/admins
async function sendMailAllAdmins(sujet,texte){
  const admins = await adminFonction.getAllAdmins();
  console.log(admins);
  admins.forEach(element => {
    sendMail(
      {
        mail : element.mail,
        sujet : sujet,
        texte : texte
      })
  });
  return ({ text: "succès, mails envoyés aux admins" }); 
}
  
exports.sendMail = sendMail;
exports.sendMailAllAdmins = sendMailAllAdmins;