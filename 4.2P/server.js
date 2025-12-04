const mongoose = require('mongoose');
var express = require("express")
var app = express()

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/myprojectDB');


mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB!');
});

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/getUserInfo', (req, res) => {
  res.json({ message: "Form submitted successfully!", status: "OK" });
});





//Define mongodb schema and model

const ProjectSchema = new mongoose.Schema({
title: String,
image: String,
link: String,
description: String,
available: String,
rating: String,
price: String
});
const Project = mongoose.model('Project', ProjectSchema);


// GET REST API route
app.get('/api/projects', async (req, res) => {
const projects = await Project.find({});
res.json({ statusCode: 200, data: projects, message: "Success" });
});


var port = process.env.PORT || 3000;

// Routes
app.get('/api/projects', (req, res) => {
  res.json({ statusCode: 200, data: cardList, message:"Success" });
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log("App listening to: " + port);
  console.log(`Server is running at http://localhost:${port}`);
});

