const con = require('../db');

module.exports = {
  // Buscar un usuario por nickname y contraseña
  getUser: async (req,res) => {
    const {username, password} = req.body;
    const query = `CALL findUser(?,?)`;
    await con.query(query,[username,password], (err,rows,fields) => {
      if (!err) {
        res.json({hasError: false});
      }else {
        res.json({hasError: true, err: err});
        console.log(err.sqlMessage);
      }
    });
  }
};
