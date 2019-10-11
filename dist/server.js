"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require("./config/routes");

var _routes2 = _interopRequireDefault(_routes);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _development = require("./config/env/development");

var _development2 = _interopRequireDefault(_development);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require("./api/middlewares/passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './config/swagger';

var db = 'mongodb://user98:user98@ds229258.mlab.com:29258/appointmentdb';

var app = require((0, _express2.default)());
var PORT = _development2.default.port;
// const PORT = process.env.port || 8080
var apiKey = _development2.default.secret;

_mongoose2.default.connect(db, function (err) {
    if (err) {
        console.log('Error !' + err);
    } else {
        console.log('connected to mongoDB');
    }
});

app.use((0, _cors2.default)());
app.use(_express2.default.json());
app.use(_express2.default.urlencoded());
app.use('/api', _routes2.default);
app.use((0, _morgan2.default)('dev'));
app.use(_passport2.default.initialize());
(0, _passportJwt2.default)();
app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.message = 'Invalid Route';
    error.status = 404;
    next(error);
});

app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument, {
//         explorer: true,
//     })
// );
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to appointment app'
    });
});

app.listen(PORT, function () {
    console.log("server is running at port " + PORT);
});
//# sourceMappingURL=server.js.map