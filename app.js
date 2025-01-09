var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Import the new database connection module
const { connectDatabase } = require('./db.js');
// Import routes
var indexRouter = require('./routes/index');
var shivRouter = require('./routes/shiv');
var messagesRouter = require('./routes/messages');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');


// Initialize the Express app
var app = express();

// Setup view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/', shivRouter);
app.use('/', messagesRouter);
app.use('/', adminRouter);
app.use('/category', categoryRouter);

// Handle 404 errors and render error page
app.use(function (req, res, next) {
  res.render('error', { title: '404 Not Found' });
});

// Connect to the database
connectDatabase().catch(console.error);

// Export the app for use in other files
module.exports = app;
