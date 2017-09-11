const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('', (err, database) => {
    if(err) return console.log(err);
    
    db = database;
    
    app.listen(3000, () => {
        console.log('listening on 3000');
    })
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    db.collection('quotes').find().toArray((err, result) => {
        if(err) return console.log(err);
        
        res.render('index.ejs', {quotes: result});
    })
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
    db.collection('quotes').save(req.body, (err, result) =>{
        if(err) return console.log(err);
        console.log('saved to db');
        res.redirect('/');
    })
})
