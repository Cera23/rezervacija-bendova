var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


router.use(function(req,res,next) {
    console.log("Router MiddleWARE", req.method, req.url);
    next();
})
router.use(express.json());
router.get('/', function(req, res, next) {
    res.render('kontakt', { title: 'Kontakt' });
});
router.post('/', function(req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'probavts5@gmail.com',
            pass: 'proba12345!'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'probavts5@gmail.com',
        subject: req.body.naslov,
        text: req.body.poruka
    }
    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log(error);
            res.send("error");
        }else{
            console.log("Email sent: " + info.response);
            res.send("success");
        }
    })
})
  module.exports = router;