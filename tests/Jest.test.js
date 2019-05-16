const fetch = require('node-fetch');

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