'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var TokenConfigSchema = new Schema({

    tokenno: {
        type: String,
        required: true
    }

});

exports.default = _mongoose2.default.model('TokenConfig', TokenConfigSchema);
//# sourceMappingURL=tokenconfig.model.js.map