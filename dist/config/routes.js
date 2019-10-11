"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _appointments = require("../api/controllers/appointments.controller");

var _appointments2 = _interopRequireDefault(_appointments);

var _tokenconfig = require("../api/controllers/tokenconfig.controller");

var _tokenconfig2 = _interopRequireDefault(_tokenconfig);

var _user = require("../api/controllers/user.controller");

var _user2 = _interopRequireDefault(_user);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

// router.get('/appointments', appointmentsController.findAll);
router.post('/appointments', _passport2.default.authenticate('jwt', { session: false }), _appointments2.default.create);
router.get('/appointments', _passport2.default.authenticate('jwt', { session: false }), _appointments2.default.findall);
router.get('/appointments/:id', _appointments2.default.findOne);
router.delete('/appointments/:id', _appointments2.default.delete);
router.put('/appointments/:id', _appointments2.default.update);
router.put('/appoint/:id', _appointments2.default.updat);
router.post('/token', _tokenconfig2.default.create);
router.get('/token', _tokenconfig2.default.findall);
router.put('/token/:id', _tokenconfig2.default.update);
//router.get('/token', tokenconfigController.create)
router.post('/signup', _user2.default.signup);
router.post('/login', _user2.default.login);
router.post('/test', _passport2.default.authenticate('jwt', { session: false }), _user2.default.test);
//# sourceMappingURL=routes.js.map