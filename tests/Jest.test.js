//const sum = require('./sum');
const fetch = require('node-fetch');

test('Simple test', async () => {
  const fugu = await fetch("http://localhost:3010/candidatures/getCandidatures/5caddb83e63ca70584c54647");
  console.log(fugu.body);
  expect(fugu.body.candidat.nom).toBe("tete");
});