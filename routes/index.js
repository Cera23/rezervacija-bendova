var express = require('express');
var router = express.Router();

//Router MIDLWARE Example
router.use(function(req,res,next) {
    console.log("Router MiddleWARE", req.method, req.url);
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rezervacija bendova' });
});

router.get('/prijava', function(req, res, next) {
  res.render('prijava', { title: 'Prijava' });
});

router.get('/kontakt', function(req, res, next) {
  res.render('kontakt', { title: 'Kontakt' });
});


module.exports = router;