const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controller/home');
const { login, register } = require('../controller/authController');
const { listSchool, update, exportExcel, viewSchool,postSchool,addTeacher,deleteTeacher } = require('../controller/listSchool');
const { listStudent,viewStudent } = require('../controller/listStudent');
const { listTeacher,viewTeacher } = require('../controller/listTeacher');

const innitRouter = (app) =>{
  
  router.get('/', getHomePage);

  //login
  router.post('/login', login);

  // sign up
  router.post('/register', register);

  //listSchool
  router.post("/listSchool",listSchool)
  //post 
  router.post("/postSchool",postSchool)
  //update
  router.put("/updateSchool", update);
  //export 
  router.get("/export", exportExcel)
  //view 
  router.get("/view", viewSchool)
  //addTeacher for listSchool
  

//------//
// studentmanagement
router.get('/listStudent', listStudent)
//view
router.get('/viewStudent',viewStudent)

//-----//
//teacher
router.get('/listTeacher',listTeacher)
//view 
router.get("/viewInfoTeacher",viewTeacher)

//addteacher
router.post("/addTeacher",addTeacher)
//delete
router.delete("/deletTeacher",deleteTeacher)





  
  
  return app.use("/", router);
}
module.exports = innitRouter
;