const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const nodemailer = require('nodemailer');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var path = require('path');


//Rute
var routes = require('./routes/index');
var prijava = require('./routes/prijava');
var kontakt = require('./routes/kontakt');
var pretraga = require ('./routes/pretraga');
var profil = require ('./routes/profil');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);
app.use('/prijava', prijava);
app.use('/kontakt',kontakt);
app.use('/pretraga',pretraga);
app.use('/profil',profil);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // production error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  // development error handler
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  module.exports = app;
  app.listen(3000);