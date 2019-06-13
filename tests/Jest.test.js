const fetch = require('node-fetch');



const editPassword = 
  {
    "password" : "mdptest123",
    "newPassword" : "mdptest123"
  }
const testCandidature =
  {
    "candidat": {
        "id" : "5cf8dfe8cffe620e2c56bdc3",
        "nom": "test",
        "prenom": "test",
        "mail": "test@toto.to",
        "mdp": ""
    },
    "autresFichier": [],
    "etat": "non traitée",
    "commentaire": "",
    "date": "2019-03-29T08:23:52.372Z",
};

const testCandidat = {
  "nom" : "Testnom",
  "prenom" : "Testprenom",
  "mail" : "testmail@test.te"
};

//-----FONCTIONS DE TEST POUR LA PARTIE CANDIDATURE-------

//Verifie la possibilité de création d'une candidature
test('Ajouter une nouvelle candidature',async () => {
  await fetch("http://localhost:3010/candidatures/newCandidature", {
    method: "POST",
    body: JSON.stringify(testCandidature),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(function(body) {
    expect(body.candidat[0].nom).toBe("test");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

//Verifie la possibilité de récupération des candidatures
test('Recuperer toutes les candidatures', async () => {
  await fetch("http://localhost:3010/candidatures/getAllCandidatures")
  .then(res => res.json())
  .then(function(body) {
   expect(body[0].candidat[0].nom);
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

//Verifie la possibilité de récupération d'une candidature à partir d'un candidat
test('Récupérer une candidature précise', async () => {
  await fetch("http://localhost:3010/candidatures/getCandidatures/5cf8dfe8cffe620e2c56bdc3")
  .then(res => res.json())
  .then(function(body) {
    expect(body[0].candidat[0].nom).toBe("test");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

//-----FONCTIONS DE TEST POUR LA PARTIE CANDIDAT-------

//Verifie la possibilité de modification des données d'un candidat
test('edit candidat', async () => {
  await fetch("http://localhost:3010/candidats/editCandidat/5cf8dfe8cffe620e2c56bdc3", {
    method: "PUT",
    body: JSON.stringify(testCandidat),
    headers: {
      "Content-Type": "application/json"
    }
  }) //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
    expect(body.ok).toBe(1);
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

//Verifie la possibilité de modification du mot de passe d'un candidat
test('edit password candidat', async () => {
  await fetch("http://localhost:3010/candidats/editPassword/5cf8dfe8cffe620e2c56bdc3", {
    method: "PUT",
    body: JSON.stringify(editPassword),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(function(body) {
   expect(body.ok).toBe(1);
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

//-----FONCTIONS DE TEST POUR LA PARTIE ADMIN-------

//Verifie la possibilité de modification du mot de passe d'un admin
test('edit password admin', async () => {
  await fetch("http://localhost:3010/admins/editPassword/5cf7dcb81cc0888046352fc6", {
    method: "PUT",
    body: JSON.stringify(editPassword),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(function(body) {
    expect(body.ok).toBe(1);
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});