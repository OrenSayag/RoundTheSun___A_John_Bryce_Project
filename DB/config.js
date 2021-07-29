
// connect to db
const mysql = require("mysql");
const env = require('../env')


// let pool = mysql.createPool({
// //   host: 'us-cdbr-east-04.cleardb.com',
// //   user: 'bc8202b70b5cc9',
// //   password: '4bb08b17',
// //   database: "heroku_60bc19962800d65",
//   host: '159.65.92.190',
//   user: 'windos',
//   password: '1234',
//   database: "orensayag_project3_initial",
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: "orensayag_project3_initial",
// });

let con = mysql.createPool({
//   host: 'us-cdbr-east-04.cleardb.com',
//   user: 'bc8202b70b5cc9',
//   password: '4bb08b17',
//   database: "heroku_60bc19962800d65",
//   host: '159.65.92.190',
//   user: 'windows',
//   password: '1234',
//   database: "orensayag_project3_initial",
  host: 'localhost',
  user: 'root',
  password: '',
  database: "orensayag_project3_initial",
});

// host = us-cdbr-east-04.cleardb.com
// user = bc8202b70b5cc9
// password = 4bb08b17

con.getConnection(function (err) {
  if (err) {
    console.error("error connecting: " + err);

    // con = reconnect(con);
    
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

// function reconnect(connection){
//   console.log("\n New connection tentative...");

//   //- Destroy the current connection variable
//   if(connection) connection.destroy();

//   //- Create a new one
//   var connection = mysql_npm.createConnection(db_config);

//   //- Try to reconnect
//   connection.connect(function(err){
    
//       if(err) {
//           //- Try to connect every 2 seconds.
//           setTimeout(reconnect, 2000);
//       }else {
//           console.log("\n\t *** New connection established with the database. ***")
//           return connection;
//       }
//   });
// }


// EXPORT
module.exports = { myQuery };