"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user.id
  }, _config["default"].SECRET, {
    algorithm: "HS256",
    expiresIn: "1h"
  });
};

var _default = getToken;
exports["default"] = _default;