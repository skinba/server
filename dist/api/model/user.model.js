'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({

    name: {
        type: String,
        required: true

    },
    mobileno: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true

    }

});

UserSchema.pre('save', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var salt, hash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!(this.isModified('password') || this.isNew)) {
                        _context.next = 8;
                        break;
                    }

                    _context.next = 3;
                    return _bcryptjs2.default.genSalt();

                case 3:
                    salt = _context.sent;
                    _context.next = 6;
                    return _bcryptjs2.default.hash(this.password, salt);

                case 6:
                    hash = _context.sent;

                    this.password = hash;

                case 8:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})));

exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map