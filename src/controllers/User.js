const con = require('../db');

module.exports = {
  // Buscar un usuario por
  getUser: async (req,res) => {
    const {username, password} = req.body;
    const query = `CALL findUser(?,?)`;
    await con.query(query,[username,password], (err,rows,fields) => {
      if (!err) {
        res.json({status: true});
      }else {
        res.json({status: false, err: err.sqlMessage});
        console.log(err.sqlMessage);
      }
    });
  }
};
