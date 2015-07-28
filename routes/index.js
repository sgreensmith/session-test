var express = require('express');
var router = express.Router();

var sess;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// basic session example
router.get('/session-test', function(req, res){

  sess=req.session;     // initialise the session based on 'req'

  console.log("session: " + sess);

  res.render('session', {
  });
});


module.exports = router;
