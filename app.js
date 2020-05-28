// Package Dependency Injection
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Local Modules Dependency Injection
const markdown = require("./modules/markdown");
const userContext = require("./context_modules/userContext");
const nbContext = require("./context_modules/nbContext");

// ENV initialize
require("dotenv").config();

// Markdown API document
markdown.init();

// CORS and App Initialize
const PORT = process.env.PORT || 3000;
app.use(cors());
app.listen(PORT, () =>
  console.log(
    `Example app listening on port ${PORT}! \n http://localhost:${PORT}`
  )
);

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
  res.status(200);
  res.json({
    status: 200,
    api: {
      user: 501,
      nb: 503,
      buddy: 503,
      events: 503,
    },
    db: unknown,
  });
});

/// User
app.post("/api/user", function (req, res) {
  res.status(501);
  res.json(userContext.createUser());
});

app.get("/api/user", function (req, res) {
  if (Object.keys(req.query).length === 0) {
    // Get one user
    res.status(501);
    res.json(userContext.getUser());
  } else {
    // Get all users
    res.status(501);
    res.json(userContext.getAllUser());
  }
});

app.put("/api/user", function (req, res) {
  res.status(501);
  res.json(userContext.updateUser());
});

app.delete("/api/user", function (req, res) {
  res.status(501);
  res.json(userContext.deleteUser());
});

app.post("/api/user/auth", function (req, res) {
  res.status(501);
  res.json(userContext.authUser());
});
