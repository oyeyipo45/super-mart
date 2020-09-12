const { validationResult } = require('express-validator');
// express-validator required above is used to do the validation from the backend 
// const HttpError = require('../models/http-error');
// the httpError is just a constructor function for handling errors
const Payment = require('../models/paymentModel');
// stateSchema is required
const mongoose = require('mongoose');
const request = require('request');
const _ = require('lodash');
const pug = require('pug');

const {initializePayment, verifyPayment} = require('../paymentConfig/paymentConfig') (request);

const getPayment = (req,res, next) => {
  try {
    res.render('index.pug');
  } catch (err) {
      err => err.message
    // const error = new HttpError(
    //   'Signing up failed, please try again later.',
    //   500
    // );
    return next(error);
  }

}

const getPaymentById = (req, res, next) => {
  const id = req.params.id;

  Payment.findById(id).then((payment) =>{
    if (!payment){
        err => err.message
    //   const error = new HttpError(
    //     'Signing up failed, please try again later.',
    //     500
    //   );
    //   res.redirect('/error')
    }
    res.send('succes.pug', {payment});
  }).catch((e) => {
    // res.redirect('/error')
    e => e.message
  })
}

const getPaymentFromPaystack =  (req, res, next) => {
  const ref = req.query.reference;

  verifyPayment(ref, (error,body) => {
    if(error) {
    //   new HttpError(
    //     'Invalid inputs passed, please check your data', 422
    //   )
    //   return res.redirect('/error');
    error => error.message
    }
    response = JSON.parse(body);

    const data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.full_name']);

    [reference, amount, email, full_name] = data;

    newPayment = {reference, amount, email, full_name} = data;

    const payment = new Payment(newPayment)

    payment.save().then((donor) => {
      if(payment) {
        res.redirect('/receipt/'+payment._id);
      }
    }).catch((e)=> {
    //   res.redirect('/error')
    e => e.message
    })
  })
}

const makePayment =  (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return next(
        error
    //   new HttpError(
    //     'Invalid inputs passed, please check your data', 422
    //   )
    );
    // this is the validation to check whether the inputs are correct
  }

  const form = _.pick(req.body,
    ['amount', 'email','full_name']);
    form.metadata = {
      full_name : form.full_name
    }

    form.amount *= 100;
    
    initializePayment(form, (error, body) => {
      if(error) {
        // new HttpError(
        //   'Could not make payement, Try again', 422
        // )
        error.message, "Could not make payement"
        return;
      }
      response = JSON.parse(body);

      res.redirect(response.data.authorization_url)
    })
}

exports.makePayment = makePayment;
exports.getPayment = getPayment;
exports.getPaymentFromPaystack = getPaymentFromPaystack;
exports.getPaymentById = getPaymentById;