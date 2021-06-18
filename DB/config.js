
// connect to db
const mysql = require("mysql");
const env = require('../env')


const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: "heroku_a6a04c04750d755",
});

con.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("Connected to mysql");
});

// wrapper
const myQuery = (q) => {
    return new Promise((resolve, reject)=>{
        con.query(q,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

// EXPORT
module.exports = { myQuery };