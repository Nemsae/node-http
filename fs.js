const fs = require('fs');
console.log('Starting');
fs.readFile('./app.js', (err, data) => {
  if (err) throw err;
  console.log('data: ',data);
  console.log('data2: ',data.toString('utf-8'));
});
