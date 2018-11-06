module.exports = function (app) {
	app.get('/', function (req, res) {
		app.app.controllers.public.home(app, req, res);
	});

	app.get('/cadastrar', function (req, res) {
		app.app.controllers.public.cadastro(app, req, res);
	});

	app.post('/enviar', function (req, res) {
		app.app.controllers.public.enviar(app, req, res);
	});
}

