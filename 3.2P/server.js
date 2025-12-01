var express = require("express")
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;

app.get('/getUserInfo', (req, res) => {
  res.json({ message: "Form submitted successfully!", status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
