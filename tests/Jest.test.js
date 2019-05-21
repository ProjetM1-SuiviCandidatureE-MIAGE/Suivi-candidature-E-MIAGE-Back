const fetch = require('node-fetch');

/* ---- SCENARIO -----
- Creation candidat
- Creation candidature
- Recuperation candidature
- Suppression candidature
- suppression candidat ?
*/ 

const testCandidat = {
  nom : "testNom",
  prenom : "testPrenom",
  mail : "test@test.te",
  mdp : "testmdp",
  mdpConfirmation : "testmdp"
};


test('Creation candidat', async () => {
  await fetch("http://localhost:3010/candidats/signupCandidat",{
    method: "POST",
    body: JSON.stringify(testCandidat),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
 /* .then(function(body) {
   expect(body[0].candidat.nom).toBe("testNom");
  })*/
/*  .then(function(response) {
    console.log(response.json());
    return response.json();
  })
  .then(function(body) {
   expect(body[0].nom).toBe("testNom");
  })*/
  .catch(err => {
    console.error(err);
  });console.log(testCandidat);
});

//-----FONCTIONS DE TEST POUR LA PARTIE CANDIDATURE-------
/*test('Récupérer une candidature précise', async () => {
  await fetch("http://localhost:3010/candidatures/getCandidatures/5caddb83e63ca70584c54647")
  .then(res => res.json())
  .then(function(body) {
    expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});


test('Recuperer toutes les candidatures', async () => {
  await fetch("http://localhost:3010/candidatures/getAllCandidatures")
  .then(res => res.json())
  .then(function(body) {
   expect(body[0].candidat.nom);
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});*/

/*

test('Ajouter une nouvelle candidature', async () => {
  await fetch("http://localhost:3010/candidatures/newCandidature", {
    method: "POST",
    body: JSON.stringify(newCandidat),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

//-----FONCTIONS DE TEST POUR LA PARTIE CANDIDAT-------

test('Afficher les candidats', async () => {
  await fetch("http://localhost:3010/candidats/candidat")
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

test('edit candidat', async () => {
  await fetch("http://localhost:3010/candidats/editCandidat/:id") //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

test('edit password candidat', async () => {
  await fetch("http://localhost:3010/candidats/editPassword/:id") //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

test('recup password candidat', async () => {
  await fetch("http://localhost:3010/candidats/recupPassword/:id") //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});


//-----FONCTIONS DE TEST POUR LA PARTIE ADMIN-------

test('edit admin', async () => {
  await fetch("http://localhost:3010/admins/editAdmin/:id") //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

test('edit password admin', async () => {
  await fetch("http://localhost:3010/admins/editPassword/:id") //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

test('recup password admin', async () => {
  await fetch("http://localhost:3010/admins/recupPassword/:id") //---> mettre un id de test
  .then(res => res.json())
  .then(function(body) {
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});

*/