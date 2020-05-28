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
