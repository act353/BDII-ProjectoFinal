const con = require('../db.js');

module.exports = {
  //buscar todos los productos
  getProducts: async (req,res) => {
    const {all} = req.params;
    const query = `CALL FIND_PRODUCTS(?)`;
    await con.query(query, [all], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  },

  getProductById: async (req,res) => {
    const {id} = req.params;
    const query = `CALL FIND_PROD_BY_ID(?)`;
    await con.query(query, [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  },

  getProductsByName: async (req,res) => {
    const {prod,usless} = req.params;
    const query = `CALL find_prod_by_name(?,?)`;
    await con.query(query, [prod,usless], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  },

  updateProduct: async (req,res) => {
    const {NOMBRE,PRECIO,STOCK,UNIDAD,MOSTRAR} = req.body;
    const {id} = req.params;
    const query = `CALL update_Product(?,?,?,?,?,?)`;
    await con.query(query, [id,NOMBRE,PRECIO,STOCK,UNIDAD,MOSTRAR], (err, fields) => {
      if (!err) {
        res.json({isError:false});
      } else {
        res.json({isError:true, error:err.sqlMessage});
      }
    });
  },

  insertProduct: async (req,res) => {
    const {NOMBRE,PRECIO,STOCK,UNIDAD,MOSTRAR} = req.body;
    const query = `CALL insert_Product(?,?,?,?,?)`;
    await con.query(query, [NOMBRE,PRECIO,STOCK,UNIDAD,MOSTRAR], (err, fields) => {
      if (!err) {
        res.json({isError:false});
      } else {
        res.json({isError:true, error:err.sqlMessage});
      }
    });
  }
};
