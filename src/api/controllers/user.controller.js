import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model";
import HttpStatus from "http-status-codes";
import Joi from "joi";
import { devConfig } from "../../config/env/development";



 export default {
    async signup(req,res) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            mobileno: Joi.number().required(),
            password: Joi.string().required(),
            
        });
        const {
            error,
            value
        } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        User.create(value)
        .then(user => res.json(user))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
    },

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

    async login(req, res) {
		try {
            let userData = req.body

            const schema = Joi.object().keys({
                mobileno: Joi.number().required(),
                password: Joi.string().required(),
                        
                    });
                    const {
                        error,
                        value
                    } = Joi.validate(req.body, schema);
			if (error && error.details) {
				return res.status(HttpStatus.BAD_REQUEST).json(error);
			}
			const user = await User.findOne({ mobileno: userData.mobileno });
			if (!user) {
				return res
					.status(HttpStatus.BAD_REQUEST)
					.json({ err: 'invalid mobileno or password' });
			}
			const matched = await bcryptjs.compare(userData.password, user.password);
			if (!matched) {
				return res.status(HttpStatus.UNAUTHORIZED).json({ err: 'invalid credentials' });
			}
			const token = jwt.sign({ id: user._id },devConfig.secret, {
				expiresIn: '1d'
			});
            return res.json({ user, token }); 

		} catch (err) {
			console.error(err);
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
		}
    },
    
    async test(req,res){
        return res.json(req.user)
    }
    
}