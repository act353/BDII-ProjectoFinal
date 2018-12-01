const mysql = require('mysql');

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'hotel'
});

con.connect((err)=>{
  if (err) {
    console.log(err);
    return ;
  }else {
    console.log('conexion exitosa');
  }
});

module.exports = con;
