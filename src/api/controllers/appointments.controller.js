import Appointment from "../model/appointment.model";
import HttpStatus from "http-status-codes";
import Joi from "joi";

export default {
    create(req, res) {
        const schema = Joi.object().keys({
            tokenno: Joi.string().required(),
            date: Joi.string().required(),
            time: Joi.string().required(),
            name: Joi.string().required(),
            phoneno: Joi.number()
                .integer()
                .required(),
            location: Joi.string().optional(),
            note: Joi.string().optional(),
            status: Joi.string().optional()
        });
        const {
            error,
            value
        } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Appointment.create(value)
            .then(appointment => res.json(appointment))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },

    findall(req, res) {
        Appointment.find()
            .then(appointment => res.json(appointment))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
        // .sort({
        //     _id: -1
        // }).limit(1)
    },

    findOne(req, res) {
        const {
            id
        } = req.params;
        Appointment.findById(id)
            .then(appointment => {
                if (!appointment) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        err: "Could not find any appointment"
                    });
                }
                return res.json(appointment);
            })
            .catch(err => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
    },

    delete(req, res) {
        const {
            id
        } = req.params;
        Appointment.findByIdAndRemove(id)
            .then(appointment => {
                if (!appointment) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        err: "Could not delete any appointment"
                    });
                }
                return res.json(appointment);
            })
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
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
    update(req, res) {
        const {
            id
        } = req.params;
        Appointment.findOneAndUpdate({
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
            })

            .then(appointment => res.json(appointment))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    getall(req, res) {
        Appointment.find(function (err, appointment) {
                if (err) {
                    console.log('no data');
                } else {
                    var token = appointment[0].tokenno;
                    var i = parseInt(token);
                    var tokenno = i + 1;
                    // console.log(tokenno)
                    res.json(tokenno);
                }
            })
            .sort({
                _id: -1
            });
    },

    updat(req, res) {
        const {
            id
        } = req.params;
        Appointment.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    status: req.body.status
                }
            }, {
                new: true
            })

            .then(appointment => res.json(appointment))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },


};