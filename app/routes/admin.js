module.exports = function (app) {
	app.get('/admin', function (req, res) {
		app.app.controllers.admin.loginAdmin(app, req, res);
	});

	app.post('/validarLogin', function (req, res) {
		app.app.controllers.admin.validarLogin(app, req, res);
	});

	app.get('/homeAdmin', function (req, res) {
		app.app.controllers.admin.homeAdmin(app, req, res);
	});

	//Render view de cadastro
	app.get('/cadastrarAtletica', function (req, res) {
		app.app.controllers.admin.cadastrarAtletica(app, req, res);
	});

	//Receber os dados e cadastrar a nova atletica 
	app.post('/cadastroAtletica', function (req, res) {
		app.app.controllers.admin.cadastroAtletica(app, req, res);
	});

	//Receber os dados e edita uma atletica ja existente
	app.post('/editarAtletica', function (req, res) {
		app.app.controllers.admin.editarAtletica(app, req, res);
	});

	//Render view de cadastro
	app.get('/cadastrarEstabelecimento', function (req, res) {
		app.app.controllers.admin.cadastrarEstabelecimento(app, req, res);
	});

	//Receber os dados e cadastrar novo estabelecimento
	app.post('/cadastroEstabelecimento', function (req, res) {
		app.app.controllers.admin.cadastroEstabelecimento(app, req, res);
	});

	//Receber os dados e edita um estabelecimento ja existente
	app.post('/editarEstabelecimento', function (req, res) {
		app.app.controllers.admin.editarEstabelecimento(app, req, res);
	});

	app.get('/relatorioAtleticas', function (req, res) {
		app.app.controllers.admin.relatorioAtleticas(app, req, res);
	});

	app.get('/relatorioEstabalecimentos', function (req, res) {
		app.app.controllers.admin.relatorioEstabelecimentos(app, req, res);
	});

	app.get('/relatorioGeral', function (req, res) {
		app.app.controllers.admin.relatorioGeral(app, req, res);
	});

	app.get('/getEstabs', function (req, res) {
		app.app.controllers.admin.getEstabs(app, req, res);
	});

	app.get('/getAtleticas', function (req, res) {
		app.app.controllers.admin.getAtleticas(app, req, res);
	});

	app.post('/deleteEstab', function (req, res) {
		app.app.controllers.admin.deleteEstab(app, req, res);
	});

	app.post('/deleteAtletica', function (req, res) {
		app.app.controllers.admin.deleteAtletica(app, req, res);
	});

	app.post('/editarEstabelecimento', function (req, res) {
		app.app.controllers.admin.editarEstabelecimento(app, req, res);
	});

	app.post('/editarAtletica', function (req, res) {
		app.app.controllers.admin.editarAtletica(app, req, res);
	});

	app.get('/sair', function (req, res) {
		app.app.controllers.admin.sair(app, req, res);
	});

	app.post('/cu', function (req, res) {
		app.app.controllers.admin.cu(app, req, res);
	});
}