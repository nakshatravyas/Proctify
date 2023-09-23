const express = require("express");
const router = express.Router();

const {
  forgotPasswordStudent,
  loginStudent,
  registerStudent,
  changeStudentPassword,
  studentVerifyOTP,
  getStudentDetails,
  updateStudentDetails,
  getAllQuestionsBasedOnExam,
  canGiveExam,
  calculateResult,
  getExamResults,
  getSpecificExamResult,
  reportProblem,
  getExamDetails
} = require("../controllers/Student");

const studentMiddleware = require('../middleware/authentication_student')

//authentication student
router.route("/login").post(loginStudent);
router.route("/register").post(registerStudent);
router.route("/forgotpassword").patch(forgotPasswordStudent);
router.route("/changepassword").post(changeStudentPassword);
router.route("/verifyotp").post(studentVerifyOTP);

//profile screen
router.route("/getdetails").get(studentMiddleware, getStudentDetails)
router.route("/updatedetails").post(studentMiddleware, updateStudentDetails)

//get all the questions of exam
router.route("/getquestions/:examcode").get(studentMiddleware, getAllQuestionsBasedOnExam)

//this will check whether particular student can appear for exam or not
router.route("/cangiveexam/:examcode").get(studentMiddleware, canGiveExam)

//this will take input array of object and calculate result
router.route("/calculateresult").post(studentMiddleware, calculateResult)

//this will give the result of all the exams appeared by the student that are published
router.route("/getresult").get(studentMiddleware, getExamResults)

//this will give result of specific exam based on examcode with all the stats i.e. max,min,avg and ercentile rank of user
router.route("/getexamresult/:examcode").get(studentMiddleware, getSpecificExamResult)

//Report Problem
router.route("/reportproblem").get(studentMiddleware, reportProblem)

//get exam detail based on examcode
router.route("/getexamdetails/:examcode").get(studentMiddleware, getExamDetails)

module.exports = router;