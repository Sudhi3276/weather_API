const express = require("express");
const https = require("https");
// Importing body-parser middleware to parse incoming request bodies
const bodyParser = require("body-parser");

const app = express();

// Using body-parser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



// Handling GET requests to the root route
app.get("/", function (req, res) {
  // Sending the HTML file located in the current directory
  res.sendFile(__dirname + "/index1.html");
  // The `res.send` method is used to send a response to the client.
  // In this case, it's sending the HTML file.
  // Note: res.send is typically used once in the server, whereas res.write can be used multiple times.
});

// Handling POST requests to the root route
app.post("/", function (req, res) {
  // Logging the city name received from the form submissiom
  console.log(req.body.cityname);

  // Hardcoding the city for simplicity
  const place = req.body.cityname;
  const apiKey = "0084e3253d2de3e8b4a43255e81c32a6";
  const unitKey = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    place +
    "&appid=" +
    apiKey +
    "&units=" +
    unitKey;

  // Making a GET request to the OpenWeatherMap API
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      // Parsing the JSON response from the API
      const weatherData = JSON.parse(data);
      // Extracting temperature and weather description from the response
      const temp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].description;
      // Sending a response back to the client with the weather information
      res.send(
        "<h1>The temperature in " +
          place +
          " is " +
          temp +
          " degrees Celsius. Weather: " +
          weatherDes +
          "</h1>" 
      );
    });
  });
});

// Starting the server on port 3000
app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});
