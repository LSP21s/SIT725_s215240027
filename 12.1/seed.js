const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // adjust path if needed

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/recipe_app");

  await Recipe.deleteMany({});

  await Recipe.insertMany([
    {
      title: "Creamy Garlic Pasta",
      category: "Dinner",
      time: 30,
      image: "images/yumpasta.png",
      description: "A quick and easy creamy garlic pasta.",
      author: "navodaya"
    },
    {
      title: "Avocado Toast",
      category: "Breakfast",
      time: 10,
      image: "images/avocadoyum.jpg",
      description: "Crispy toast with avocado mash.",
      author: "navodaya"
    },
    {
      title: "Berry Smoothie",
      category: "Drinks",
      time: 5,
      image: "images/smoothie.png",
      description: "Healthy breakfast berry blend",
      author: "someoneElse"
    }
  ]);

  console.log("Recipes seeded successfully.");
  process.exit();
}

run().catch(err => console.error(err));
