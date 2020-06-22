// Package Dependency Injection
const tokenManager = require("token-manager-express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

// Local Module Dependency Injection

/* Node.js module: userContext */
// Mongoose schema
const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  nationality: String,
  pc: String,
});

// Mongoose user init
const Users = mongoose.model("User", userSchema);

function responseUser(user) {
  return {
    _id: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    nationality: user.nationality,
    pc: user.pc,
  };
}

function updateUser(user) {
  return {
    _id: user._id,
    username: user.username,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    nationality: user.nationality,
    pc: user.pc,
  };
}

function generateToken(data) {
  return tokenManager.generate({
    expireAfterSeconds: 24 * 60 * 60,
    size: 64,
    data: {
      _id: data._id,
      firstname: data.firstname,
      lastname: data.lastname,
      nationality: data.nationality,
    },
  });
}

exports.createUser = function (data) {
  let user = new Users({
    ...data,
  });
  var hash = crypto.createHash("sha256");
  var pass = hash.update(user.password, "utf8", "hex");
  user.password = pass.digest("hex");
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
  var hash = crypto.createHash("sha256");
  var pass = hash.update(user.password, "utf8", "hex");
  user.password = pass.digest("hex");
  return Users.findByIdAndUpdate(data._id, updateUser(data))
    .then(() => {
      var result = generateToken(data);
      return {
        status: 201,
        user: responseUser(data),
        token: result.secret,
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

exports.authUser = function (data) {
  var query = Users.where({ username: data.username });
  return query
    .findOne()
    .then((doc) => {
      var hash = crypto.createHash("sha256");
      var pass = hash.update(data.password, "utf8", "hex");
      data.password = pass.digest("hex");
      if (doc.password === data.password) {
        var result = generateToken(doc);
        return {
          status: 200,
          token: result.secret,
        };
      } else {
        return {
          status: 401,
        };
      }
    })
    .catch(() => {
      return {
        status: 401,
      };
    });
};

exports.userExist = function (data) {
  return Users.countDocuments({ username: data.username }).then((count) => {
    return count > 0 ? true : false;
  });
};
