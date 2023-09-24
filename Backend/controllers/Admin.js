// const Owner = require("../models/Owner");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const pool = require('../db')
require('dotenv').config()
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const e = require("express");

//authentication owner
const registerAdmin = async (req, res) => {
  let { name, email, password,phoneno } = req.body;
  if (!email || !name || !password || !phoneno) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const ownerx = await pool.query(`Select * from admin where email like '${email}';`)
  if (ownerx.rowCount>0) {
    throw new BadRequestError("This Email already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const response = await pool.query(`insert into admin(name,email,password,phoneno) values ('${name}','${email}','${password}','${phoneno}') returning adminid;`) 
  const token = jwt.sign(
    { adminid: response.rows[0].adminid },
    process.env.JWT_SECRET_ADMIN,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: response.rows[0].adminid }, token });
};

const forgotPasswordAdmin = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  const check = await pool.query(`select * from admin where email like '${email}';`)
  if (check.rowCount == 0) {
    throw new BadRequestError("Email does not exists");
  }
  const owner = await pool.query(`update admin set otp = '${otp}' where email like '${email}';`)

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
    subject: "OTP for Reseting Your Admin website's Password ", // Subject line
    text: `Your OTP for reseting the password for Admin website is ${otp}, please enter this OTP in your Admin website to reset your password.
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

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const response = await pool.query(`select * from admin where email like '${email}';`)
  if(response.rowCount == 0){
    throw new BadRequestError("Please provide valid credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, response.rows[0].password);
  if(!isPasswordCorrect){
    throw new BadRequestError("Please provide valid credentials");
  }
  const token = jwt.sign(
    { adminid: response.rows[0].adminid },
    process.env.JWT_SECRET_ADMIN,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: response.rows[0].adminid }, token });
};

const adminVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new BadRequestError("Please provide neccesary Credentials");
  }
  const response = await pool.query(`select * from admin where email like '${email}';`)
  if (response.rowCount == 0) {
    throw new BadRequestError("Please provide valid Email");
  }
  if (response.rows[0].otp != Number(otp)) {
    throw new BadRequestError("Please provide valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "Success" });
};

const changeAdminPassword = async(req,res)=>{
  let {email,password} = req.body
  if(!password || !email){
    throw new BadRequestError("Please provide required credentials");
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const response = await pool.query(`update admin set password = '${password}' where email like '${email}';`)
  res.status(StatusCodes.OK).json({ res: "Success" });
}

const getAdminDetails = async(req,res)=>{
  const {adminId} = req.user
  const response = await pool.query(`select adminid,email,name,phoneno from admin where adminid = ${adminId}`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

const updateAdminDetails = async(req,res)=>{
  const {email,phoneno,name} = req.body
  const {adminId} = req.user
  if(!email || !phoneno || !name){
    throw new BadRequestError("Please provide required credentials");
  }
  const response = await pool.query(`update admin set email = '${email}',phoneno='${phoneno}',name='${name}' where adminid=${adminId};`);
  res.status(StatusCodes.OK).json({res:"Success"})
}

const createNewExam = async(req,res)=>{
  const {adminId} = req.user
  const {startdate,starttime,endtime,duration,exam_name,mode,negative_marks,question_weightage,isRandom}=req.body
  if(!startdate || !starttime || !endtime || !duration || !exam_name || !mode || !negative_marks || !question_weightage){
    throw new BadRequestError("Please provide required details");
  }
  const examcode = Math.random().toString(36).substr(9,32)
  const response = await pool.query(`insert into exam values(${adminId},'${examcode}','${startdate}','${starttime}','${endtime}',${duration},'${exam_name}','${mode}',${negative_marks},${question_weightage},false,${isRandom});`)
  res.status(StatusCodes.OK).json({res:"Success",examcode})
}

const createQuestions = async(req,res)=>{
  const {examcode,description,number_of_options,options,answer} = req.body
  if(!examcode || !description || !number_of_options || !options ){
    throw new BadRequestError("Please provide required details");
  }
  //checking whether examcode provided by the user is valid
  const examcodecheck = await pool.query(`Select * from exam where examcode = '${examcode}';`)
  if(examcodecheck.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  //checking whether number_of_options count is same as the number of options actually entered by the user
  if(number_of_options != options.length){
    throw new BadRequestError("Options size missmatch");
  }
  let options_str = 'array['
  for(let i=0;i<number_of_options;++i){
    options_str+=`'${options[i]}'`
    if(i!=number_of_options-1){
      options_str+=','
    }
  }
  options_str+=']'
  const response = await pool.query(`insert into questions(examcode,image,description,number_of_options,options,answer) values('${examcode}','${req.body?.image}','${description}',${number_of_options},${options_str},${answer}) returning questionid;`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows[0].questionid})
}

const setThreshold = async(req,res)=>{
  const {examcode,system_warnings,mobile_detected,cv_based_warnings,noise_warnings} = req.body
  if(!system_warnings || !mobile_detected || !cv_based_warnings || !noise_warnings){
    throw new BadRequestError("Please provide required details");
  }
  const examcodecheck = await pool.query(`select * from exam where examcode like '${examcode}';`)
  if(examcodecheck.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const response = pool.query(`insert into threshold values('${examcode}',${system_warnings},${mobile_detected},${cv_based_warnings},${noise_warnings});`)
  res.status(StatusCodes.OK).json({res:"Success"})
}

const getThreshold = async(req,res) => {
  const {examcode} = req.params
  if(!examcode){
    throw new BadRequestError("Please provide required details");
  }
  const response = await pool.query(`select * from threshold where examcode like '${examcode}';`)
  if(response.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows[0]})
}

const createFromExistingExam = async(req,res)=>{
  const {examcode,startdate,starttime,endtime} = req.body
  const {adminId} = req.user
  if(!examcode || !startdate || !starttime || !endtime){
    throw new BadRequestError("Please provide required details");
  }
  //generating new exam from the refernce of old exam whose examcode is passed ny the user
  const response = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(response.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const newexamcode = Math.random().toString(36).substr(9,32)
  const inserted_response = await pool.query(`insert into exam values(${adminId},'${newexamcode}','${startdate}','${starttime}','${endtime}',${response.rows[0].duration},'${response.rows[0].exam_name}','${response.rows[0].mode}',${response.rows[0].negative_marks},${response.rows[0].question_weightage},${response.rows[0].publish_result},${response.rows[0].israndom});`)
  //copying questions of the refernce exam into new exam
  const examquestions = await pool.query(`select * from questions where examcode = '${examcode}';`);
  for(let i=0;i<examquestions.rows.length;++i){
    let options_str = 'array['
    for(let j=0;j<examquestions.rows[i].options.length;++j){
      options_str+=`'${examquestions.rows[i].options[j]}'`
      if(j!=examquestions.rows[i].options.length-1){
        options_str+=','
      }
    }
    options_str+=']'
    const newentry = await pool.query(`insert into questions(examcode,image,description,number_of_options,options,answer) values('${newexamcode}','${examquestions.rows[i]?.image}','${examquestions.rows[i].description}',${examquestions.rows[i].number_of_options},${options_str},${examquestions.rows[i].answer});`)
    options_str=''
  }
  //copying threshold value of the refernce exam into new exam
  const oldthreshold = await pool.query(`select * from threshold where examcode like '${examcode}';`)
  const newthreshold = await pool.query(`insert into threshold values('${newexamcode}',${oldthreshold.rows[0].system_warnings},${oldthreshold.rows[0].mobile_detected},${oldthreshold.rows[0].cv_based_warnings},${oldthreshold.rows[0].noise_warnings});`)
  res.status(StatusCodes.OK).json({res:"Success",examcode:newexamcode})
}

const getExamsCreatedByAdmin = async(req,res)=>{
  const { adminId } = req.user
  const { examcode } = req.query
  const response = await pool.query(`select * from exam where adminid = ${adminId} and examcode like '%${examcode}%';`)
  const examcodesearch = []
  for (let i = 0; i < response.rowCount; ++i) {
    examcodesearch.push(response.rows[i].examcode)
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: examcodesearch })
}

const getQuestions = async(req,res)=>{
  const {examcode} = req.params
  const checkexamcode = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(checkexamcode.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const response = await pool.query(`select * from questions where examcode like '${examcode}';`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

const updateQuestion = async(req,res)=>{
  const {questionid,image,description,number_of_options,options,answer} = req.body
  if(!description || !number_of_options || !options || !answer){
    throw new BadRequestError("Please provide required details");
  }
  const checkquestionid = await pool.query(`select * from questions where questionid = ${questionid};`)
  if(checkquestionid.rowCount == 0){
    throw new BadRequestError("Please provide valid Question ID");
  }
  const response = await pool.query(`update questions set description = '${description}',number_of_options=${number_of_options},options=array[${[...options]}],answer=${answer},image='${image?image:NULL}' where questionid = ${questionid};`)
  res.status(StatusCodes.OK).json({res:"Success"})
}

const deleteQuestion = async(req,res)=>{
  const {questionid} = req.params
  const checkquestionid = await pool.query(`select * from questions where questionid = ${questionid};`)
  if(checkquestionid.rowCount == 0){
    throw new BadRequestError("Please provide valid Question ID");
  }
  const response = await pool.query(`delete from questions where questionid = ${questionid};`)
  res.status(StatusCodes.OK).json({res:"Success"})
}

const getExam = async(req,res)=>{
  const {examcode} = req.params
  const response = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(response.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows[0]})
}

const setStudentThreshold = async(req,res)=>{
  const {sid,examcode,system_warnings,mobile_detected,cv_based_warnings,noise_warnings} = req.body
  if(!sid || !examcode || !system_warnings || !mobile_detected || !cv_based_warnings || !noise_warnings){
    throw new BadRequestError("Please provide required details");
  }
  const response = await pool.query(`insert into student_threshold values(${sid},'${examcode}',${system_warnings},${mobile_detected},${cv_based_warnings},${noise_warnings});`)
  res.status(StatusCodes.OK).json({res:"Success"})
}

const getThresholdValueOfAllStudentsExamWise = async(req,res)=>{
  const {examcode} = req.params
  const checkexamcode = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(checkexamcode.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const response = await pool.query(`select s.name,t.system_warnings,t.mobile_detected,t.cv_based_warnings,t.noise_warnings from student as s inner join student_threshold as t on s.sid = t.sid where examcode = '${examcode}';`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

const publishResult = async(req,res)=>{
  const {examcode} = req.params
  const checkexamcode = await pool.query(`select * from exam where examcode = '${examcode}';`)
  if(checkexamcode.rowCount == 0){
    throw new BadRequestError("Please provide valid examcode");
  }
  const response = await pool.query(`update exam set publish_result = true where examcode = '${examcode}';`)
  res.status(StatusCodes.OK).json({res:"Success"})
}

const getExamsByAdmin = async(req,res)=>{
  const {adminId} = req.user
  const response = await pool.query(`select * from exam where adminid = ${adminId};`)
  res.status(StatusCodes.OK).json({res:"Success",data:response.rows})
}

module.exports = {
  forgotPasswordAdmin,
  loginAdmin,
  registerAdmin,
  changeAdminPassword,
  adminVerifyOTP,
  getAdminDetails,
  updateAdminDetails,
  createNewExam,
  createQuestions,
  createFromExistingExam,
  setThreshold,
  getThreshold,
  getExamsCreatedByAdmin,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  getExam,
  setStudentThreshold,
  getThresholdValueOfAllStudentsExamWise,
  publishResult,
  getExamsByAdmin
}
