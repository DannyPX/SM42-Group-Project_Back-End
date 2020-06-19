// Package Dependency Injection
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
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
const chatContext = require("./context_modules/chatContext");

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

app.get("/docs/chat", function (req, res) {
  res.sendFile(path.join(__dirname + "/docs/chat/index.html"));
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
      buddy: 200,
      chat: 501,
      events: 404,
    },
    db: mongoose.connection.readyState,
  });
});

/* #region  USER_API */
app.post("/api/user", async function (req, res) {
  if (
    typeof req.body.username == "undefined" ||
    typeof req.body.password == "undefined" ||
    typeof req.body.firstname == "undefined" ||
    typeof req.body.lastname == "undefined"
  ) {
    res.status(400);
    res.json({
      error: "Not all required fields are filled in",
    });
  } else {
    if ((await userContext.userExist(req.body)) > 0) {
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
    const { token } = req
    let data = { _id = token.data._id}
    var response = await userContext.deleteUser(data);
    res.status(response.status);
    res.json(response);
  }
);

app.post("/api/user/auth", async function (req, res) {
  if (
    typeof req.body.username == "undefined" ||
    typeof req.body.password == "undefined"
  ) {
    res.status(400);
    res.json({
      error: "Not all required fields are filled in",
    });
  } else {
    var response = await userContext.authUser(req.body);
    res.status(response.status);
    res.json(response);
  }
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
    if (
      typeof req.body.title == "undefined" ||
      typeof req.body.text == "undefined" ||
      typeof req.body.text == "undefined" ||
      typeof req.body.type == "undefined"
    ) {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else if (req.body.type == "Request" || req.body.type == "Question") {
      const { token } = req;
      let data = {
        _sender: token.data._id,
        firstname: token.data.firstname,
        lastname: token.data.lastname,
        nationality: token.data.nationality,
        bio: req.body.bio,
        title: req.body.title,
        text: req.body.text,
        type: req.body.type,
      };
      var response = await buddyContext.createCard(data);
      res.status(response.status);
      res.json(response);
    } else {
      res.status(400);
      res.json({
        error: "Type is not correct",
      });
    }
  }
);

app.get("/api/buddy/card", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    // Get all cards
    var response = await buddyContext.getAllCards();
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
    let data = {
      _id: req.body._id,
      _sender: token.data._id,
    };
    if (await buddyContext.checkOwnCard(data)) {
      if (
        typeof req.body._id == "undefined" ||
        typeof req.body.bio == "undefined" ||
        typeof req.body.title == "undefined" ||
        typeof req.body.text == "undefined" ||
        typeof req.body.type == "undefined"
      ) {
        res.status(400);
        res.json({
          error: "Not all required fields are filled in",
        });
      } else if (req.body.type == "Request" || req.body.type == "Question") {
        let data = {
          _id: req.body._id,
          _sender: token.data._id,
          firstname: token.data.firstname,
          lastname: token.data.lastname,
          nationality: token.data.nationality,
          bio: req.body.bio,
          title: req.body.title,
          text: req.body.text,
          type: req.body.type,
        };
        var response = await buddyContext.updateCard(data);
        res.status(response.status);
        res.json(response);
      } else {
        res.status(400);
        res.json({
          error: "Type is not correct",
        });
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
  "/api/buddy/card",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    let data = {
      _id: req.body._id,
      _sender: token.data._id,
    };
    if (await buddyContext.checkOwnCard(data)) {
      if (typeof req.body._id == "undefined") {
        res.status(400);
        res.json({
          error: "Not all required fields are filled in",
        });
      } else {
        var response = await buddyContext.deleteCard(req.body._id);
        res.status(response.status);
        res.json(response);
      }
    }
  }
);

app.get(
  "/api/buddy/card/own",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    var response = await buddyContext.getOwnCards(token.data._id);
    res.status(response.status);
    res.json(response);
  }
);

app.get(
  "/api/buddy/card/other",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    var response = await buddyContext.getAllbutOwn(token.data._id);
    res.status(response.status);
    res.json(response);
  }
);

app.put(
  "/api/buddy/card/accept",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    if (typeof req.body._id == "undefined") {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else {
      const { token } = req;
      let data = {
        _id: req.body._id,
        _acceptor: token.data._id,
      };
      var response = await buddyContext.acceptCard(data);
      res.status(response.status);
      res.json(response);
    }
  }
);

app.get(
  "/api/buddy/card/accepted",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    var response = await buddyContext.getOwnAcceptedCards(token.data._id);
    res.status(response.status);
    res.json(response);
  }
);
/* #endregion */

/* #region  CHAT_API */
app.post(
  "/api/chat",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    if (typeof req.body.participants == "undefined") {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else {
      const { token } = req;
      var participants = [];
      var chattemp = "";
      var chatname = "";
      var result = JSON.parse(req.body.participants);
      result.push({
        _id: token.data._id,
      });
      new Promise((resolve, reject) => {
        result.forEach(async function (element, index, array) {
          var user = await userContext.getUser({
            _id: element._id,
          });
          participants.push({
            _id: user.user._id,
            firstname: user.user.firstname,
            lastname: user.user.lastname,
          });
          if (
            req.body.chatname == "" ||
            typeof req.body.chatname == "undefined"
          ) {
            chattemp += ", " + user.user.firstname;
          }
          if (index === array.length - 1) resolve();
        });
      }).then(async () => {
        if (
          req.body.chatname == "" ||
          typeof req.body.chatname == "undefined"
        ) {
          chatname = chattemp.substr(2);
        }
        var response = await chatContext.createChat({
          participants: participants,
          chatname: chatname,
        });
        res.status(response.status);
        res.json(response);
      });
    }
  }
);

app.get(
  "/api/chat",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    if (typeof req.body._id == "undefined") {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else {
      var response = await chatContext.getChat(req.body);
      res.status(response.status);
      res.json(response);
    }
  }
);

app.put(
  "/api/chat",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    if (
      typeof req.body._id == "undefined" ||
      typeof req.body.chatname == "undefined"
    ) {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else {
      var response = await chatContext.updateChatName(req.body);
      res.status(response.status);
      res.json(response);
    }
  }
);

app.delete(
  "/api/chat",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    if (typeof req.body._id == "undefined") {
      res.status(400);
      res.json({
        error: "Not all required fields are filled in",
      });
    } else {
      var response = await chatContext.deleteChat(req.body._id);
      res.status(response.status);
      res.json(response);
    }
  }
);

app.get(
  "/api/chat/own",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    let data = {
      _id: token.data._id,
    };
    var response = await chatContext.getOwnChats(data);
    res.status(response.status);
    res.json(response);
  }
);

app.post(
  "/api/chat/message",
  tokenManager.ensureValidToken((req, res) => {
    res.status(401);
    res.json({
      error: "Invalid Token",
    });
  }),
  async function (req, res) {
    const { token } = req;
    let data = {
      _id: req.body._id,
      _userid: token.data._id,
      message: req.body.message,
    };
    var response;
    await chatContext.sendMessage(data).then(async () => {
      response = await chatContext.getChat(data);
    });
    res.status(response.status);
    res.json(response);
  }
);
/* #endregion */
