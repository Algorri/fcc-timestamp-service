var http = require('http');
var express  = require('express');
var app = express();

var processDate = function (timestamp) {
  console.log("Date to be formatted: " + timestamp);
  var time = new Date (parseInt(timestamp) * 1000);
  if (time != "Invalid Date") {
    console.log("Unix timestamp.");
    var month = "January";
    switch (time.getMonth()) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "January";
        break;
    }
    time = {
      "unix": time.getTime() / 1000,
      "natural": month + " " + String(time.getDate() + 1) + ", " + time.getFullYear()
    };
    console.log("Unix time: " + JSON.stringify(time));
    return time;
  }
  time = timestamp.split(" ");
  month = time[0];
  switch (month) {
    case "January":
      month = 0;
      break;
    case "February":
      month = 1;
      break;
    case "March":
      month = 2;
      break;
    case "April":
      month = 3;
      break;
    case "May":
      month = 4;
      break;
    case "June":
      month = 5;
      break;
    case "July":
      month = 6;
      break;
    case "August":
      month = 7;
      break;
    case "September":
      month = 8;
      break;
    case "October":
      month = 9;
      break;
    case "November":
      month = 10;
      break;
    case "December":
      month = 11;
      break;
    default:
      month = 12;
  }
  time = new Date(parseInt(time[2]), month, parseInt(time[1].substring(0, time[1].length - 1)));
  if (time == "Invalid Date") {
    console.log("Invalid date.");
    return null;
  }
  console.log("Natural format date.");
  time = time.getTime() / 1000;
  time = {
    "unix": time,
    "natural": timestamp
  };
  console.log("Natural time: " + JSON.stringify(time));
  return time;
};

app.get("/:time", function (request, response, next) {
  console.log("A timestamp service request was made with the time " + request.params.time);
  var time = request.params.time;
  var timestamp = processDate(time);
  if (!timestamp) {
    next();
  }
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.write(JSON.stringify(timestamp));
  response.end();
  });

app.get("/", function (request, response) {
  console.log("A homepage request was served.");
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write("Time Stamp Service\nProvide either a natural language date or a unix timestamp in the url.");
  response.end();
  });

app.all("*", function (request, response) {
  console.log("An error response was sent.");
  response.writeHead(404, {
    "Content-Type": 'text/plain'
  });
  response.end("404");
  });

http.createServer(app).listen(8080);
console.log("Server running at 8080\n");