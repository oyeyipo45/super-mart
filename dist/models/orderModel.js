"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var shippingSchema = {
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
};
var paymentSchema = {
  paymentMethod: {
    type: String,
    required: true
  }
};
var orderItemSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
});
var orderSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shipping: shippingSchema,
  payment: paymentSchema,
  orderItems: [orderItemSchema],
  itemsPrice: {
    type: Number
  },
  taxPrice: {
    type: Number
  },
  shippingPrice: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  isPaid: {
    Boolean: Boolean,
    "default": false
  },
  PaidAt: {
    type: Date
  },
  isDelivered: {
    Boolean: Boolean,
    "default": false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model("Order", orderSchema);