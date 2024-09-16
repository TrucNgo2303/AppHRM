const connection = require('../database.js');

const getTimeLogs = async (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM WorkingHours WHERE employeeID = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};
const addWorktime = async (req, res) => {
  const { employeeId } = req.params;

  const { day, status } = req.body;

  const sql = `
    INSERT INTO WorkingHours 
    (employeeID, Day, status) 
    VALUES (?, ?, ?)
  `;

  const values = [employeeId, day || new Date(), status || 'Work'];

  connection.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Worktime added successfully', worktimeId: results.insertId });
  });
};
module.exports = {
  getTimeLogs,
  addWorktime
};