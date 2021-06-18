
// connect to db
const mysql = require("mysql");
const env = require('../env')


const con = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'bc8202b70b5cc9',
  password: '4bb08b17',
  database: "heroku_60bc19962800d65",
});

// host = us-cdbr-east-04.cleardb.com
// user = bc8202b70b5cc9
// password = 4bb08b17

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