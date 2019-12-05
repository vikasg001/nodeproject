const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');


// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, [
    check('useremail', 'Your email is not valid').not().isEmpty().isEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 })
], function (req, res) {
    const errors = validationResult(req);
    console.log(req.body, errors.mapped());
    if (errors.isEmpty()) {
        res.render('pages/login', { username: req.body.useremail, password: req.body.password });
    } else {
        res.render('pages/login', { errors: errors.mapped() });
    }

});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
});


app.listen(port, () => {
    console.log(`server run on port number ${port}`);
});