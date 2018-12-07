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
    await con.query(query,[ENTRADA,PRODUCTO,PRECIO,CANTIDAD,ESTADO], (err, rows, fields) => {
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
        console.log(err);
      }
    })
  },

  deleteEntry: async (req,res) => {
    const {Mov, id} = req.params;
    const query = `call delete_Entry(?,?)`;
    await con.query(query,[Mov,id], (err,fields) => {
      if (!err) {
        res.json({hasError:false});
      } else {
        res.json({hasError:true, ErrorMsg:err});
        console.log(err);
      }
    });
  },

  insertMov: async (req,res) => {
    const {Mov} = req.params;
    const {DATE,USER} = req.body;
    const query = `call Insert_Mov(?,?,?)`;
    con.query('set autocommit=0;',(err, fields) => {
      if (err) {
        console.log(err);
      }
    });
    await con.query(query,[Mov,DATE,USER], (err, rows, fields) => {
      if (!err) {
        res.json({hasError:false});
      } else {
        res.json({hasError:true, ErrorMsg:err.sqlMessage});
        con.query('rollback;',(err,fields) => {
          if (err) {
            console.log(err);
          }
        });
      }
    })
  },

  saveMov: async (req,res) => {
    await con.query('commit;',(err, fields) => {
      if (!err) {
        res.json({hasError:false});
      } else {
        res.json({hasError:true, ErrorMsg:err.sqlMessage});
        console.log(err);
      }
    });
  },

  cancelMov: async (req,res) => {
    await con.query('rollback;',(err, fields) => {
      if (!err) {
        res.json({hasError:false});
      } else {
        res.json({hasError:true, ErrorMsg:err});
        console.log(err);
      }
    });
  }
};
