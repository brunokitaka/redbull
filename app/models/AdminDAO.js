var bcrypt = require('bcryptjs');
const saltRounds = 10;

function AdminDAO(connection) {
    this._connection = connection;
}
//Recupera os dados de usuario para verificar se o login é valido.
AdminDAO.prototype.verificaLogin = function (login, callback) {
    this._connection.query('select * from usuarios where usuario = \'' + login.usuario + '\'', callback);
}

//Cadastra um novo estabelecimento.
AdminDAO.prototype.cadastroEstabelecimento = function (estabelecimento, callback) {
    this._connection.query('insert into estabelecimentos (nome, qtdVendas) values (\'' + estabelecimento.nome + '\', 0)', callback);
}

//Edita o nome de um estabelecimento ja existente.
AdminDAO.prototype.editaEstabelecimento = function (estabelecimento, callback) {
    this._connection.query('update estabelecimentos set nome = \'' + estabelecimento[1] + '\' where idEstabelecimento = \'' + estabelecimento[0] + '\'', callback);
}

//Cadastra uma novo atletica.
AdminDAO.prototype.cadastroAtletica = function (atletica, callback) {
    this._connection.query('insert into atleticas (nome, qtdVendas) values (\'' + atletica.nome + '\', 0)', callback);
}

//Edita o nome de uma atletica ja existente.
AdminDAO.prototype.editaAtletica = function (atletica, callback) {
    this._connection.query('update atleticas set nome = \'' + atletica[1] + '\' where idAtletica = \'' + atletica[0] + '\'', callback);
}

//Cria um novo usuario administrativo.
AdminDAO.prototype.cu = function (login, callback) {
    console.log(login.usuario);
    console.log(login.senha);

    var salt = bcrypt.genSaltSync(saltRounds);
    login.senha = bcrypt.hashSync(login.senha, salt);
    
    //this._connection.query('insert into usuarios (usuario, senha) values (\''+ login.usuario + '\', \'' + login.senha + '\')', callback);
    this._connection.query('insert into usuarios set ?', login, callback);
}

AdminDAO.prototype.buscaAtleticas = function (callback) {
    this._connection.query('select * from atleticas where status != 0 order by qtdVendas desc', callback);
}

AdminDAO.prototype.buscaEstabelecimentos = function (callback) {
    this._connection.query('select * from estabelecimentos where status != 0 order by qtdVendas desc', callback);
}

AdminDAO.prototype.buscaEstabelecimentosOrderedByName = function (callback) {
    this._connection.query('select * from estabelecimentos where status != 0 order by nome', callback);
}

AdminDAO.prototype.buscaAtleticasOrderedByName = function (callback) {
    this._connection.query('select * from atleticas where status != 0 order by nome', callback);
}

AdminDAO.prototype.deleteEstab = function (estabelecimento, callback) {
    this._connection.query('update estabelecimentos set status = 0 where idEstabelecimento = \'' + estabelecimento + '\'', callback);
}

AdminDAO.prototype.deleteAtletica = function (atletica, callback) {
    this._connection.query('update atleticas set status = 0 where idAtletica = \'' + atletica + '\'', callback);
}

module.exports = function () {
	return AdminDAO;
};