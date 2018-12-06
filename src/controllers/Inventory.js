const con = require('../db.js');

module.exports = {
  getProdToEntries: async (req,res) => {
    const query = `Select * from getProducts`;
    await con.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  },

  insertEntry: async (req,res) => {
    const {PRODUCTO,PRECIO,CANTIDAD,ENTRADA,ESTADO} = req.body;
    const query = `call Insert_Entry(?,?,?,?,?)`;
    await con.query(query,[ENTRADA,PRODUCTO,PRECIO,CANTIDAD,ESTADO.trim()], (err, rows, fields) => {
      if (!err) {
        res.json({hasError:false});
      } else {
        res.json({hasError:true, ErrorMsg:err.sqlMessage});
      }
    })
  },

  getEntries: async (req,res) => {
    const {Mov} = req.params;
    const query = `SELECT * FROM getEntries WHERE PRODUCTOSI.INVENTARIO = ?`;
    await con.query(query,[Mov],(err,rows,fields) => {
      if (!err) {
        res.json({hasError:false, rows:rows});
      } else {
        res.json({hasError:true, ErrorMsg:err.sqlMessage});
      }
    })
  },

  insertMov: async (req,res) => {
    const {Mov} = req.params;
    const {DATE,USER} = req.body;
    const query = `call Insert_Mov(?,?,?)`;
    await con.query(query,[Mov,DATE,USER], (err, rows, fields) => {
      if (!err) {
        res.json({hasError:false});
      } else {
        res.json({hasError:true, ErrorMsg:err.sqlMessage});
      }
    })
  }
};
