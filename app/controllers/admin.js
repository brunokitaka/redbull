var bcrypt = require('bcryptjs');
const saltRounds = 10;

//Controller de render da pagina de login.
module.exports.loginAdmin = function (app, req, res) {
    res.render("admin/adminLogin");
};

//Controller de validação de login.
module.exports.validarLogin = function (app, req, res) {
    // Recebe os dados enviados.
    login = req.body;
    console.log(login);
    console.log("Chegou!");

    // Abre conecao com o banco de dados.
    let connection = app.config.dbConnection();
    let adminModel = new app.app.models.AdminDAO(connection);

    adminModel.verificaLogin(login, function(error, result){

        // Tratamento de erro caso ocorra alguma falha na conexao com o banco ou o usuario seja invalido.
        if(error){
            console.log("Erro ao verificar o dados de login: %s ", error);
            res.send("Erro ao verificar o dados de login!");
            return;
        }
        if (result[0] == undefined) {
            console.log("Nenhum usuario encontrado.");
            res.redirect("/admin");
            return;
        }
        else {
            // Compara se a Senha digitada é a mesma registrada.
            if (bcrypt.compareSync(login.senha, result[0].senha)) {
                req.session.logado = true;
                res.redirect("/homeAdmin");
                return;
            } else {
                res.redirect("/admin");
                return;
            }
        }
    });
}

//Controller de render da pagina de Home do a
module.exports.homeAdmin = function (app, req, res) {
    if(req.session.logado == true){
        res.render("admin/adminHome");
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.cadastrarAtletica = function (app, req, res) {
    if(req.session.logado == true){
        res.render("admin/cadAtleticas", {msg: ""});
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.cadastroAtletica = function (app, req, res) {
    if(req.session.logado == true){

        // Recebe os dados enviados.
        let atletica = req.body;
        console.log(atletica);
        console.log("chegou");

        // Abre conecao com o banco de dados.
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.cadastroAtletica(atletica, function(error, result){

            // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
            if(error){
                console.log("Erro ao cadastrar atletica: %s ", error);
                res.send("Erro ao cadastrar atletica!");
                return;
            }
            else{
                res.render("admin/cadAtleticas", {msg: "Cadastro efetuado com sucesso"});
                return;
            }
        
        });
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.editarAtletica = function (app, req, res) {
    if(req.session.logado == true){

        // Recebe os dados enviados.
        let atletica = req.body;
        atletica = JSON.stringify(atletica);
        atletica = atletica.slice(2, atletica.length - 5);
        atletica = atletica.split(";");
        console.log(atletica);
        console.log("chegou");

        // Abre conecao com o banco de dados.
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.editaAtletica(atletica, function(error, result){

            // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
            if(error){
                console.log("Erro ao editar atletica: %s ", error);
                res.send("Erro ao editar atletica!");
                return;
            }
            else{
                res.send("Editado com sucesso!");
                return;
            }
        
        });
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.cadastrarEstabelecimento = function (app, req, res) {
    if(req.session.logado == true){
        res.render("admin/cadEstabs", {msg: ""}); 
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.cadastroEstabelecimento = function (app, req, res) {
    if(req.session.logado == true){

        // Recebe os dados enviados.
        let estabelecimento = req.body;        
        // Abre conecao com o banco de dados.
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.cadastroEstabelecimento(estabelecimento, function(error, result){

            // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
            if(error){
                console.log("Erro ao cadastrar estabelecimento: %s ", error);
                res.send("Erro ao cadastrar estabelecimento!");
                return;
            }
            else{
                res.redirect("/cadastrarEstabelecimento");
                return;
            }
        
        });
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.editarEstabelecimento = function (app, req, res) {
    if(req.session.logado == true){

        // Recebe os dados enviados.
        let estabelecimento = req.body;
        estabelecimento = JSON.stringify(estabelecimento);
        estabelecimento = estabelecimento.slice(2, estabelecimento.length - 5);
        estabelecimento = estabelecimento.split(";");
        console.log(estabelecimento);
      
        // Abre conecao com o banco de dados.
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);
        adminModel.editaEstabelecimento(estabelecimento, function(error, result){

            // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
            if(error){
                console.log("Erro ao editar estabelecimento: %s ", error);
                res.send("Erro ao editar estabelecimento!");
                return;
            }
            else{
                res.send("Editado com sucesso!");
                return;
            }
        
        });
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.relatorioAtleticas = function (app, req, res) {
    if(req.session.logado == true){
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);
        adminModel.buscaAtleticas(function(error, result){
            if(error) console.log(error);
            else{
                console.log(result);
                res.render("admin/relAtleticas", {atleticas: result});
            }
        });
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.relatorioEstabelecimentos = function (app, req, res) {
    if(req.session.logado == true){
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.buscaEstabelecimentos(function(error, result){
            if(error) console.log(error);
            else{
                console.log(result);
                res.render("admin/relEstabs", {estabelecimentos: result});
            }
        });
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.relatorioGeral = function (app, req, res) {
    if(req.session.logado == true){
        res.render("admin/relGeral");
    }
    else{
        res.redirect("/admin");
        return;
    }
}

module.exports.sair = function (app, req, res) {
    req.session.destroy(function (error) {
		res.redirect("/admin");
	});
}

module.exports.cu = function (app, req, res) {
    // Recebe os dados enviados.
    login = req.body;
    console.log(login);
    console.log("Chegou!");

    // Abre conecao com o banco de dados.
    let connection = app.config.dbConnection();
    let adminModel = new app.app.models.AdminDAO(connection);

    adminModel.cu(login, function(error, result){
        if(error) console.log('Error = ' + error);
        console.log('Result = ' + result);
        console.log('cadastrei');
        res.render("admin/adminHome");
    });
}

module.exports.getEstabs = function (app, req, res) {
    if (req.session.logado) {
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.buscaEstabelecimentosOrderedByName(function(error, result){
            if(error){
                console.log("Erro ao buscar estabelecimentos ordenados por nome %s", error);
                res.send("Erro ao buscar estabelecimentos!");
                return;
            }
            else{
                res.send(result);
            }
        });
    }      
}

module.exports.getAtleticas = function (app, req, res) {
    if (req.session.logado) {
        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.buscaAtleticasOrderedByName(function(error, result){
            if(error){
                console.log("Erro ao buscar atleticas ordenadas por nome %s", error);
                res.send("Erro ao buscar atleticas!");
                return;
            }
            else{
                console.log(result);
                res.send(result);
            }
        });
    }      
}

module.exports.deleteEstab = function (app, req, res) {
    if (req.session.logado) {
        let estabelecimento = req.body;

        estabelecimento = JSON.stringify(estabelecimento);
        estabelecimento = estabelecimento.slice(2, estabelecimento.length - 5);
        
        //console.log(estabelecimento);

        let connection = app.config.dbConnection();
        let adminModel = new app.app.models.AdminDAO(connection);

        adminModel.deleteEstab(estabelecimento, function(error, result){
            res.send(result);
        });
    }      
}

module.exports.deleteAtletica = function (app, req, res) {
    if (req.session.logado) {
        let atletica = req.body;

        atletica = JSON.stringify(atletica);
        atletica = atletica.slice(2, atletica.length - 5);
        
        //console.log(atletica);

        var connection = app.config.dbConnection();
        var adminModel = new app.app.models.AdminDAO(connection);

        adminModel.deleteAtletica(atletica, function(error, result){
            res.send(result);
        });
    }       
}