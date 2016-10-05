//  RESTful C.R.U.D. API______________________________________________

const PORT = 8000;
const http = require('http');
const qs = require('querystring');



let foods = ['bread', 'cheese'];

// GET   /foods  ---> retrieve all foods
// POST  /foods?food=banana  ---> create a new food

// 1. Separate the path from the query
// 2. Ensure the path is correct
// 3. Ensure the method is correct
// 4. If POST, ensure we get the food query

const server = http.createServer((req, res) => {

  // req === request obj received
  // res === response obj - methods for the response.
  let { url, method } = req;
  console.log(`${method} ${url}`);

  let [path, queryStr] = url.split('?');  // 1.
  let query = qs.parse(queryStr); // for foods?=food&color=green
  console.log('query2: ',query);

  switch(path) {
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



//  Simple HTTP Server______________________________________________
//
// const PORT = 8000;
// const http = require('http');
//
// let name = 'John';
// let language = 'Javascript';
//
// //  /name --> 'John'
// //  /language --> 'Javascript'
// //  default --> 'Found Nothing'
//
// const server = http.createServer((req, res) => {
//
//   // req === request obj received
//   // res === response obj - methods for the response.
//   let { url, method } = req;
//   console.log(`${method} ${url}`);
//
//   switch(url) {
//     case '/name':
//       res.write(name);
//       // res.end('\n');
//       break;
//     case '/language':
//       res.write(language);
//       // res.end('\n');
//       break;
//     default:
//       res.statusCode = 404;
//       res.write('Found Nothing');
//       // res.end('\n');
//   }
//
//   // res.write('Hello from node!');
//   res.end('\n');
// });
//
// //when server is done listening, callback is executed
// server.listen(PORT, err => {
//   console.log(err || `Server Lisening on port ${PORT}`)
//
// });
