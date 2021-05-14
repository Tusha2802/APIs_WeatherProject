const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){

    var p = req.body.place;
    console.log(p);
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+p+"&appid=61af63dcece7e86edb622fd09e0f1f13&units=metric";

    https.get(url, (response) => {

        console.log(response.statusCode);
        response.on("data", function(data){
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const desc = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp + " " + desc);
            //res.write("<img src="+image+"/><br/>");
            res.write("<h1>The temperature in "+p+" right now is " + temp + "&deg and it is "+ desc + " out there!</h1>");
            res.write("<img src="+image+"><br>");
            res.send();
        })
        
    })
})

app.listen(3000, function(){
    console.log("Server has started on port 3000");
})