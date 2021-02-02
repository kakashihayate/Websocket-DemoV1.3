// Node.js WebSocket server script
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var app = express();
const server = http.createServer(app);
const WebSocketServer = require('websocket').server;
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");

const {
    allowInsecurePrototypeAccess
  } = require("@handlebars/allow-prototype-access");

var port = process.env.PORT || 9898;

const path = require('path');

server.listen(port, () => {
    console.log("Express server started at port:",+ port);
});

const wsServer = new WebSocketServer({
    httpServer: server
});
const categoryModels = require('../websocket-Demo V1.2/model/categoryDetails.model');
var webclient= [];
var admin = null;

let tshirt_old = null;
let jeans_old = null;
let drivers_old = null;

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    if(request.httpRequest.url != "/"){
        console.log("Admin");
        admin = connection
    }else{
        webclient.push(connection);
    }

  connection.on('message', function(message) {
   webclient.forEach(function each(webclient) {
    if(webclient == connection){
        console.log("Web Client");
        if(admin){
            admin.sendUTF(message.utf8Data);
        }else{
            categoryModels.firstCall(function(err, category) {
                console.log('Socket started')
                if (err)
                return err;
                category.forEach(element => { 
                    if(element.categoryId == 1){tshirt_old = element.amount}
                    else if(element.categoryId == 2){jeans_old = element.amount}
                    else{drivers_old = element.amount}
                  }); 
                    webclient.sendUTF(JSON.stringify(category));
              });
        }              
    }else{
        if(webclient){
            webclient.sendUTF(message.utf8Data);
        }else{
            admin.sendUTF("No Client Connected");
        }
    }
   
    });
  }); 
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
  });
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(

    "hbs",
  
    exphbs({
  
      handlebars: allowInsecurePrototypeAccess(handleBars),
  
      extname: "hbs",
  
      defaultLayout: "mainLayout.hbs",
  
      layoutsDir: __dirname + "/views/layouts/"
  
    })
  
);

app.set("view engine", "hbs");
app.use("/",express.static(__dirname + "/views"));
app.use("/Json",express.static(__dirname + "/getJson.json"));

// Require employee routes
const categoryDetails = require('./routes/category.routes')
// using as middleware
app.use('/api', categoryDetails);


app.get("/", (req, res) => {
    res.render("index",{layout: false});
});

app.get("/admin", (req, res) => {
    res.render("login",{layout: false});
});

app.get("/admindashboard", (req, res) => {
    res.render("adminDashboard",{layout: false});
});

let tshirt = null;
let jeans = null;
let drivers = null;

function socketServie()
{
    categoryModels.firstCall(function(err, category) {
    if (err)
    return err;

    category.forEach(element => { 
        if(element.categoryId == 1){tshirt = element.amount}
        else if(element.categoryId == 2){jeans = element.amount}
        else{drivers = element.amount}
      }); 

    if(tshirt != tshirt_old){
        webclient.forEach(function each(webclient) {   
            webclient.sendUTF(JSON.stringify(category));
        });
        console.log('old : '+tshirt_old+ " New: " +tshirt)
        tshirt_old = tshirt;
    }
    if(jeans != jeans_old){
        webclient.forEach(function each(webclient) {   
            webclient.sendUTF(JSON.stringify(category));
        });
        jeans_old = jeans;
    }
    if(drivers != drivers_old){
        webclient.forEach(function each(webclient) {   
            webclient.sendUTF(JSON.stringify(category));
        }); 
        drivers_old = drivers;

    }
  });
}

setInterval(socketServie, 1000);