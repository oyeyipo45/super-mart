"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('express-validator'),
    validationResult = _require.validationResult; // express-validator required above is used to do the validation from the backend 
// const HttpError = require('../models/http-error');
// the httpError is just a constructor function for handling errors


var Payment = require('../models/paymentModel'); // stateSchema is required


var mongoose = require('mongoose');

var request = require('request');

var _ = require('lodash');

var pug = require('pug');

var _require2 = require('../paymentConfig/paymentConfig')(request),
    initializePayment = _require2.initializePayment,
    verifyPayment = _require2.verifyPayment;

var getPayment = function getPayment(req, res, next) {
  try {
    res.render('index.pug');
  } catch (err) {
    (function (err) {
      return err.message;
    }); // const error = new HttpError(
    //   'Signing up failed, please try again later.',
    //   500
    // );


    return next(error);
  }
};

var getPaymentById = function getPaymentById(req, res, next) {
  var id = req.params.id;
  Payment.findById(id).then(function (payment) {
    if (!payment) {
      (function (err) {
        return err.message;
      }); //   const error = new HttpError(
      //     'Signing up failed, please try again later.',
      //     500
      //   );
      //   res.redirect('/error')

    }

    res.send('succes.pug', {
      payment: payment
    });
  })["catch"](function (e) {
    // res.redirect('/error')
    (function (e) {
      return e.message;
    });
  });
};

var getPaymentFromPaystack = function getPaymentFromPaystack(req, res, next) {
  var ref = req.query.reference;
  verifyPayment(ref, function (error, body) {
    var _data2;

    if (error) {
      //   new HttpError(
      //     'Invalid inputs passed, please check your data', 422
      //   )
      //   return res.redirect('/error');
      (function (error) {
        return error.message;
      });
    }

    response = JSON.parse(body);

    var data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.full_name']);

    var _data = _slicedToArray(data, 4);

    reference = _data[0];
    amount = _data[1];
    email = _data[2];
    full_name = _data[3];
    newPayment = (_data2 = data, reference = _data2.reference, amount = _data2.amount, email = _data2.email, full_name = _data2.full_name, _data2);
    var payment = new Payment(newPayment);
    payment.save().then(function (donor) {
      if (payment) {
        res.redirect('/receipt/' + payment._id);
      }
    })["catch"](function (e) {
      //   res.redirect('/error')
      (function (e) {
        return e.message;
      });
    });
  });
};

var makePayment = function makePayment(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(error //   new HttpError(
    //     'Invalid inputs passed, please check your data', 422
    //   )
    ); // this is the validation to check whether the inputs are correct
  }

  var form = _.pick(req.body, ['amount', 'email', 'full_name']);

  form.metadata = {
    full_name: form.full_name
  };
  form.amount *= 100;
  initializePayment(form, function (error, body) {
    if (error) {
      // new HttpError(
      //   'Could not make payement, Try again', 422
      // )
      error.message, "Could not make payement";
      return;
    }

    response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
};

exports.makePayment = makePayment;
exports.getPayment = getPayment;
exports.getPaymentFromPaystack = getPaymentFromPaystack;
exports.getPaymentById = getPaymentById;