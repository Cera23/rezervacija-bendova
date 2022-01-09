var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bodyParser = require("body-parser");

const con = mysql.createConnection({
	host:'localhost', user: 'root', database:'bendovi', multipleStatements: true

});
con.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});


router.use(function(req,res,next) {
    console.log("Router MiddleWARE", req.method, req.url);
    next();
})
var obj = {};
router.get('/', function(req, res, next) {
    con.query("SELECT * FROM bend", function(err, result) {
        if(err){
            throw err;
        } else {
            obj = {pretraga_bendova: result};
            res.render('pretraga_bendova', obj);     
    }
  });
});
var obj1 = {};
router.get('/bend', function(req, res, next){
    let sql = "SELECT * FROM bend WHERE vrsta_muzike LIKE '%"+req.query.Vrsta+"%' AND tip_proslave LIKE '%"+req.query.Tip+"%' AND tip_grupe LIKE '%"+req.query.Grupa+"%' AND Cena<="+req.query.cena+"";
    con.query(sql, function(err, result){
        if(err){
            throw err;
        } else {
            obj1 = {pretraga_bendova: result};
            res.render('pretraga_bendova', obj1);
        }
    });
});
var obj2 = {};
router.get('/profil/:id', function(req, res, next) {
    con.query("SELECT * FROM bend WHERE id="+req.params.id+"", function(err, result) {
        if(err){
            throw err;
        } else {
            obj2 = {pretraga_bendova: result};
            res.render('pretraga_bendova', obj2);     
    }
  });
});
module.exports = router;