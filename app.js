//Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
//Solution: Use Node.js to perfrom the profile look ups and server our template via HTTP

//1. Create a web server
const http = require("http");
const router = require("./router");

const port = process.env.PORT || 1337;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
  //response.end('Hello World\n');
});

server.listen(port, () => {
  console.log(`Server running at http://oursite:${port}/`);
});
