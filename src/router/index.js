const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');
const authController  = require('../controller/authController')

const innitRouter = (app) =>{
  
  router.get('/', homeController.getHomePage);

  //login
  router.post('/login', authController.login);

  // sign up
  router.post('/register', authController.register);
  
  return app.use("/", router);
}
module.exports = innitRouter
;