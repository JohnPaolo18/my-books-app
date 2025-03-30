// --------------------------------------------
// Use for creating image in docker container
// --------------------------------------------
// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'db',
//   port: process.env.DB_PORT || 3306, // Default MySQL port
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'my-secret-pw',
//   database: process.env.DB_NAME || 'book_app',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default pool;



// --------------------------------------------
// Use for running in local environment
// --------------------------------------------
import mysql from 'mysql2/promise';

const defaultHost = process.env.NODE_ENV === 'development' ? 'localhost' : 'db';

const pool = mysql.createPool({
  host: process.env.DB_HOST || defaultHost,
  port: process.env.DB_PORT || 3306, // Default MySQL port
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'my-secret-pw',
  database: process.env.DB_NAME || 'book_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
