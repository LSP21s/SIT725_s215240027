const bookService = require('../services/bookService');

const getAllBook = (req, res) => {
  try {
    const books = bookService.getAllBook(); 
    res.json(books);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllBook };