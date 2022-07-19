require("dotenv").config();
const { color, log } = require("console-log-colors");
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.mongoUrl)
  .then((client) => {
    // Reference of database
    const connect = client.db(process.env.databaseName);
    // Dropping the database
    connect
      .dropDatabase()
      .then((droppedDatabase) => {
        if (droppedDatabase) {
          log(color.red(" ******************************************** "));
          log(color.red(" *******                              ******* "));
          log(color.red(" *******     Database is Cleared      ******* "));
          log(color.red(" *******                              ******* "));
          log(color.red(" ******************************************** "));
          process.exit();
        }
      })
      .catch((err) => {
        console.log("Error Dropping Database");
        console.trace(err);
        process.exit();
      });
  })
  .catch((err) => {
    console.log("Error Dropping Database");
    console.trace(err);
    process.exit();
  });
