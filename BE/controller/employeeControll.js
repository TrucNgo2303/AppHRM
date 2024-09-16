const connection = require('../database.js');

const getAllNhanViens = async (req, res) => {
  const sql = 'SELECT employeeID, name, department, role FROM employee';
  connection.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

const getNhanVienById = async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT employeeID, name, role, department, location, avatar, email, phoneNumber, nationalID, taxCode FROM employee WHERE employeeID = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'NhanVien not found' });
    }
    res.json(results[0]);
  });
};

const addNhanVien = async (req, res) => {
  const { employeeID, userName, passWord, name, role, department, location, avatar, email, phoneNumber, nationalID, taxCode } = req.body;

  const sql = `
    INSERT INTO employee 
    (employeeID, name, role, department, location, avatar, email, phoneNumber, nationalID, taxCode, userName, passWord, keyRole) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [employeeID, name, role, department, location, avatar, email, phoneNumber, nationalID, taxCode, userName, passWord, 'employee'];

  connection.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const sql2 = `
      INSERT INTO Salary 
      (employeeID,LuongCoBan,heSoLuong,tongLuong) 
      VALUES (?,?,?,?)
    `;
    const values2 = [employeeID, '5000000', '2', '10000000']
    connection.query(sql2, values2, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'NhanVien and Salary added successfully', employeeId: employeeID });
    });
  });
};
const deleteNhanVien = async (req, res) => {
  const { id } = req.params;
  connection.beginTransaction(async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const deleteWorkingHoursSql = 'DELETE FROM WorkingHours WHERE employeeID = ?';
      await new Promise((resolve, reject) => {
        connection.query(deleteWorkingHoursSql, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      const deleteNotificationEmployee = 'DELETE FROM NotificationEmployee WHERE employeeID = ?';
      await new Promise((resolve, reject) => {
        connection.query(deleteNotificationEmployee, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      const deleteXinNghiPhep = 'DELETE FROM XinNghiPhep WHERE employeeID = ?';
      await new Promise((resolve, reject) => {
        connection.query(deleteXinNghiPhep, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      const deleteIncident = 'DELETE FROM Incident WHERE employeeID = ?';
      await new Promise((resolve, reject) => {
        connection.query(deleteIncident, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      const deleteRequest = 'DELETE FROM Request WHERE employeeID = ?';
      await new Promise((resolve, reject) => {
        connection.query(deleteRequest, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      const deleteSalary = 'DELETE FROM Salary WHERE employeeID = ?';
      await new Promise((resolve, reject) => {
        connection.query(deleteSalary, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      const deleteEmployeeSql = 'DELETE FROM employee WHERE employeeID = ?';
      const employeeResult = await new Promise((resolve, reject) => {
        connection.query(deleteEmployeeSql, [id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });

      if (employeeResult.affectedRows === 0) {
        return connection.rollback(() => {
          res.status(404).json({ message: 'NhanVien not found' });
        });
      }
      connection.commit((err) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }
        res.status(204).end();
      });

    } catch (error) {
      connection.rollback(() => {
        res.status(500).json({ error: error.message });
      });
    }
  });
};


module.exports = {
  getAllNhanViens,
  getNhanVienById,
  addNhanVien,
  deleteNhanVien
};
