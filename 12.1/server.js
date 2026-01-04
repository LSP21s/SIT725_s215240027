// IMPORT LIBRARIES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// IMPORT MODEL
const Recipe = require("./models/Recipe");

// CREATE APP
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.static("public")); // so HTML, CSS, JS load correctly


// CONNECT TO MONGO
mongoose.connect("mongodb://127.0.0.1:27017/recipe_app")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// LATEST RECIPES
app.get("/api/recipes/latest", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(12);
  res.json(recipes);
});


// CATEGORY FILTER
app.get("/api/recipes/categories", async (req, res) => {
  const category = req.query.category;
  const recipes = await Recipe.find({ category });
  res.json(recipes);
});


// ROOT PAGE (OPTIONAL)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
