var http = require("http");

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World').listen(8080);
});

server.listen(port, hostname);

var bodyParser = require("body-parser"),
express        = require("express"),
axios          = require('axios'),
app            = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.redirect("/chatbot");
});

app.get("/chatbot", function(req, res){
   res.render("chatbot");
});

app.get("/getMessage", function(req, res){
    axios.get('http://localhost:8080?message=' + req.query.message)
      .then(function (response) {
        response = response.data;
        return res.send(response);
      })
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Node.js HTTP server started on port 3000!");
});
