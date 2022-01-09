var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
const { isBuffer } = require('util');

//Povezivanje sa bazom podataka
const con = mysql.createConnection({
	host:'localhost', user: 'root', database:'bendovi'
});
con.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

router.get('/', function(req, res, next) {
    res.render('prijava', { title: 'Prijava' });
});

router.post("/", function(req,res,next){
    let newImage = req.files.inpFile;
    let newVideo = req.files.vFile;
    let uploadPath = require('path').resolve('../') +'/public/uploads/images/' + req.files.inpFile.name; //Putanja gde se cuvaju slike
    let uploadPath1 = require('path').resolve('../') +'/public/uploads/video/' + req.files.vFile.name; // putanja gde se cuva video 
    newImage.mv(uploadPath, function(err){
    if(err) return res.status(500).send(err)
        });
    newVideo.mv(uploadPath1, function(err){
    if(err) return res.status(500).send(err)
        });  
    let sql = "INSERT INTO bend (naziv, mesto, telefon, email, cena, opis, vrsta_muzike, tip_proslave, tip_grupe,  slika, video) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    var vrednosti = [req.body.naziv, req.body.mesto, req.body.telefon, req.body.email, req.body.cena, req.body.opis, JSON.stringify(req.body.vrsta_muzike), JSON.stringify(req.body.tip_proslave), req.body.grupa, req.files.inpFile.name, req.files.vFile.name];
    con.query(sql, vrednosti, function(err, result) {
        if (err) {
            res.status(500);
            return res.end(err.message);
        } res.status(200);
        return res.render('UspesnaPrijava', { id: result.insertId });
    }); 
}); 
module.exports = router;
