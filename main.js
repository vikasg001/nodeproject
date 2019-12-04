const express = require('express');
const bodyparser = require('body-parser');
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');


app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Main Website', message: 'Welcome to templating using EJS' });
});


app.get('/about', function (req, res) {
    res.render('pages/about');
});


app.get('/service', function (req, res) {

    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('pages/service', {
        drinks: drinks,
        tagline: tagline
    });
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});


app.listen(port, () => {
    console.log(`server run on port number ${port}`);
});