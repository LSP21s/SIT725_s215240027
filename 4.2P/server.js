var express = require("express")
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/getUserInfo', (req, res) => {
  res.json({ message: "Form submitted successfully!", status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


const cardList = [
  { title: "Coach Alex", image: "images/alex.png", link: "About Coach Alex", description: "Professional boxing expert with 10 years of experience!" },
  { title: "Coach Mia", image: "images/mia.png", link: "About Coach Mia", description: "Specialist counter striking." },
  { title: "Coach David", image: "images/david.png", link: "About Coach David", description: "Former champ and footwork specilist." }
];

app.get('/api/projects',(req,res) => {
res.json({statusCode: 200, data: cardList, message:"Success"})
});

var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
});
