const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
require('dotenv').config();

// ṃiddle ware
app.use(bodyParser.json());


const Person = require('D:/Full stack/Backend/Lecture_5/person.js');


app.get('/', function(req, res){
    res.send("Welcome to my hotel");
})

const personRoutes = require('./Routes/PersonRoutes');

app.use('/person', personRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log('listen on Port 3000');
});