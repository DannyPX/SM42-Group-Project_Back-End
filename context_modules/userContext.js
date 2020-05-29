/*
  TODO: POST
    POST: 
      - Authenticate user 
*/

// Package Dependency Injection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Local Module Dependency Injection

/* Node.js module: userContext */
// Mongoose schema
const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  pc: String,
});

// Mongoose user init
const Users = mongoose.model("User", userSchema);

const defaultResponse = [
  {
    status: null,
  },
];

function responseUser(user) {
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    pc: user.pc,
  };
}

function updateUser(user) {
  return {
    username: user.username,
    name: user.name,
    password: user.password,
    pc: user.pc,
  };
}

exports.createUser = function (data) {
  let user = new Users({
    ...data,
  });
  return user
    .save()
    .then((doc) => {
      return {
        status: 201,
        user: responseUser(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.getAllUser = function () {
  return Users.find()
    .then((doc) => {
      var users = [];
      doc.forEach(function (element, index) {
        users.push(responseUser(element));
      });
      return {
        status: 200,
        users: users,
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.updateUser = function (data) {
  return Users.findByIdAndUpdate(data._id, updateUser(data))
    .then((doc) => {
      return {
        status: 201,
        user: responseUser(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.deleteUser = function (data) {
  return Users.findByIdAndDelete(data._id)
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

exports.getUser = function (data) {
  return Users.findById(data._id)
    .then((doc) => {
      return {
        status: 201,
        user: responseUser(doc),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
      };
    });
};

exports.authUser = function () {
  return defaultResponse;
};
