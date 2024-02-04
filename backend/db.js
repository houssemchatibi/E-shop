/*const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eshop'
})

// Assuming you have a MySQL pool named mysqlPool
mysqlPool.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL');
  
    // Perform some test queries or operations here

    // Close the connection
    return connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = mysqlPool;
*/
module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'eshop',
  dialect: 'mysql',

  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
}

