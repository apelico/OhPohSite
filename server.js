const PORT = process.env.PORT || 3000;
const request = require('request');
var express = require('express'),
  http = require('http');
var app = express();
var server = http.createServer(app);

const path = require('path');
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//Weather
let key1 = process.env.OPENWEATHERKEY;
let key2 = process.env.DARKSKYKEY;

app.post('/weatherLog', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key1}`
  let weather;

  request(url, function(err, response, body) {
    if (err) {
      throw console.error();
    } else {
      weather = JSON.parse(body);
      if (weather.cod == '404') {
        res.json({
          error: "NoCity"
        });
      } else {
        if(weather.coord != undefined){
          let darkUrl = `https://api.darksky.net/forecast/${key2}/${weather.coord.lat},${weather.coord.lon}`;
          request(darkUrl, function(err, response, body) {
            if (err) {
              throw console.error();
            } else {
              let darkWeather = JSON.parse(body)
              res.json({
                city: city,
                current: darkWeather.currently,
                hourly: darkWeather.hourly,
                daily: darkWeather.daily
              })
            }
          });
        }
      }
    }
  });
});

//MongoDB Setup
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var uri = process.env.MONGODB_URI;

var chatDatabase;
var data;

MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db) {
  if (!err) {
    console.log('Connection established to', uri);
    chatDatabase = db.db("chatlog").collection("database");
    data = db.db('personal').collection('ohpohdata');
  } else {
    console.log("Failed to connect", uri);
  }
});

app.get('/getMessages', function(req, res) { //**** http request receiver ****
  if (chatDatabase != undefined) {
    chatDatabase.find().toArray((err, result) => {
      res.send({
        database: result
      });
    });
  }
});

app.get('/data', function(request,response) {
  if (data != undefined) {
    data.find().toArray((error, result) => {
      if(!error){
        res.send({
          database: result
        });
      }else{
        console.log("error getting /data");
      }
    });
  }
});


//Socket.io
var maxMessages = 14;
const io = require('socket.io').listen(server);

io.on("connection", socket => {

  socket.on("addMessage", message => {
    var m = {
      username: message.username,
      date: getDate(),
      message: message.message,
      isURL: message.isURL,
      isImage: message.isImage,
      imageURL: message.imageURL
    };
    chatDatabase.find().count().then(function(length) {
      if (length < maxMessages) {
        chatDatabase.insertOne(m, function(err, res) {
          if (err) throw err;
        });
      } else {
        chatDatabase.find().toArray((err, result) => {
          for (var i = maxMessages; i >= 0; i--) {
            if (i == maxMessages) {
              chatDatabase.updateOne({
                _id: result[i]._id
              }, {
                $set: m
              });
            } else {
              var newM = {
                username: result[i + 1].username,
                date: result[i + 1].date,
                message: result[i + 1].message,
                isURL: result[i + 1].isURL,
                isImage: result[i + 1].isImage,
                imageURL: result[i + 1].imageURL
              }
              chatDatabase.updateOne({
                _id: result[i]._id
              }, {
                $set: newM
              });
            }

          }
        });
      }
    });
    io.emit("message", m);
  });

  socket.on("commands", command => {
    chatDatabase.find().count().then(function(length) {
      if (length < maxMessages) {
        chatDatabase.insertOne(m, function(err, res) {
          if (err) throw err;
        });
      } else {
        console.log(command.message);
        if (command.message === "*/Clear") {
          chatDatabase.find().toArray((err, result) => {
            for (var i = maxMessages; i >= 0; i--) {
              var newM = {
                username: command.username,
                date: getDate(),
                message: "Command Used",
                isURL: false,
                isImage: false,
                imageURL: ""
              }
              chatDatabase.updateOne({
                _id: result[i]._id
              }, {
                $set: newM
              });
              io.emit("message", newM);
            }
          });
        }
      }
    });
  });

});

function getDate() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();

  var minute = date.getMinutes();
  if (minute <= 9) {
    minute = "0" + minute;
  }
  var hour = date.getHours();

  if (hour > 12) {
    hour -= 12;
    return month + "/" + day + "/" + year;
  } else {
    return month + "/" + day + "/" + year;
  }
  return "Null Date";
}

// listen (start app with node server.js) ======================================
server.listen(PORT);

app.use(express.static(__dirname + '/dist/OhPoh'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/OhPoh/index.html'));
});
