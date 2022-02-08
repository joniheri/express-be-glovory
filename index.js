// import express module
const express = require("express");

// import cosr module
const cors = require("cors");

// use express in app variable
const app = express();

// import dotenv
require("dotenv").config();

// make server port
const port = 4001;

// app use exxpress.json to get req body JSON
app.use(express.json());

// make static folder
app.use("/uploads", express.static("uploads"));

// use cors
app.use(cors());

// create the homepage route
app.get("/", (req, res) => {
  res.send("Hello Express!!!");
});
// End create the homepage route

// import route modul
const routerExp = require("./src/routes/routeExp");
// const routerV1 = require("./src/routes/routeV1.js");
// const routerV2 = require("./src/routes/routeV2");

// group route
app.use("/api/exp", routerExp);
// app.use("/api/v1", routerV1);
// app.use("/api/v2", routerV2);

app.listen(port, () => console.log(`Listening on port ${port}!!!`));
