const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const pool = require('../db')
require('dotenv').config()

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
  console.log(owner)
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
      pass: "Shahkandarp@123",
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
  if (response.otp != Number(otp)) {
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



module.exports = {
  forgotPasswordStudent,
  loginStudent,
  registerStudent,
  changeStudentPassword,
  studentVerifyOTP,
  getStudentDetails,
  updateStudentDetails
}
