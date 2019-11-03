var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser'),
path = require('path'),
ejs = require('ejs'),
axios = require('axios');

//Domain where API is hosted:
var domain = 'https://allsvenskan-api.herokuapp.com/';
if (app.get('env') === 'development') {
    domain = 'http://localhost:3000';
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var routes = require('./api/routes/standingsRoute');
routes(app);

app.use(express.static(path.join(__dirname, 'public')));

// Serve index page
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + './public/index.html'));
});

var asData = {};
var esData ={}

axios.get(domain + '/as')
    .then(function(res){asData = res.data;})

axios.get(domain + '/es')
    .then(function(res){esData = res.data;})


app.get('/allsvenskan', function(req,res){
    res.render('tabell', {data: asData})
})

app.get('/bandy-elitserien', function(req,res){
    res.render('tabell', {data: esData})
})

app.listen(port);

console.log('api RESTful API server started on: ' + port);
