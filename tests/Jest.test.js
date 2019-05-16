//const sum = require('./sum');
const fetch = require('node-fetch');

// test('Simple test', async () => {
//   const fugu = await fetch("http://localhost:3010/candidatures/getCandidatures/5caddb83e63ca70584c54647");
//   console.log("Test : "+ fugu.body);
//   expect(fugu.body.candidat.nom).toBe("tete");
// });

test('Simple test', () => {
  fetch("http://localhost:3010/candidatures/getCandidatures/5caddb83e63ca70584c54647")
  .then(function(response) {
    return response.json();
  })
  .then(function(body) {
    console.log(body);
    expect(body.candidat.nom).toBe("tete");
  })
  .catch(err => {
    console.error(err);
    alert("error !");
  });
 // expect(fugu.body.candidat.nom).toBe("tete");
});