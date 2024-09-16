const connection = require('../database.js');

const getNotificaton = async (req, res) => {
  const sql = `
    SELECT NotificationCompany, notificationID, title, detail
    FROM Notification
  `;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(results);
  });
};
const getNotificatonEmployee = async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT NotificationPerson, notificationID
    FROM NotificationEmployee
    WHERE employeeID = ?
  `;
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(results);
  });
};
module.exports = { getNotificaton, getNotificatonEmployee }