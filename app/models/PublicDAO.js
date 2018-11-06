function PublicDAO(connection) {
    this._connection = connection;
}

PublicDAO.prototype.verificaCodigo = function (codigo, callback){
    this._connection.query("select * from codigos where codigo = '" + codigo + "'", callback);
}

PublicDAO.prototype.atualizarStatusCodigo = function (idCodigo, callback){
    this._connection.query("update codigos set status = 1 where idCodigo = '" + idCodigo + "'", callback);
}

PublicDAO.prototype.atualizarQtdVendasAtletica = function (idAtletica, callback){
    this._connection.query("update atleticas set qtdVendas = qtdVendas + 1 where idAtletica = '" + idAtletica + "'", callback);
}

PublicDAO.prototype.atualizarQtdVendasEstabelecimento = function (dados, callback){
    this._connection.query("update estabelecimentos set qtdVendas = qtdVendas + 1 where idEstabelecimento = '" + dados + "'", callback);
}

PublicDAO.prototype.enviarCadastro = function (dados, callback){
    this._connection.query('insert into cadastros set ?', dados, callback);
}

PublicDAO.prototype.buscaAtleticas = function (callback) {
    this._connection.query('select * from atleticas where status != 0 order by nome', callback);
}

PublicDAO.prototype.buscaEstabelecimentos = function (callback) {
    this._connection.query('select * from estabelecimentos where status != 0 order by nome', callback);
}

module.exports = function () {
	return PublicDAO;
};

