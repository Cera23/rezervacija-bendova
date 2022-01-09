var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const nodemailer = require('nodemailer');

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
router.get('/:id', function(req, res, next) {
    con.query('SELECT * FROM bend WHERE id='+req.params.id+'', function(err, result) {
        if(err){
            throw err;
        } else {
            obj = {profil_bend: result};
            res.render('profil_bend', obj);
    }
  });
});
router.post("/:id", function(req,res,next){
    let sql = "INSERT INTO rezervacije (ime, lokacija, telefon, email, datum_rezervacije, ID_bend) VALUES (?,?,?,?,?,?); SELECT email FROM bend WHERE id="+req.params.id+"";
    var vrednosti = [req.body.ime, req.body.lokacija, req.body.tel, req.body.email, req.body.datum, req.params.id];
    con.query(sql, vrednosti, function(err, result) {
        if (err) {
            res.status(500);
            return res.end(err.message);
        }const jstring=JSON.stringify(result[1]).replace(/]|[[]/g, '');
         console.log(jstring);
         var jemail = JSON.parse(jstring);
         console.log(jemail.email);
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'probavts5@gmail.com',
                pass: 'proba12345!'
            }
        })
        const mailOptions = {
            from: 'probavts5@gmail.com',
            to: jemail.email,
            subject: 'Rezervacija za ' +req.body.datum,
            text: 'Poštovani, obaveštavamo Vas da ste dobili rezervaciju za ' +req.body.datum+ ' na lokaciji ' +req.body.lokacija+ 
            '. U prilog Vam šaljemo ime i kontakt telefon korisnika ' +req.body.ime+ '-' +req.body.tel  
        }
        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error);
                res.send("error");
            }else{
                console.log("Email sent: " + info.response);
            }
        })
        return res.render('UspesnaRezervacija');
    }); 
}); 
module.exports = router;