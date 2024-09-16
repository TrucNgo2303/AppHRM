const connection = require('../database.js');

const getSalaryById = async (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT Salary.*, employee.name
    FROM Salary 
    JOIN employee ON Salary.employeeID = employee.employeeID
    WHERE Salary.employeeID = ?
  `;

  connection.query(sql, [id], (error, results) => {
    console.log(results);
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    res.json(results[0]);
  });
};
const getAllSalary = async (req, res) => {
  const sql = `SELECT e.name, e.employeeID, s.heSoLuong, s.Thuong, s.phucLoi
            FROM employee e
            JOIN salary s ON e.employeeID = s.employeeID;`;
  connection.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

const updateSalaryHeSo = async (req, res) => {
  const { id } = req.params;
  const { heSoLuong } = req.body;

  const getSalarySql = 'SELECT * FROM Salary WHERE employeeID = ?';
  const updateSalarySql = `
    UPDATE Salary 
    SET heSoLuong = ?, tongLuong = ?
    WHERE employeeID = ?
  `;
  connection.query(getSalarySql, [id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    const currentSalary = results[0];

    const newTongLuong = parseFloat(heSoLuong * currentSalary.LuongCoBan) + parseFloat(currentSalary.Thuong);
    connection.query(updateSalarySql, [heSoLuong, newTongLuong, id], (error) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ ID: id, heSoLuong: heSoLuong });
    });
  });
};
const updateSalaryPhucLoi = async (req, res) => {
  const { id } = req.params;
  const { Thuong, phucLoi } = req.body;

  const getSalarySql = 'SELECT * FROM Salary WHERE employeeID = ?';
  const updateSalarySql = `
    UPDATE Salary 
    SET Thuong = ?, phucLoi = ?, tongLuong = ?
    WHERE employeeID = ?
  `;
  connection.query(getSalarySql, [id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    const currentSalary = results[0];
    const newTongLuong = parseFloat(currentSalary.heSoLuong * currentSalary.LuongCoBan) + parseFloat(Thuong);
    connection.query(updateSalarySql, [Thuong, phucLoi, newTongLuong, id], (error) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ ID: id, Thuong: Thuong, PhucLoi: phucLoi });
    });
  });
};
module.exports = {
  getSalaryById,
  updateSalaryHeSo,
  updateSalaryPhucLoi,
  getAllSalary
};
