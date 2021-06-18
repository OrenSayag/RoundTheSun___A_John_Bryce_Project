
// connect to db
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "eu-cdbr-west-01.cleardb.com",
  user: "bf9af5816bc5ea",
  password: "15f70cd4",
  database: "`heroku_a6a04c04750d755`",
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