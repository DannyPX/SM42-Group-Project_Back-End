// Package Dependency Injection
const mongoose = require("mongoose");
const { createCard, getAllCards, updateCard } = require("./buddyContext");
const Schema = mongoose.Schema;

// Local Module Dependency Injection

/* Node.js module: nbContext */
// Mongoose schema
const chatSchema = new Schema({
  chatname: String,
  participants: { type: Array, default: [] },
  chatlog: { type: Array, default: [] },
  lastMessage: {
    _sender: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    time: { type: String },
    message: { type: String },
  },
});

// Mongoose card init
const Chats = mongoose.model("Chat", chatSchema);

function responseChat(chat) {
  return {
    _id: chat._id,
    chatname: chat.chatname,
    participants: chat.participants,
    chatlog: chat.chatlog,
  };
}

function responseListChat(chat) {
  return {
    _id: chat._id,
    chatname: chat.chatname,
    participants: chat.participants,
    lastMessage: chat.lastMessage,
  };
}

function updateChat(chat) {
  return {
    chatname: chat.chatname,
  };
}

exports.createChat = function (data) {
  let chat = new Chats({
    ...data,
  });
  return chat
    .save()
    .then((doc) => {
      return {
        status: 201,
        chat: responseChat(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.updateChatName = function (data) {
  return Chats.findByIdAndUpdate(data._id, updateChat(data))
    .then((doc) => {
      return {
        status: 201,
        chat: responseChat(data),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.deleteChat = function (_id) {
  return Chats.findByIdAndDelete(_id)
    .then(() => {
      return {
        status: 410,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getChat = function (data) {
  return Chats.findById(data._id)
    .then((doc) => {
      return {
        status: 201,
        card: responseChat(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getOwnChats = function (data) {
  return Chats.find({
    participants: { $elemMatch: { _id: data._id } },
  })
    .then((doc) => {
      var chats = [];
      doc.forEach(function (element, index) {
        var log;
        var chat;
        if (
          typeof element.chatlog == "undefined" ||
          element.chatlog.length == 0
        ) {
          chat = {
            message: "",
          };
        } else {
          log = element.chatlog;
          chat = log[log.length - 1];
        }
        let data = {
          _id: element._id,
          chatname: element.chatname,
          participants: element.participants,
          lastMessage: chat,
        };
        chats.push(responseListChat(data));
      });
      return {
        status: 200,
        chats: chats,
      };
    })
    .catch((error) => {
      return {
        status: 400,
        error: error,
      };
    });
};

exports.sendMessage = function (data) {
  var d = new Date(Date.now());
  var date = d.toISOString();
  return Chats.findByIdAndUpdate(data._id, {
    $push: {
      chatlog: { message: data.message, _id: data._userid, date: date },
    },
  })
    .then((doc) => {
      return {
        status: 201,
        card: responseChat(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};
