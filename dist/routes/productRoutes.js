"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router(); //GETTING ALL THE PRODUCTS


router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _productModel["default"].find({});

          case 2:
            products = _context.sent;

            try {
              res.send(products);
            } catch (error) {
              next(error);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //GETTING CLICKED PRODUCT

router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _productModel["default"].findById(req.params.id);

          case 2:
            product = _context2.sent;

            try {
              if (product) res.send(product);else res.status(404).send({
                message: "product not found"
              });
            } catch (error) {
              next(function (error) {
                error.message, "here";
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/", _auth.auth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            product = new _productModel["default"]({
              name: req.body.name,
              price: req.body.price,
              image: req.body.image,
              brand: req.body.brand,
              category: req.body.category,
              countInStock: req.body.countInStock,
              description: req.body.description
            });
            _context3.next = 3;
            return product.save();

          case 3:
            newProduct = _context3.sent;

            if (!newProduct) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(201).send({
              message: "New Product Created",
              data: newProduct
            }));

          case 8:
            return _context3.abrupt("return", res.status(500).send({
              message: "Error in Creating Product"
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;