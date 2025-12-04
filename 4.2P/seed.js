const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB')
  .then(() => console.log('Connected DB:', mongoose.connection.name))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Sample data to be added to mongo bd
const cardList = [
  { 
    title: "Coach Alex", 
    image: "images/alex.png", 
    link: "About Coach Alex", 
    description: "Professional boxing expert with 10 years of experience!", 
    available: "Monday Wednesday Friday Saturday",
    rating: "4.8/5⭐",
    price: "$55 per hour"
  },
  { 
    title: "Coach Mia", 
    image: "images/mia.png", 
    link: "About Coach Mia", 
    description: "Specialist counter striking.",
    available: "Monday",
    rating: "5/5⭐",
    price: "$75 per hour" 
  },
  { 
    title: "Coach David", 
    image: "images/david.png", 
    link: "About Coach David", 
    description: "Former champ and footwork specilist.",
    available: "Saturday Sunday",
    rating: "4.78/5⭐",
    price: "$99 per hour"
  }
];

// Insert data to mongodb
Project.insertMany(cardList)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
