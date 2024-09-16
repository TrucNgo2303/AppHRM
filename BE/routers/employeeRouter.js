const express = require('express');
const employeeController = require('../controller/employeeControll.js');

const router = express.Router();

router.get('/', employeeController.getAllNhanViens);
router.get('/:id', employeeController.getNhanVienById);
router.post('/', employeeController.addNhanVien);
router.delete('/:id', employeeController.deleteNhanVien);

module.exports = router;
