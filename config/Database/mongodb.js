const mongoose = require("mongoose");
const { color, log } = require('console-log-colors');


mongoose.connect(process.env.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open",  () =>{
  log(color.cyan(' ******************************************** '));
  log(color.cyan(' *******                              ******* '));
  log(color.cyan(' ******* Mongo Connected successfully ******* '));
  log(color.cyan(' *******                              ******* '));
  log(color.cyan(' ******************************************** '));
});
