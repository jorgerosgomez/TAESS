const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'db', 
  user: process.env.DATABASE_USER || 'root', 
  password: process.env.DATABASE_PASSWORD || 'example', 
  database: process.env.DATABASE_NAME || 'myappdb', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;