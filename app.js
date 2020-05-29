// Package Dependency Injection
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require("body-parser");

// ENV initialize
require("dotenv").config();

// Mongoose Init
mongoose
  .connect(
    `mongodb+srv://global_buddy_admin:${process.env.DB_PASS}@global-buddy-quqso.azure.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Local Modules Dependency Injection
const markdown = require("./modules/markdown");
const userContext = require("./context_modules/userContext");
const nbContext = require("./context_modules/nbContext");

// Markdown API document
markdown.init();

// CORS and App Initialize
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

// Send Docs file
app.get("/docs", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/index.html"));
});

app.get("/docs/user", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/user/index.html"));
});

// App listeners
app.get("/", function (req, res) {
  res.redirect("/docs");
});

/// API
app.get("/api", function (req, res) {
  res.status(501);
  res.json({
    status: 200,
    api: {
      user: mongoose.connection.readyState,
      nb: 503,
      buddy: 503,
      events: 503,
    },
    db: "unknown",
  });
});

/// User
app.post("/api/user", async function (req, res) {
  var response = await userContext.createUser(req.body);
  res.status(response.status);
  res.json(response);
});

app.get("/api/user", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    // Get all user
    var response = await userContext.getAllUser();
    res.status(response.status);
    res.json(response);
  } else {
    // Get one users
    var response = await userContext.getUser(req.body);
    res.status(response.status);
    res.json(response);
  }
});

app.put("/api/user", async function (req, res) {
  var response = await userContext.updateUser(req.body);
  res.status(response.status);
  res.json(response);
});

app.delete("/api/user", async function (req, res) {
  var response = await userContext.deleteUser(req.body);
  res.status(response.status);
  res.json(response);
});

app.post("/api/user/auth", function (req, res) {
  res.status(501);
  res.json(userContext.authUser());
});
