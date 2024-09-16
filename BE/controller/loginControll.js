const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const connection = require('../database.js');

const SECRET_KEY = 'your_jwt_secret_key';
const EMAIL_USER = 'your_email@gmail.com';
const EMAIL_PASSWORD = 'your_email_password';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT employeeID, userName,passWord,keyRole FROM employee WHERE userName = ?';
    connection.query(query, [username], async (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      const user = results[0];
      if (!user) {
        return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu sai' });
      }
      if (password != user.passWord) {
        return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu ???' });
      }

      const token = jwt.sign({ username: user.username, id: user.employeeID, role: user.keyRole }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, id: user.employeeID, role: user.keyRole });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const query = 'SELECT * FROM employee WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) return res.status(500).json({ error: error.message });

      const user = results[0];
      if (!user) {
        return res.status(404).json({ message: 'Email không tồn tại' });
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'Mã xác minh',
        text: `Mã xác minh của bạn là: ${verificationCode}`,
      });

      const updateQuery = 'UPDATE User SET verificationCode = ? WHERE email = ?';
      connection.query(updateQuery, [verificationCode, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mã xác minh đã được gửi' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const query = 'SELECT * FROM User WHERE email = ?';
    connection.query(query, [email], (error, results) => {
      if (error) return res.status(500).json({ error: error.message });

      const user = results[0];
      if (user.verificationCode === code) {
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false, message: 'Mã xác minh không đúng' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const query = 'SELECT * FROM User WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) return res.status(500).json({ error: error.message });

      const user = results[0];
      if (!user) {
        return res.status(404).json({ message: 'Email không tồn tại' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateQuery = 'UPDATE User SET password = ? WHERE email = ?';
      connection.query(updateQuery, [hashedPassword, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mật khẩu đã được thay đổi' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  sendVerificationCode,
  verifyCode,
  resetPassword,
};
