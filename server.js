//Budget api

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const namesModel = require("./models/schema");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('public'));

let url = 'mongodb://localhost:27017/mongoBudget';


/*app.use('/', express.static('public'));*/
var budget = require('./server.json');
const { response } = require('express');

app.get('/budget', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log("Connected to db");
    namesModel.find()
    .then((data)=>{
      console.log(data)
      res.json(data)
      res.send(data)
      mongoose.connection.close();
    })
    .catch((connectionError)=>{
      console.log(connectionError)
    })
  })
  .catch((connectionError)=>{
    console.log(connectionError)
  })
});

/*const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 25
    },
    {
        title: 'Rent',
        budget: 375
    },
    {
        title: 'Grocery',
        budget: 110
    },
  ]
};*/

 /*app.get('/hello', (req, res) => {
  res.send('Hello World!');
});*/

app.post('/budget', (req, res) => {
    const newData = new namesModel({
      title: req.body.title,
      budget: req.body.budget,
      color: req.body.color
    });
    namesModel.insertMany(newData)
    .then((data)=>{
      console.log(data)
      res.send(data)
      mongoose.connection.close();
      res.statusCode=202;
    })
    .catch((connectionError)=>{
      console.log(connectionError)
    })
    
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});