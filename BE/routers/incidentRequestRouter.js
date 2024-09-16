const express = require('express');
const incidentRequestController = require('../controller/incidentRequestControll.js');

const router = express.Router();

router.get('/incidents', incidentRequestController.getIncidents);
router.get('/requests', incidentRequestController.getRequests);
router.post('/incidents', incidentRequestController.addIncident);
router.post('/requests', incidentRequestController.addRequest);

module.exports = router;
