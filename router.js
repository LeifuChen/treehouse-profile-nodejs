const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const querystring = require("querystring")
const commonHeaders = "Content-Type"
const commonHeaderValues = "text/html";
//2. Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if (request.url === "/") {
    //show search
    if (request.method === "GET") {
      response.statusCode = 200;
      response.setHeader(commonHeaders, commonHeaderValues);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    //if url == "/" && POST
    } else if (request.method === "POST") {
      //redirect to /:username
      request.on("data", function(postBody) {
        console.log(postBody.toString());
        var query = querystring.parse(postBody.toString());
        response.statusCode = 303;
        response.setHeader("Location", "/" + query.username);
        response.end();
      });
    }
  }

}

//3. Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url === "/..."
  var username = request.url.replace("/", "");
  if (username.length > 0) {
    response.statusCode = 200;
    response.setHeader(commonHeaders, commonHeaderValues);
    renderer.view("header", {}, response);
    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON) {
      //show profile

      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      //Simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });

    //one "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });


  }
}

module.exports.home = home;
module.exports.user = user;
