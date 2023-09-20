const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const pool = require('../db');
const e = require("express");
require('dotenv').config()

//utility
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//authentication user
const registerStudent = async (req, res) => {
  let { name, email, password,phoneno } = req.body;
  if (!email || !name || !password || !phoneno) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const ownerx = await pool.query(`Select * from student where email like '${email}';`)
  if (ownerx.rowCount>0) {
    throw new BadRequestError("This Email already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const response = await pool.query(`insert into student(name,email,password,phoneno) values ('${name}','${email}','${password}','${phoneno}') returning sid;`) 
  const token = jwt.sign(
    { sid: response.rows[0].sid },
    process.env.JWT_SECRET_STUDENT,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: response.rows[0].sid }, token });
};

const forgotPasswordStudent = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  const owner = await pool.query(`update student set otp = '${otp}' where email like '${email}';`)
  if (!owner) {
    throw new BadRequestError("Email does not exists");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "proctorsih@gmail.com",
      pass: "opuueiosrtjuwntj",
    },
  });

  const mailOptions = {
    from: '"Proctify " <proctorsih@gmail.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: "OTP for Reseting Your website's Password ", // Subject line
    text: `Your OTP for reseting the password for website is ${otp}, please enter this OTP in your website to reset your password.
  -Thanks,
  Team Proctify  `, // plaintext body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    res.status(StatusCodes.OK).json({ otpsent: true });
  });
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const response = await pool.query(`select * from student where email like '${email}';`)
  if(response.rowCount == 0){
    throw new BadRequestError("Please provide valid credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, response.rows[0].password);
  if(!isPasswordCorrect){
    throw new BadRequestError("Please provide valid credentials");
  }
  const token = jwt.sign(
    { sid: response.rows[0].sid },
    process.env.JWT_SECRET_STUDENT,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: response.rows[0].sid }, token });
};

const studentVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new BadRequestError("Please provide neccesary Credentials");
  }
  const response = await pool.query(`select * from student where email like '${email}';`)
  if (response.rowCount == 0) {
    throw new BadRequestError("Please provide valid Email");
  }
  if (response.rows[0].otp != Number(otp)) {
    throw new BadRequestError("Please provide valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "Success" });
};

const changeStudentPassword = async(req,res)=>{
  let {email,password} = req.body
  if(!password || !email){
    throw new BadRequestError("Please provide required credentials");
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const response = await pool.query(`update student set password = '${password}' where email like '${email}';`)
  res.status(StatusCodes.OK).json({ res: "Success" });
}

const getStudentDetails = async(req,res)=>{
  const {studentId} = req.user
  const response = await pool.query(`select sid,email,name,phoneno from student where sid = ${studentId}`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

const updateStudentDetails = async(req,res)=>{
  const {email,phoneno,name} = req.body
  const {studentId} = req.user
  if(!email || !phoneno || !name){
    throw new BadRequestError("Please provide required credentials");
  }
  const response = await pool.query(`update student set email = '${email}',phoneno='${phoneno}',name='${name}' where sid=${studentId};`);
  res.status(StatusCodes.OK).json({res:"Success"})
}

const getAllQuestionsBasedOnExam = async(req,res) => {
  const {examcode} = req.params
  const checkexamcode = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(checkexamcode.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const response = await pool.query(`select * from questions where examcode = '${examcode}';`)
  for(let i=0;i<response.rows.length;++i){
    response.rows[i]['selectedoption'] = -1
  }
  //if admin has selected random question then random questions will be send
  if(checkexamcode.rows[0].israndom){
    response.rows=shuffle(response.rows)
  }
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

const canGiveExam = async(req,res)=>{
  const {examcode} = req.params
  const {studentId} = req.user
  const checkexamcode = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(checkexamcode.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  let yourDate = new Date()

  // Get the current hour, minute, and second
  const hours = yourDate.getHours().toString().padStart(2, '0');
  const minutes = yourDate.getMinutes().toString().padStart(2, '0');
  const seconds = yourDate.getSeconds().toString().padStart(2, '0');
  
  // Create the time string in hh:mm:ss format
  const currentTime = `${hours}:${minutes}:${seconds}`;
  const response = await pool.query(`select * from exam where startdate = '${yourDate.toISOString().split('T')[0]}' and starttime<='${currentTime}' and endtime>='${currentTime}';`)
  if(response.rowCount == 0){
    throw new BadRequestError("Check the exam schedule and try again");
  }
  const studentappeared = await pool.query(`select * from result where sid = ${studentId};`)
  if(studentappeared.rowCount==1){
    throw new BadRequestError("You have already attempted this test.");
  }
  res.status(StatusCodes.OK).json({res:"Success"})
}

const calculateResult = async(req,res)=>{
  const {studentId} = req.user
  const {data} = req.body
  const examcode = data[0].examcode
  const response = await pool.query(`select * from exam where examcode like '${examcode}';`)
  let negativemarks = response.rows[0].negative_marks
  let questionweightage = response.rows[0].question_weightage
  let marks=0
  for(let i=0;i<data.length;++i){
    if(data[i].answer == data[i].selectedoption){
      marks+=questionweightage
    }
    else if(data[i].selectedoption == -1){
      marks+=0
    }
    else{
      marks-=negativemarks
    }
  }
  const resultupdate = await pool.query(`insert into result values('${examcode}',${studentId},${marks});`)
  res.status(StatusCodes.OK).json({res:"Success"})
}

const getExamResults = async (req,res) =>{
  const {studentId} = req.user
  const response = await pool.query(`select r.totalmarks,e.exam_name,e.examcode,e.startdate from result as r inner join exam as e on r.examcode = e.examcode where r.sid = ${studentId} and e.publish_result=true;`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

const getSpecificExamResult = async(req,res)=>{
  const {studentId} = req.user
  const {examcode} = req.params
  const checkexamcode = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(checkexamcode.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const response = await pool.query(`select max(totalmarks),min(totalmarks),avg(totalmarks),count(totalmarks) from result group by examcode having examcode='${examcode}';`)
  const marks = await pool.query(`select totalmarks from result where sid = ${studentId};`)
  const user_marks = marks.rows[0].totalmarks
  // console.log(user_marks)
  // const percentile_calc = await pool.query(`select totalmarks from result where examcode = '${examcode}' order by totalmarks desc;`)
  // let index=0
  // for(let i=0;i<percentile_calc.rows.size;++i){
  //   if(user_marks<=percentile_calc.rows[i]['totalmarks']){
  //     index = Number(response.rows[0].count) - i - 1;
  //     break;
  //   }
  // }
  // console.log(index / Number(response.rows[0].count))
  // let percentile = (index / Number(response.rows[0].count))*100
  // console.log(percentile_calc.rows)
  // console.log(percentile)
  res.status(StatusCodes.OK).json({res:"Success",data:{max:response.rows[0].max,min:response.rows[0].min,avg:response.rows[0].avg,count:response.rows[0].count,marks:user_marks}})
}

const reportProblem = async(req,res)=>{
  const {studentId} = req.user
  const {description} = req.body
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "proctorsih@gmail.com",
      pass: "opuueiosrtjuwntj",
    },
  });

  const response = await pool.query(`select * from student where sid = ${studentId};`)

  const mailOptions = {
    from: '"Proctify " <proctorsih@gmail.com>', // sender address (who sends)
    to: "shahkandarp24@gmail.com", // list of receivers (who receives)
    subject: `Issue Raised by a student whose name is ${response.rows[0].name} and id is ${studentId}`, // Subject line
    text: `${description}`, // plaintext body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    res.status(StatusCodes.OK).json({ res:"Success" });
  });
}

module.exports = {
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
  reportProblem
}
