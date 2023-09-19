const express = require('express')
const app = express();
const { BadRequestError, UnauthenticatedError } = require("./errors/index");

//dependencies
require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");

// routers
const adminRouter = require('./routes/Admin')
const studentRouter = require('./routes/Student')

//middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

//routes admin
app.use("/api/v1/admin", adminRouter);
//routes student
app.use("/api/v1/student", studentRouter);


// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3002;

app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
