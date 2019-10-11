'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AppointmentSchema = new Schema({
    tokenno: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    note: {
        type: String
    },
    status: {
        type: String
    }

});

exports.default = _mongoose2.default.model('Appointment', AppointmentSchema);
//# sourceMappingURL=appointment.model.js.map