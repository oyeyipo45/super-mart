"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middleware/auth");

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get('/:id', _auth.auth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var order;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _orderModel["default"].findById({
              _id: req.params.id
            });

          case 2:
            order = _context.sent;

            try {
              if (order) {
                res.send(order);
              }
            } catch (error) {
              console.log(error);
            }

          case 4:
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
router.post('/', _auth.auth, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var newOrder, newOrderCreated;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newOrder = new _orderModel["default"]({
              orderItems: req.body.orderItems,
              user: req.user._id,
              shipping: req.body.shipping,
              payment: req.body.payment,
              itemsPrice: req.body.itemsPrice,
              taxPrice: req.body.taxPrice,
              totalPrice: req.body.totalPrice,
              shippingPrice: req.body.shippingPrice
            });
            _context2.next = 4;
            return newOrder.save();

          case 4:
            newOrderCreated = _context2.sent;
            res.status(201).send({
              message: "newOrderCreated",
              data: newOrderCreated
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.put('/:id/pay', _auth.auth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var order, updatedOrder;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _orderModel["default"].findById(req.params.id);

          case 2:
            order = _context3.sent;
            _context3.prev = 3;

            if (!order) {
              _context3.next = 12;
              break;
            }

            order.isPaid = true;
            order.isPaid = Date.now();
            order.payment = {
              paymentMethod: 'paypal',
              paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
              }
            };
            _context3.next = 10;
            return order.save();

          case 10:
            updatedOrder = _context3.sent;
            res.send({
              message: "Order Paid",
              order: updatedOrder
            });

          case 12:
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            res.status;

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 14]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;