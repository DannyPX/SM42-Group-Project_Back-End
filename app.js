// Package Dependency Injection
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require("body-parser");
const tokenManager = require("token-manager-express");

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
const buddyContext = require("./context_modules/buddyContext");

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
app.use(tokenManager.init());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

/* #region  DOCS */
// Send Docs file
app.get("/docs", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/index.html"));
});

app.get("/docs/user", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/user/index.html"));
});

app.get("/docs/buddy", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/buddy/index.html"));
});
/* #endregion */

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
      user: 200,
      nb: 404,
      buddy: 501,
      events: 404,
    },
    db: mongoose.connection.readyState,
  });
});

/* #region  USER_API */
app.post("/api/user", async function (req, res) {
  if (userContext.userExist(req.body)) {
    res.status(409);
    res.json({
      status: 409,
      err: "Username already exists",
    });
  } else {
    var response = await userContext.createUser(req.body);
    res.status(response.status);
    res.json(response);
  }
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

app.put(
  "/api/user",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    console.log(typeof req.body.lastname);
    if (
      typeof req.body.username == "undefined" ||
      typeof req.body.password == "undefined" ||
      typeof req.body.firstname == "undefined" ||
      typeof req.body.lastname == "undefined" ||
      typeof req.body.nationality == "undefined" ||
      typeof req.body.pc == "undefined"
    ) {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else {
      var response = await userContext.updateUser(req.body);
      res.status(response.status);
      res.json(response);
    }
  }
);

app.delete(
  "/api/user",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    var response = await userContext.deleteUser(req.body);
    res.status(response.status);
    res.json(response);
  }
);

app.post("/api/user/auth", async function (req, res) {
  var response = await userContext.authUser(req.body);
  res.status(response.status);
  res.json(response);
});
/* #endregion */

/* #region  BUDDY_API */
app.post(
  "/api/buddy/card",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    var response = await buddyContext.createCard(req.body);
    res.status(response.status);
    res.json(response);
  }
);

app.get("/api/buddy/card", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    // Get all cards
    var response = await buddyContext.getAllCards;
    res.status(response.status);
    res.json(response);
  } else {
    // Get one card
    var response = await buddyContext.getCard(req.body);
    res.status(response.status);
    res.json(response);
  }
});

app.put(
  "/api/buddy/card",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    if (token.data._id == req.body._sender) {
      if (
        typeof req.body._sender == "undefined" ||
        typeof req.body.firstname == "undefined" ||
        typeof req.body.lastname == "undefined" ||
        typeof req.body.nationality == "undefined" ||
        typeof req.body.bio == "undefined" ||
        typeof req.body.title == "undefined" ||
        typeof req.body.text == "undefined" ||
        typeof req.body.type == "undefined"
      ) {
        res.status(400);
        res.json({
          error: "Not all required fields are filled in",
        });
      } else {
        var response = await buddyContext.updateCard(req.body);
        res.status(response.status);
        res.json(response);
      }
    } else {
      res.status(400);
      res.json({
        error: "This is not your card",
      });
    }
  }
);

app.delete(
  "/api/buddy",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    if (token.data._id == req.body._sender) {
      var response = await buddyContext.deleteCard(req.body);
      res.status(response.status);
      res.json(response);
    } else {
      res.status(400);
      res.json({
        error: "This is not your card",
      });
    }
  }
);
/* #endregion */
