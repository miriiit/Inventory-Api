var express = require('express');
var path = require('path');
var createError = require('http-errors');
var cors = require('cors');


const indexRoutes = require("./routes/index");
const inventoryRoutes = require("./routes/inventory");
var compression = require('compression');
var helmet = require('helmet');
const config = require("./config");
const app = express();

/* var logger = require('morgan');
app.use(logger('dev'));
 */

// support parsing of application/json type post data
// app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));


app.options('*', cors()) //preflight for all routes

const auth = require('./middlewares/auth.js');   //uncomment to enable basic authentication
app.use(auth);

app.use('/', indexRoutes);
app.use('/inventory', inventoryRoutes)


/* app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
}); */

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
  //res.setHeader('Content-Type', 'text/html');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","*");
  //res.header("Access-Allow-Control-Credentials", "false");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).send({status:err.status || 500, message: err.message || 'internal error', type:'internal'}); 
});

module.exports = app;
