import express from "express"
import appointmentsController from "../api/controllers/appointments.controller";
import tokenconfigController from "../api/controllers/tokenconfig.controller";
import userController from "../api/controllers/user.controller";
import passport from "passport";

export const router = express.Router();

// router.get('/appointments', appointmentsController.findAll);
router.post('/appointments',passport.authenticate('jwt',{session:false}), appointmentsController.create);
router.get('/appointments',passport.authenticate('jwt',{session:false}), appointmentsController.findall);
router.get('/appointments/:id', appointmentsController.findOne);
router.delete('/appointments/:id', appointmentsController.delete);
router.put('/appointments/:id', appointmentsController.update);
router.put('/appoint/:id', appointmentsController.updat);
router.post('/token', tokenconfigController.create);
router.get('/token', tokenconfigController.findall);
router.put('/token/:id', tokenconfigController.update);
//router.get('/token', tokenconfigController.create)
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/test',passport.authenticate('jwt',{session:false}), userController.test);


