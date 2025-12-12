const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static('public'));


const bookRoutes = require('./routes/book');


app.use('/api/book', bookRoutes);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
