//____________________________//John's Custom API//____________________________//
const PORT = 8000;
const http = require('http');
const qs = require('querystring');
// const md5 = require('md5');
// const moment = require('moment');
const wd = require('word-definition');
const routes = require('./routes')
const sCheck = require('spellchecker')

const server = http.createServer((req, res) => {
  // req === request obj received
  // res === response obj - methods for the response.
  let { url, method } = req;
  console.log(`${method} ${url}`);

// // For Food__________________________________________________________________
//   let foods = ['bread', 'cheese'];
//   let [path, queryStr] = url.split('?'); // 1.
//   let query = qs.parse(queryStr);        // for foods?=food&color=green
//   console.log('query: ',query)

// // For Math__________________________________________________________________
//   let [ foo, path, oper, num1, num2 ] = url.split('/');
//   console.log('path: ',path,'   oper: ',oper,'    num1: ',num1,'    num2: ',num2);

// For Gravatar_______________________________________________________________
  // let [ foo, path, email ] = url.split('/');

// // For Sentence Analyzer______________________________________________________
//   let [ foo, path, urlString] = url.split('/');
//   let string = decodeURI(urlString);

// For Spell Checker______________________________________________________
  let [ foo, path, urlString] = url.split('/');
  let string = decodeURI(urlString);

// // For Age Calculator____________________________________________________________
//   let [ foo, path, month, day, year ] = url.split('/');
//   console.log('path: ',path,'   month: ',month,'    day: ',day,'    year: ',year);

// // For Magic 8 Ball______________________________________________________________
//   let magic8Answers = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Dont count on it m8', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful']
//   let [ foo, path, urlString] = url.split('/');
//   let string = decodeURI(urlString).concat('?');

// // For Dictionary______________________________________________________________
//   let [ foo, path, urlString] = url.split('/')
//   let string = decodeURI(urlString);

// // For UnProfane______________________________________________________________
//   let [ foo, path, urlString] = url.split('/')
//   let string = decodeURI(urlString);

//______________________________// switch for All//______________________________//
  switch(path) {
//______________________________// switch for All//______________________________//

// For SpellChecker________________________________________________________________
    case 'spellcheck':
      switch(method) {
        case 'POST':
          console.log('string: ',string);
          let x = sCheck.isMisspelled(string);
          if (x == true) {
            let y = sCheck.getCorrectionsForMisspelling(string);
            res.end(`${y}`);
          }
        res.end(`Spellcheck!`)
        break;
      }
      break;

// For UnProfane________________________________________________________________
    case 'unprofane':
      switch(method) {
        case 'POST':

        res.end(`Blah. F*** You m8.`)
        break;
      }
      break;

// For Dictionary_______________________________________________________________
    case 'define':
      switch(method) {
        case 'POST':
          let answer = wd.getDef(string, 'en', null, definition => {
            let myAnswer = definition;
            // console.log('definition: ',definition)
            res.end(`Word: ${string}\nCategory: ${definition.category}\nDefinition: ${definition.definition}`)
          })
        break;
      }
      break;

// For Magic8___________________________________________________________________
    case 'magic8':
      switch(method) {
        case 'POST':
         let number = Math.floor(Math.random()*20);
         let answer = magic8Answers[number];

        res.end(`Your question: ${string}\nMagic 8 says: ${answer}.`);
        break;
      }
      break;

// For Analyze__________________________________________________________________
    case 'analyze':
      switch(method) {
        case 'POST':
          let words = string.split(' ');
          let totalWords = words.length;
          let totalLetters = words.join('').split('').length;
          let avgWordLength = totalLetters/totalWords;
          // console.log('totalWords: ',totalWords,'   totalLetters: ',totalLetters,'   avgWordLength: ',avgWordLength);
          let wordPackage = {
            totalWords,
            totalLetters,
            avgWordLength,
          }
          let answer = JSON.stringify(wordPackage);

        res.end(`${answer}`);
        break;
      }
      break;

// For Birthdate________________________________________________________________
    case 'age':
      switch(method) {
        case 'POST':
          let years = moment().diff(`${year}-${month}-${day}`, 'years',false);
          console.log('years: ',years)

        res.end(`You are ${years} years old.`);
        break;
      }
      break;

// For Math____________________________________________________________________
    case 'math':
      switch(method) {
        case 'POST':
          if (oper==='add') {2
            let sum = parseInt(num1) + parseInt(num2);
            console.log('Addition: ',sum)
            return res.end(`${sum}`);
          } else if (oper==='subtract') {
            let sum = parseInt(num1) - parseInt(num2);
            console.log('Subtraction: ',sum)
            return res.end(`${sum}`);
          } else if (oper==='multiply') {
            let sum = parseInt(num1) * parseInt(num2);
            console.log('Multiplication: ',sum)
            return res.end(`${sum}`);
          } else if (oper==='divide') {
            let sum = parseInt(num1)/parseInt(num2);
            console.log('Division: ',sum)
            return res.end(`${sum}`);
          } else if (oper==='power') {
            let sum = Math.pow(parseInt(num1), parseInt(num2));
            console.log('Power: ',sum)
            return res.end(`${sum}`);
          }

        res.end('Im here!');
        break;
      }
      break;

// For Gravatar_________________________________________________________________
    case 'gravatar':
      switch(method) {
        case 'POST':
          let hash = routes.gravatar(email);
        res.end(`http://www.gravatar.com/avatar/${hash}`);
        break;
      }
      break;

// // For Gravatar________________________________________________________________
//     case 'gravatar':
//       switch(method) {
//         case 'POST':
//           console.log('email: ', email);
//           let hash = md5(email);
//           console.log('hash: ',hash);
//         res.end(`http://www.gravatar.com/avatar/${hash}`);
//         break;
//       }
//       break;

// For Foods____________________________________________________________________
    case '/foods':
      switch(method) {
        case 'GET':
          res.end(JSON.stringify(foods));
          break;
        case 'POST':
          if(!query.food) {
            res.statusCode=400;
            return res.end('Missing food query param.');
          }
          foods.push(query.food);
          res.end('\n');
          break;

      }
      break;

      default:
        res.statusCode = 404;
        res.end('Not Found');
  }
});

//when server is done listening, callback is executed
server.listen(PORT, err => {
  console.log(err || `Server Lisening on port ${PORT}`)

});
