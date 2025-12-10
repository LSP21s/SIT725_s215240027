const mongoose = require("mongoose");

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/recipe_app");

  const recipeSchema = new mongoose.Schema({
    title: String,
    category: String,
    time: Number,
    image: String
  });

  const Recipe = mongoose.model("Recipe", recipeSchema);

  // wipe existing
  await Recipe.deleteMany({});

  await Recipe.insertMany([
    {
      title: "Creamy Garlic Pasta",
      category: "Dinner",
      time: 30,
      image: "images/pasta.jpg"
    },
    {
      title: "Avocado Toast",
      category: "Breakfast",
      time: 10,
      image: "images/avocadoyum.jpg"
    }
  ]);

  console.log("Seed inserted successfully.");
  process.exit();
}

run();
