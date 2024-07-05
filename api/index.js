const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("../routes/github");
const hnRoute = require("../routes/hackernews");
const redditRoute = require("../routes/reddit");
const stackoverflowRoute = require('../routes/stackoverflow');
const devtoRoute = require('../routes/devto');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use("/", indexRouter);
app.use("/hn", hnRoute);
app.use("/reddit", redditRoute);
app.use('/stackoverflow', stackoverflowRoute);
app.use('/devto', devtoRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
