// Package Dependency Injection
const mongoose = require("mongoose");
const { userExist } = require("./userContext");
const Schema = mongoose.Schema;

// Local Module Dependency Injection

/* Node.js module: nbContext */
// Mongoose schema
const cardSchema = new Schema({
  _sender: Number,
  firstname: String,
  lastname: String,
  nationality: String,
  bio: String,
  title: String,
  text: String,
  type: String, // Type of card, e.g. Task, Question
});

// Mongoose card init
const Cards = mongoose.model("Card", cardSchema);

const defaultResponse = [
  {
    status: null,
  },
];

function responseCard(card) {
  return {
    _id: card._id,
    _sender: card._sender,
    firstname: card.firstname,
    lastname: card.lastname,
    nationality: card.nationality,
    bio: card.bio,
    title: card.title,
    text: card.text,
    type: card.type,
  };
}

function updateCard(card) {
  return {
    _id: card_id,
    _sender: card._sender,
    firstname: card.firstname,
    lastname: card.lastname,
    nationality: card.nationality,
    bio: card.bio,
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
        user: responseCard(data),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.deleteCard = function (data) {
  return Cards.findByIdAndDelete(data._id)
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

exports.getCard = function (data) {
  return Cards.findById(data._id)
    .then((doc) => {
      return {
        status: 201,
        user: responseCard(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};
