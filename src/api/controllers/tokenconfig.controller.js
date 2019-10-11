import TokenConfig from "../model/tokenconfig.model";
import HttpStatus from "http-status-codes";

export default {

    create(req, res) {
        TokenConfig.create({
                tokenno: 100
            })
            .then(tokenConfig => res.json(tokenConfig))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    findall(req, res) {
        TokenConfig.find()
            .then(tokenconfig => res.json(tokenconfig))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },

    update(req, res) {
        TokenConfig.findOneAndUpdate({
                _id: req.body.id
            }, {
                $set: {
                    tokenno: req.body.tokenno,
                }
            }, {
                new: true
            })

            .then(tokenconfig => res.json(tokenconfig))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
}