const express = require('express');
const notificationControll = require('../controller/notificationControll.js');

const router = express.Router();

router.get('/', notificationControll.getNotificaton);
router.get('/:id', notificationControll.getNotificatonEmployee);
module.exports = router;