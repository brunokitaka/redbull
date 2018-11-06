var mysql = require('mysql');

var conn_singleton = null;

//preencher com o seu bd local!!!!!!!!!!
var host = 'localhost';
var port = '3306';
var user = 'root';
var password = 'pass';
var database = 'redbull';

var connMySQL = function() {
  if (conn_singleton !== null) {
    return conn_singleton;
  } else {
    conn_singleton = mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
      multipleStatements: true
    });
    return conn_singleton;
  }
};

module.exports = function() {
  ////console.log('o autoload carregou o modulo de conexao com o bd')
  return connMySQL;
};
