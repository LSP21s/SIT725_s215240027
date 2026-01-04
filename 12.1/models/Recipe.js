const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  category: String,
  time: Number,
  image: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
