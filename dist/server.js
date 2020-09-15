"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import paymentRoute from "./server/routes/paymentRoutes"
var app = (0, _express["default"])(); //adding the MONGODBURL TO THE PROCESS.ENV

var mongodbUrl = _config["default"].MONGODB; //body parser middleware

app.use(_express["default"].json()); //APPLY MIDDLEWARE

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("tiny"));
app.use("/api/products", _productRoutes["default"]);
app.use("/api/users", _userRoutes["default"]); // app.use("/api/paystack", paymentRoute)

app.use('/api/orders', _orderRoutes["default"]);
app.use('/api/config/paypal', function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
}); //SETTING HEADERS FOR CORS

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
}); //connecting to MONGO

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  return console.log('MongoDB connected..!');
})["catch"](function (error) {
  return console.log("error from server", error.reason);
}); //SERVE STATIC BUILD FOLDER IF IN PRODUCTION


if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(_express["default"]["static"]('client/build'));
  app.get('*', function (req, res) {
    res.sendFile(_path["default"].resolve(__dirName, 'client', 'build', 'index.html'));
  });
}

app.listen(5004, function () {
  console.log("app started at port 5004");
});