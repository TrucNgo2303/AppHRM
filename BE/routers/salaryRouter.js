const express = require('express');
const salaryControll = require('../controller/salaryControll.js');

const router = express.Router();

router.get('/:id', salaryControll.getSalaryById)
router.get('/', salaryControll.getAllSalary)

router.post('/HeSo/:id', salaryControll.updateSalaryHeSo);
router.post('/PhucLoi/:id', salaryControll.updateSalaryPhucLoi);

module.exports = router;
