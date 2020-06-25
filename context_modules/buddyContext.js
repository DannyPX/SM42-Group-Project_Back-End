// Package Dependency Injection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Local Module Dependency Injection

/* Node.js module: nbContext */
// Mongoose schema
const cardSchema = new Schema({
  _sender: String,
  firstname: String,
  lastname: String,
  nationality: String,
  title: String,
  text: String,
  type: String, // Type of card, e.g. Request, Question
  _acceptor: String,
});

// Mongoose card init
const Cards = mongoose.model("Card", cardSchema);

function responseCard(card) {
  return {
    _id: card._id,
    _sender: card._sender,
    _acceptor: card._acceptor,
    firstname: card.firstname,
    lastname: card.lastname,
    nationality: card.nationality,
    title: card.title,
    text: card.text,
    type: card.type,
  };
}

function updateCard(card) {
  return {
    _id: card._id,
    _sender: card._sender,
    firstname: card.firstname,
    lastname: card.lastname,
    nationality: card.nationality,
    title: card.title,
    text: card.text,
    type: card.type,
  };
}

exports.createCard = function (data) {
  let card = new Cards({
    ...data,
  });
  return card
    .save()
    .then((doc) => {
      return {
        status: 201,
        card: responseCard(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getAllCards = function () {
  return Cards.find()
    .then((doc) => {
      var cards = [];
      doc.forEach(function (element, index) {
        cards.push(responseCard(element));
      });
      return {
        status: 200,
        cards: cards,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.updateCard = function (data) {
  return Cards.findByIdAndUpdate(data._id, updateCard(data))
    .then((doc) => {
      return {
        status: 201,
        card: responseCard(data),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.deleteCard = function (_id) {
  return Cards.findByIdAndDelete(_id)
    .then(() => {
      return {
        status: 204,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getCard = function (data) {
  return Cards.findById(data._id)
    .then((doc) => {
      return {
        status: 201,
        card: responseCard(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getOwnCards = function (_id) {
  return Cards.find({ _sender: _id })
    .then((doc) => {
      var cards = [];
      doc.forEach(function (element, index) {
        cards.push(responseCard(element));
      });
      return {
        status: 200,
        cards: cards,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getAllbutOwn = function (_id) {
  return Cards.find()
    .then((doc) => {
      var cards = [];
      doc.forEach(function (element, index) {
        if (element._sender != _id) {
          cards.push(responseCard(element));
        }
      });
      return {
        status: 200,
        cards: cards,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.acceptCard = function (data) {
  return Cards.findByIdAndUpdate(data._id, {
    _acceptor: data._acceptor,
  })
    .then((doc) => {
      return {
        status: 201,
        card: responseCard(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getOwnAcceptedCards = function (_id) {
  return Cards.find({ _acceptor: _id })
    .then((doc) => {
      var cards = [];
      doc.forEach(function (element, index) {
        cards.push(responseCard(element));
      });
      return {
        status: 200,
        cards: cards,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.checkOwnCard = function (data) {
  return Cards.findOne({ _id: data._id })
    .then((doc) => {
      return doc._sender == data._sender;
    })
    .catch(() => {
      return false;
    });
};
