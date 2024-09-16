const express = require('express');
const timeLogController = require('../controller/workTimesControll.js');

const router = express.Router();

router.get('/:id', timeLogController.getTimeLogs);
router.post('/',timeLogController.addWorktime);
module.exports = router;