const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'quanlynhanvien'
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối:', err.stack);
    return;
  }
  console.log('Kết nối thành công với ID:', connection.threadId);
});

module.exports = connection;

