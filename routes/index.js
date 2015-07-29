var express = require('express');
var router = express.Router();

var sess;


/* GET home page. */
var sess;

router.get('/', function (req, res) {
    sess = req.session;
//Session set when user Request our app via URL
    if (sess.email) {
        /*
         * This line check Session existence.
         * If it existed will do some action.
         */
        res.redirect('/admin');
    }
    else {
        res.render('index.html');
    }
});

router.post('/login', function (req, res) {
    sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
    sess.email = req.body.email;
    res.end('done');
});

router.get('/admin', function (req, res) {
    sess = req.session;
    res.writeHead(200,{"Content-Type" : "text/html"});

    if (sess.email) {
        res.write('<h1> Hello '+sess.email+' </h1>');
        res.end('<a href="+">Logout</a>');
    }
    else {
        res.write('<h1> Please login first. </h1>');
        res.end('<a href="+">Login</a>');
    }

});

router.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});


// basic session example
    router.get('/session-test', function (req, res) {

        sess = req.session;     // initialise the session based on 'req'
        sess.email;
        sess.username;

        console.log("session: " + sess);

        res.render('session', {
            title: 'Simon\'s sessions'
        });
    });


// taken and amended from an online tutorial
    router.get('/awesome', function (req, res) {
        res.writeHead(200,{"Content-Type" : "text/html"});

        if (req.session.lastPage) {
            res.write('<p>Last page was: ' + req.session.lastPage + '. </p>');
        }
        req.session.lastPage = '/awesome';
        res.end("You're Awesome.");
    });

    router.get('/radical', function (req, res) {
        res.writeHead(200,{"Content-Type" : "text/html"});

        if (req.session.lastPage) {
            res.write('Last page was: ' + req.session.lastPage + '. ');
        }
        req.session.lastPage = '/radical';
        res.end("What a radical visit!");
    });

    router.get('/tubular', function (req, res) {
        res.writeHead(200,{"Content-Type" : "text/html"});

        if (req.session.lastPage) {
            res.write('Last page was: ' + req.session.lastPage + '. ');
        }
        req.session.lastPage = '/tubular';
        res.end("Are you a surfer?");
    });

    module.exports = router;
