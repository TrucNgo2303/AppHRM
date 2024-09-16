const connection = require('../database.js');

const getIncidents = async (req, res) => {
  const sql = 'SELECT * FROM Incident';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

const getRequests = async (req, res) => {
  const sql = 'SELECT * FROM Request';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};
const addIncident = async (req, res) => {
  const { incidentInfo, employeeId } = req.body;

  const sql = `
    INSERT INTO Incident 
    (incidentInfo, employeeID, status) 
    VALUES (?, ?, ?)
  `;

  const values = [incidentInfo, employeeId, 'waiting'];

  connection.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Incident added successfully', employeeId: results.insertId });
  });
};
const addRequest = async (req, res) => {
  const { requestInfo, employeeId } = req.body;

  const sql = `
    INSERT INTO Request 
    (requestInfo, employeeID, status) 
    VALUES (?, ?, ?)
  `;

  const values = [requestInfo, employeeId, 'waiting'];

  connection.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'request added successfully', employeeId: results.insertId });
  });
};


module.exports = {
  getIncidents,
  getRequests,
  addIncident,
  addRequest
};
