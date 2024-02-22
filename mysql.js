// const mysql = require('mysql');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// function getUsers(callback) {
//   const query = 'SELECT * FROM users';
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error('Error executing MySQL query:', err);
//       callback(err, null);
//       return;
//     }
//     callback(null, results);
//   });
// }

// module.exports = {
//   getUsers
// };

