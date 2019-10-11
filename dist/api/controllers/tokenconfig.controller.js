"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tokenconfig = require("../model/tokenconfig.model");

var _tokenconfig2 = _interopRequireDefault(_tokenconfig);

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    create: function create(req, res) {
        _tokenconfig2.default.create({
            tokenno: 100
        }).then(function (tokenConfig) {
            return res.json(tokenConfig);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    findall: function findall(req, res) {
        _tokenconfig2.default.find().then(function (tokenconfig) {
            return res.json(tokenconfig);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    },
    update: function update(req, res) {
        _tokenconfig2.default.findOneAndUpdate({
            _id: req.body.id
        }, {
            $set: {
                tokenno: req.body.tokenno
            }
        }, {
            new: true
        }).then(function (tokenconfig) {
            return res.json(tokenconfig);
        }).catch(function (err) {
            return res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json(err);
        });
    }
};
//# sourceMappingURL=tokenconfig.controller.js.map