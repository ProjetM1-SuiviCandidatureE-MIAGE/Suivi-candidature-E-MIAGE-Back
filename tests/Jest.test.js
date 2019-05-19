const fetch = require('node-fetch');

//-----FONCTIONS DE TEST POUR LA PARTIE CANDIDATURE-------
test('Simple test', async () => {
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
   // expect(body[0].candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
});


test('Ajouter une nouvelle candidature', async () => {
  await fetch("http://localhost:3010/candidatures/newCandidature")
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
