const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

const apiKey = "e72ca729af228beabd5d20e3b7749713";
const end = "https://api.openweathermap.org/data/2.5/weather?q=";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  let query_cityName = req.body.cityName;
  const url = end+query_cityName+"&appid="+apiKey+"&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      let temp = weatherData.main.temp;
      let feel = weatherData.main.feels_like;
      let desc = weatherData.weather[0].description;
      let img_url = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      res.write("<p>The weather is currently "+desc+"</p>");
      res.write("<img src="+img_url+"></img>");
      res.write("<h3><em>The current temperature of "+query_cityName+" is "+temp+" C but it feels like "+feel+" C</em></h3>");
      res.send();
    })
  })
})


app.listen(3000,function(){
  console.log("Server started at port 3000");
})


// const url = "https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=e72ca729af228beabd5d20e3b7749713&units=metric";
//
// https.get(url,function(response){
//   console.log(response.statusCode);
//   response.on("data",function(data){
//     const weatherData = JSON.parse(data);     //parse the hexadecimal data into the JSON format
//     console.log((weatherData.main.temp)); //convert to string using stringify
//     console.log((weatherData.main.feels_like));
//     res.write("<p>The weather is currently "+weatherData.weather[0].description+"</p>");
//     res.write("<h1>The current temp of Vijayawada is "+weatherData.main.temp+" but it feels like "+weatherData.main.feels_like+"</h1>");
//     // console.log(weatherData);
//     img_url = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
//     res.write("<img src = "+img_url+"></img>");
//     res.send();
//   })
// })
// // res.send("Server is up and running.")
