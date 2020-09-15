"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _util = _interopRequireDefault(require("../util"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _userModel["default"].find().then(function (users) {
              return res.json(users);
            })["catch"](function (error) {
              return res.json("error from res", error);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/user", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _userModel["default"].find().then(function (users) {
              return res.json(users);
            })["catch"](function (error) {
              return res.json("error from res", error);
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // @route POST api/users
// @desc SIGININ USER
// @access PUBLIC

router.post("/signin", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, email, password;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password; //SIMPLE VALIDATION

            if (!(!email || !password)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Please Fill All Fields"
            }));

          case 3:
            //CHECK FOR EXISTING USER
            _userModel["default"].findOne({
              email: email
            }).then(function (user) {
              if (!user) {
                return res.status(400).json({
                  message: "user Does not exists"
                });
              } //VALIDATE PASSWORD


              _bcryptjs["default"].compare(password, user.password).then(function (isMatch) {
                if (!isMatch) return res.status(400).json({
                  message: "Invalid Credentials"
                });
                res.json({
                  token: (0, _util["default"])(user),
                  user: {
                    _id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                  }
                });
              });
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // @route POST api/users/auth
// @desc GET USER DATA
// @access PRIVATE

router.get("/signin/auth", _auth.auth, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              _userModel["default"].findById(req.user._id).select("-password").then(function (user) {
                return res.json(user);
              });
            } catch (error) {
              (function (error) {
                return error.message;
              });
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // @route POST api/users
// @desc REGISTER NEW USER
// @access PUBLIC

router.post("/signup", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, firstName, lastName, email, password;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password; //SIMPLE VALIDATION

            if (!(!firstName || !lastName || !email || !password)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              message: "Please Fill All Fields"
            }));

          case 3:
            //CHECK FOR EXISTING USER
            _userModel["default"].findOne({
              email: email
            }).then(function (user) {
              if (user) {
                return res.status(400).json({
                  message: "user already exists"
                });
              } else {
                var newUser = new _userModel["default"]({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password
                }); //CREATE SALE $ HASH

                _bcryptjs["default"].genSalt(10, function (err, salt) {
                  _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(function (user) {
                      res.json({
                        token: (0, _util["default"])(user),
                        user: {
                          _id: user.id,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email
                        }
                      });
                    });
                  });
                });
              }
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.get("/createadmin", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var user, newUser;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            user = new _userModel["default"]({
              firstName: "damilola",
              lastName: "oyeyipo",
              email: "damilola45@gmail.com",
              password: "1234",
              isAdmin: true
            });
            _context6.next = 4;
            return user.save();

          case 4:
            newUser = _context6.sent;
            console.log(newUser);
            res.send(newUser);
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", next(_context6.t0.message));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function (_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;