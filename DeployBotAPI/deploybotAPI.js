var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/deploybotResponse", function(req, res){
   var domain = req.query.domain;
   var token = req.query.token;
   var select = req.query.select;
   var url = "https://" + domain + ".deploybot.com/api/v1/" + select.toLowerCase() + "?token=" + token;
   request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
          var data = JSON.parse(body);
          res.render("dbresponse", {data: data, selector: select});
          
      } 
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("DeployBot API has started");
});