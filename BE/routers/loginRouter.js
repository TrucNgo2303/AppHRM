const express = require('express');
const loginControll = require('../controller/loginControll.js');

const router = express.Router();

router.post('/login', loginControll.login);
router.post('/send-verification-code', loginControll.sendVerificationCode);
router.post('/verify-code', loginControll.verifyCode);
router.post('/reset-password', loginControll.resetPassword);

module.exports = router;
