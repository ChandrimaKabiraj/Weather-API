const express = require("express");
const app= express();
const https = require("https");
const bodyPaerser = require("body-parser");

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const city = "Kolkata";
  const apikey = "763b564b2c158e952f90d5a5649e584e";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apikey +"&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata = JSON.parse(data);/*converting json to string to java script object*/
      const temp = weatherdata.main.temp;
      const weather = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather condition is like " + weather + "<p>");
      res.write("<h1>The temperature in India is "+ temp + " degrees Celcius </h1>");
      res.write("<img src= " + iconurl + ">");
      res.send()
    })
  })
})
app.listen(3000,function(){
  console.log("Server Running");
})
