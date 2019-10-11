"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require("../model/user.model");

var _user2 = _interopRequireDefault(_user);

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _development = require("../../config/env/development");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    signup: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var schema, _Joi$validate, error, value;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            schema = _joi2.default.object().keys({
                                name: _joi2.default.string().required(),
                                mobileno: _joi2.default.number().required(),
                                password: _joi2.default.string().required()

                            });
                            _Joi$validate = _joi2.default.validate(req.body, schema), error = _Joi$validate.error, value = _Joi$validate.value;

                            if (!(error && error.details)) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt("return", res.status(_httpStatusCodes2.default.BAD_REQUEST).json(error));

                        case 4:
                            _user2.default.create(value).then(function (user) {
                                return res.json(user);
                            }).catch(function (err) {
                                return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
                            });

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function signup(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return signup;
    }(),


    // async login(req,res) {
    //     const schema = Joi.object().keys({
    //         email: Joi.string().email().required(),
    //         password: Joi.string().required(),

    //     });
    //     const {
    //         error,
    //         value
    //     } = Joi.validate(req.body, schema);
    //     if (error && error.details) {
    //         return res.status(HttpStatus.BAD_REQUEST).json(error);
    //     }
    //      const user = await User.findOne({ email: value.email });
    // 		if (!user) {
    // 			return res
    // 				.status(BAD_REQUEST)
    // 				.json({ err: 'invalid email or password' });
    // 		}
    //     const matched = await bcryptjs.compare(value.password, user.password);
    // 		if (!matched) {
    // 			return res.status(UNAUTHORIZED).json({ err: 'invalid credentials' });
    // 		}
    //         const token = jwt.sign({ id: user._id }, 'aght123', {
    // 			expiresIn: '1d'
    // 		});
    //     User.create(value)
    //     .then(user => res.json({success:true,token}))
    //     .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
    // },

    login: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var userData, schema, _Joi$validate2, error, value, user, matched, token;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            userData = req.body;
                            schema = _joi2.default.object().keys({
                                mobileno: _joi2.default.number().required(),
                                password: _joi2.default.string().required()

                            });
                            _Joi$validate2 = _joi2.default.validate(req.body, schema), error = _Joi$validate2.error, value = _Joi$validate2.value;

                            if (!(error && error.details)) {
                                _context2.next = 6;
                                break;
                            }

                            return _context2.abrupt("return", res.status(_httpStatusCodes2.default.BAD_REQUEST).json(error));

                        case 6:
                            _context2.next = 8;
                            return _user2.default.findOne({ mobileno: userData.mobileno });

                        case 8:
                            user = _context2.sent;

                            if (user) {
                                _context2.next = 11;
                                break;
                            }

                            return _context2.abrupt("return", res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ err: 'invalid mobileno or password' }));

                        case 11:
                            _context2.next = 13;
                            return _bcryptjs2.default.compare(userData.password, user.password);

                        case 13:
                            matched = _context2.sent;

                            if (matched) {
                                _context2.next = 16;
                                break;
                            }

                            return _context2.abrupt("return", res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({ err: 'invalid credentials' }));

                        case 16:
                            token = _jsonwebtoken2.default.sign({ id: user._id }, _development.devConfig.secret, {
                                expiresIn: '1d'
                            });
                            return _context2.abrupt("return", res.json({ user: user, token: token }));

                        case 20:
                            _context2.prev = 20;
                            _context2.t0 = _context2["catch"](0);

                            console.error(_context2.t0);
                            return _context2.abrupt("return", res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(_context2.t0));

                        case 24:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 20]]);
        }));

        function login(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return login;
    }(),
    test: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt("return", res.json(req.user));

                        case 1:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function test(_x5, _x6) {
            return _ref3.apply(this, arguments);
        }

        return test;
    }()
};
//# sourceMappingURL=user.controller.js.map