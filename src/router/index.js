const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');
const authController  = require('../controller/authController')
const controller = require('../controller/listSchool')

const innitRouter = (app) =>{
  
  router.get('/', homeController.getHomePage);

  //login
  router.post('/login', authController.login);

  // sign up
  router.post('/register', authController.register);

  //listSchool
  router.get("/listSchool",controller.listChool)
  //update
  router.put("/updateSchool", controller.update);

  //export 
  router.get("/export", controller.exportExcel)
  
  return app.use("/", router);
}
module.exports = innitRouter
;