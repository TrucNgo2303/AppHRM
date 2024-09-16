const connection = require('../database.js');
const XinNghiPhep = async (req, res) => {
    const {ThoiGianNghi,LyDoNghi,caNghi,employeeID} = req.body;
    
    const sql = `
      INSERT INTO XinNghiPhep 
      (ThoiGianNghi,LyDoNghi,caNghi,employeeID) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [ThoiGianNghi,LyDoNghi,caNghi,employeeID]
    connection.query(sql, values, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'Xin nghi phep thanh cong', employeeId: results.insertId });
    });
  };
  module.exports = {XinNghiPhep}