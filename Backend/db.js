const Pool = require('pg').Pool;

const pool = new Pool({
  user:'proctopostgre',
  host:'database-1.clhgusjwefwj.ap-south-1.rds.amazonaws.com',
  database:'proctor',
  password:'Krishna02',
  port:5432,
  ssl: { rejectUnauthorized: false }
})


module.exports = pool