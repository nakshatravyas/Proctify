const express = require("express");
const router = express.Router();

const {
  forgotPasswordStudent,
  loginStudent,
  registerStudent,
  changeStudentPassword,
  studentVerifyOTP,
  getStudentDetails,
  updateStudentDetails
} = require("../controllers/Student");

const studentMiddleware = require('../middleware/authentication_student')

//authentication student
router.route("/login").post(loginStudent);
router.route("/register").post(registerStudent);
router.route("/forgotpassword").patch(forgotPasswordStudent);
router.route("/changepassword").post(changeStudentPassword);
router.route("/verifyotp").post(studentVerifyOTP);

//profile screen
router.route("/getdetails").get(studentMiddleware,getStudentDetails)
router.route("/updatedetails").post(studentMiddleware,updateStudentDetails)

module.exports = router;