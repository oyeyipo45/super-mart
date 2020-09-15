"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  var token = req.headers.authorization;
  console.log(token, "autth file"); //CHECK FOR TOKEN

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied"
    });
  }

  try {
    var onlyToken = token.slice(7, token.length); //VERIFY TOKEN

    var decoded = _jsonwebtoken["default"].verify(onlyToken, _config["default"].SECRET); //ADD USER FROM PAYLOAD


    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      message: "TOKEN IS NOT VALID"
    });
  }
};

exports.auth = auth;

var isAdmin = function isAdmin(req, res, next) {
  var token = req.header.authorization;
  var isAdmin = req.body.isAdmin; //CHECK FOR TOKEN

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied"
    });
  }

  try {
    //CHECK FOR TOKEN AND ADMIN STATUS
    if (token && isAdmin) {
      return next();
    }
  } catch (error) {
    res.status(401).json({
      message: "ADMIN TOKEN IS NOT VALID"
    });
  }
};

exports.isAdmin = isAdmin;