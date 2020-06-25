// Package Dependency Injection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Local Module Dependency Injection
const userContext = require("./userContext");

/* Node.js module: nbContext */
// Mongoose schema
const cardSchema = new Schema({
  _sender: String,
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
    bio: card.bio,
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
      let data = {
        _id: doc._id,
        _sender: doc._sender,
        title: doc.title,
        text: doc.text,
        type: doc.type,
      };
      var waitAssign = new Promise((resolve, reject) => {
        userContext.getUser({ _id: doc._sender }).then((result) => {
          Object.assign(data, {
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            nationality: result.user.nationality,
            bio: result.user.bio,
          });
          resolve();
        });
      });
      return waitAssign.then(() => {
        return {
          status: 201,
          card: responseCard(data),
        };
      });
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
      var foreachProm = new Promise((resolve, reject) => {
        var count = 0
        doc.forEach(async function (element, index) {
          await userContext
            .getUser({ _id: element._sender })
            .then((result) => {
              let data = {};
              var waitAssign = new Promise((resolve, reject) => {
                data = {
                  _id: element._id,
                  _sender: element._sender,
                  firstname: result.user.firstname,
                  lastname: result.user.lastname,
                  nationality: result.user.nationality,
                  bio: result.user.bio,
                  title: element.title,
                  text: element.text,
                  type: element.type,
                };
                resolve();
              });
              waitAssign.then(() => {
                cards.push(responseCard(data));
              });
            })
            .catch(() => {
              reject();
            });
            count++
          if (count === doc.length) resolve();
        });
      });
      return foreachProm.then(() => {
        return {
          status: 200,
          cards: cards,
        };
      });
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
      var waitAssign = new Promise((resolve, reject) => {
        userContext.getUser({ _id: doc._sender }).then((result) => {
          Object.assign(data, {
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            nationality: result.user.nationality,
            bio: result.user.bio,
          });
          resolve();
        });
      });
      return waitAssign.then(() => {
        return {
          status: 201,
          card: responseCard(data),
        };
      });
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
      let data = {
        _id: doc._id,
        _sender: doc._sender,
        title: doc.title,
        text: doc.text,
        type: doc.type,
      };
      var waitAssign = new Promise((resolve, reject) => {
        userContext.getUser({ _id: doc._sender }).then((result) => {
          Object.assign(data, {
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            nationality: result.user.nationality,
            bio: result.user.bio,
          });
          resolve();
        });
      });
      return waitAssign.then(() => {
        return {
          status: 201,
          card: responseCard(data),
        };
      });
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
      var foreachProm = new Promise((resolve, reject) => {
        doc.forEach(async function (element, index) {
          var count = 0
          await userContext
            .getUser({ _id: element._sender })
            .then((result) => {
              let data = {};
              var waitAssign = new Promise((resolve, reject) => {
                data = {
                  _id: element._id,
                  _sender: element._sender,
                  firstname: result.user.firstname,
                  lastname: result.user.lastname,
                  nationality: result.user.nationality,
                  bio: result.user.bio,
                  title: element.title,
                  text: element.text,
                  type: element.type,
                };
                resolve();
              });
              waitAssign.then(() => {
                cards.push(responseCard(data));
              });
            })
            .catch(() => {
              reject();
            });
            count++
          if (count === doc.length) resolve();
        });
      });
      return foreachProm.then(() => {
        return {
          status: 200,
          cards: cards,
        };
      });
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
      var foreachProm = new Promise((resolve, reject) => {
        var count = 0
        doc.forEach(async function (element, index) {
          if (element._sender != _id) {
            await userContext
              .getUser({ _id: element._sender })
              .then((result) => {
                let data = {};
                var waitAssign = new Promise((resolve, reject) => {
                  data = {
                    _id: element._id,
                    _sender: element._sender,
                    firstname: result.user.firstname,
                    lastname: result.user.lastname,
                    nationality: result.user.nationality,
                    bio: result.user.bio,
                    title: element.title,
                    text: element.text,
                    type: element.type,
                  };
                  resolve();
                });
                waitAssign.then(() => {
                  cards.push(responseCard(data));
                });
              })
              .catch(() => {
                reject();
              });
          }
          count++
          if (count === doc.length) resolve()
        });
      });
      return foreachProm.then(() => {
        return {
          status: 200,
          cards: cards,
        };
      });
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
      let data = {
        _id: doc._id,
        _sender: doc._sender,
        title: doc.title,
        text: doc.text,
        type: doc.type,
      };
      var waitAssign = new Promise((resolve, reject) => {
        userContext.getUser({ _id: doc._sender }).then((result) => {
          Object.assign(data, {
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            nationality: result.user.nationality,
            bio: result.user.bio,
          });
          resolve();
        });
      });
      return waitAssign.then(() => {
        return {
          status: 201,
          card: responseCard(data),
        };
      });
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
      var foreachProm = new Promise((resolve, reject) => {
        var count = 0
        doc.forEach(async function (element, index) {
          if (element._sender != _id) {
            await userContext
              .getUser({ _id: element._sender })
              .then((result) => {
                let data = {};
                var waitAssign = new Promise((resolve, reject) => {
                  data = {
                    _id: element._id,
                    _sender: element._sender,
                    firstname: result.user.firstname,
                    lastname: result.user.lastname,
                    nationality: result.user.nationality,
                    bio: result.user.bio,
                    title: element.title,
                    text: element.text,
                    type: element.type,
                  };
                  resolve();
                });
                waitAssign.then(() => {
                  cards.push(responseCard(data));
                });
              })
              .catch(() => {
                reject();
              });
          }
          count++
          if (count === doc.length) resolve();
        });
      });
      return foreachProm.then(() => {
        return {
          status: 200,
          cards: cards,
        };
      });
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
