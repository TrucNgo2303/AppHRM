const express = require('express');
const XinNghiPhep = require('../controller/XinNghiPhepControll.js');

const router = express.Router();

router.post('/', XinNghiPhep.XinNghiPhep);

module.exports = router;