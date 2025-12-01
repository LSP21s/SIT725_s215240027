const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public')); // This will interact with the index.html file

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("Please enter valid numbers.");
  }
  res.send(`The sum of ${num1} and ${num2} is: ${num1 + num2}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})
;

app.get('/getUserInfo', (req, res) => {
  res.json({ message: "Form submitted successfully!", status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
