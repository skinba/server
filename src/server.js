import express from "express";
import mongoose from "mongoose";
import {
    router
} from "./config/routes";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './config/swagger';

import logger from 'morgan';
import cors from 'cors';
import { devConfig } from "./config/env/development";
import passport from "passport";
import { configureJWTStrategy } from "./api/middlewares/passport-jwt";


mongoose.Promise = global.Promise;
const db = 'mongodb://user98:user98@ds229258.mlab.com:29258/appointmentdb';


const app = express();
// const PORT = devConfig.port;
const PORT = process.env.port || 5000
const apiKey = devConfig.secret;

mongoose.connect(db, err => {
    if (err) {
      console.log('Error !' + err);
    } else {
      console.log('connected to mongoDB');
    }
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router);
app.use(logger('dev'));
app.use(passport.initialize());
configureJWTStrategy();
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.message = 'Invalid Route';
    error.status = 404;
    next(error);

});

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument, {
//         explorer: true,
//     })
// );
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});


app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to appointment app'
    })
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);

})