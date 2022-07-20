require("dotenv").config();
const db = require("./config/Database/mongodb");
const generalResponse = require("./utlls/response");
const httpCodes = require("./utlls/httpCodestatus");
const { color, log } = require("console-log-colors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const allRoutes = require("./routes/router");
const adminRoutes = require("./routes/admin.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
let morgan = require("morgan");

app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.use(morgan("tiny"));

app.set("views", [path.join(__dirname, "views")]);
//setting ejs as the view engine...
app.set("view engine", "ejs");

/***
 * express for the css and bootstrap files
 * images and etc
 */
app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT, () => {
  log(color.yellow(" ******************************************** "));
  log(color.yellow(" *******                              ******* "));
  log(
    color.yellow(
      ` *******   Server started at ${process.env.PORT}     ******* `
    )
  );
  log(color.yellow(" *******                              ******* "));
  log(color.yellow(" ******************************************** "));
});

//settinig all the routes
app.use("/v1", allRoutes);

//setting the admin route
app.use("/admin", adminRoutes);

const swaggerOption = {
  definition: {
    // openapi: "3.0.1", // YOU NEED THIS
    info: {
      // API informations (required)
      title: "Node js BoilerPlate", // Title (required)
      version: "1.0.0", // Version (required)
      description: "A sample API for Node js Project", // Description (optional),
    },
    securityDefinitions: {
      auth: {
        type: "apiKey",
        name: "Authorization",
      },
    },
    // security: [{ auth: [] }],
    // consumes: ["*"],
    // produces: ["*"],
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     BearerAuth: [],
    //   },
    // ],
    servers: [
      {
        url: "http://localhost:5050",
        description: "Local Server",
      },
    ],
  },
  // schemes: ["https", "http"],
  apis: ["server.js", "./routes/*.routes.js"],
  basePath: "/v1",
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.all("*", async (req, res) => {
  generalResponse.successResponse(res, httpCodes.OK, {
    status: false,
    message: "If you are facing this thats mean you have entered wrong Route",
  });
});

// process.once("SIGUSR2", function () {
//   process.kill(process.pid, "SIGUSR2");
// });

// process.on("SIGINT", function () {
//   // this is only called on ctrl+c, not restart
//   console.log("Killing the Port");
//   process.kill(process.pid, "SIGINT");
// });

module.exports = app;

// const AccessControl = require("accesscontrol");

// const ac = new AccessControl();

// ac.grant("user") // define new or modify existing role. also takes an array.
//   .createOwn("video") // equivalent to .createOwn('video', ['*'])
//   .deleteOwn("video")
//   .readAny("video")
//   .grant("admin") // switch to another role without breaking the chain
//   .extend("user") // inherit role capabilities. also takes an array
//   .updateAny("video", ["title"]) // explicitly defined attributes
//   .deleteAny("video");

// let permission = ac.can("user").createOwn("video");
// console.log(permission.granted); // —> true
// console.log(permission.attributes); // —> ['*'] (all attributes)

// permission = ac.can("admin").updateAny("video");
// console.log(permission.granted); // —> true
// console.log(permission.attributes); // —> ['title']

// app.get("/videos", function (req, res, next) {
//   // const permission = ac.can("admin").readAny("video");
//   if (permission.granted) {
//     console.log("testttttttt");
//   } else {
//     // resource is forbidden for this user/role
//     res.status(403).end();
//   }
// });
