var fs = require("fs");

function mergeValues(values, content) {
  for (var key in values) {
    content = content.replace("{{" + key + "}}", values[key]);
  }
  return content;
}

function view(templateName, values, response) {
  //Read from the templatefile
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', "utf-8");
  //insert values into content
  fileContents = mergeValues(values, fileContents);
  //write out the contents to the response
  response.write(fileContents);
}

module.exports.view = view;
