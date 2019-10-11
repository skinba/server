"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appointment = require("../model/appointment.model");

var _appointment2 = _interopRequireDefault(_appointment);

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    create: function create(req, res) {
        var schema = _joi2.default.object().keys({
            tokenno: _joi2.default.string().required(),
            date: _joi2.default.string().required(),
            time: _joi2.default.string().required(),
            name: _joi2.default.string().required(),
            phoneno: _joi2.default.number().integer().required(),
            location: _joi2.default.string().optional(),
            note: _joi2.default.string().optional(),
            status: _joi2.default.string().optional()
        });

        var _Joi$validate = _joi2.default.validate(req.body, schema),
            error = _Joi$validate.error,
            value = _Joi$validate.value;

        if (error && error.details) {
            return res.status(_httpStatusCodes2.default.BAD_REQUEST).json(error);
        }
        _appointment2.default.create(value).then(function (appointment) {
            return res.json(appointment);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    findall: function findall(req, res) {
        _appointment2.default.find().then(function (appointment) {
            return res.json(appointment);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
        // .sort({
        //     _id: -1
        // }).limit(1)
    },
    findOne: function findOne(req, res) {
        var id = req.params.id;

        _appointment2.default.findById(id).then(function (appointment) {
            if (!appointment) {
                return res.status(_httpStatusCodes2.default.NOT_FOUND).json({
                    err: "Could not find any appointment"
                });
            }
            return res.json(appointment);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    delete: function _delete(req, res) {
        var id = req.params.id;

        _appointment2.default.findByIdAndRemove(id).then(function (appointment) {
            if (!appointment) {
                return res.status(_httpStatusCodes2.default.NOT_FOUND).json({
                    err: "Could not delete any appointment"
                });
            }
            return res.json(appointment);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },

    // update(req, res) {
    //     const id = req.params;
    //     const schema = Joi.object().keys({
    //         tokenno: Joi.string().optional(),
    //         time: Joi.string().optional(),
    //         name: Joi.string().optional(),
    //         phoneno: Joi.number()
    //             .integer()
    //             .optional(),
    //         location: Joi.string().optional(),
    //         note: Joi.string().optional()
    //     });
    //     const {
    //         error,
    //         value
    //     } = Joi.validate(req.body, schema);
    //     if (error) {
    //         return res.status(HttpStatus.BAD_REQUEST).json(error.details);
    //     }
    //     Appointment.findOneAndUpdate({
    //             _id: id
    //         }, value, {
    //             new: true
    //         })
    //         .then(appointment => res.json(appointment))
    //         .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    // },
    update: function update(req, res) {
        var id = req.params.id;

        _appointment2.default.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                tokenno: req.body.tokenno,
                date: req.body.date,
                time: req.body.time,
                name: req.body.name,
                phoneno: req.body.phoneno,
                location: req.body.location,
                note: req.body.note
            }
        }, {
            new: true
        }).then(function (appointment) {
            return res.json(appointment);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    getall: function getall(req, res) {
        _appointment2.default.find(function (err, appointment) {
            if (err) {
                console.log('no data');
            } else {
                var token = appointment[0].tokenno;
                var i = parseInt(token);
                var tokenno = i + 1;
                // console.log(tokenno)
                res.json(tokenno);
            }
        }).sort({
            _id: -1
        });
    },
    updat: function updat(req, res) {
        var id = req.params.id;

        _appointment2.default.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                status: req.body.status
            }
        }, {
            new: true
        }).then(function (appointment) {
            return res.json(appointment);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    }
};
//# sourceMappingURL=appointments.controller.js.map