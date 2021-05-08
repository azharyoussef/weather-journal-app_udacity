// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 7777;

// Setup Server
const server = app.listen(port, () => { 
    console.log(`server currently running on localhost: ${port}`) 
});

// Get route to retun the projectData 
app.get ('/all', (req, res) => {
  res.send(projectData)
});

// Post route
app.post('/add', (req, res) =>{
  console.log(req.body)

  targetData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  },
  projectData = Object.assign (targetData);
});
