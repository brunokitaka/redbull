//Controller de render da pagina index.
module.exports.home = function (app, req, res) {
    res.render("public/index");
}

//Controller de render da pagina de cadastro, com as atleticas e estabelecimentos registrado.
module.exports.cadastro = function (app, req, res) {
    let connection = app.config.dbConnection();
    let publicModel = new app.app.models.PublicDAO(connection);

    publicModel.buscaAtleticas(function(error, result){
        // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
        if(error){
            console.log("Erro ao Buscar atleticas no banco: %s ", error);
            res.send("Erro ao Buscar atleticas!");
            return;
        }
        if (result[0] === undefined) {
            console.log("Nenhuma atletica encontrada.");
        }
        else {
            let atleticas = result;
            
            publicModel.buscaEstabelecimentos(function(error, result){
                if(error){
                    console.log("Erro ao Buscar estabelecimentos no banco: %s ", error);
                    res.send("Erro ao Buscar estabelecimentos!");
                    return;
                }
                if (result[0] === undefined) {
                    console.log("Nenhum estabelecimento encontrada.");
                }
                else {
                    res.render("public/cadastro", {estabelecimentos: result, atleticas: atleticas});
                }
            });
        }
    });
}

module.exports.enviar = function (app, req, res) {
    // Recebe os dados enviados.
    dados = req.body;
    console.log(dados);
    console.log("Chegou!");
    let codigo = dados.idCodigo;

    // Abre conecao com o banco de dados.
    let connection = app.config.dbConnection();
    let publicModel = new app.app.models.PublicDAO(connection);

    publicModel.verificaCodigo(codigo, function(error, result){

        // Tratamento de erro caso ocorra alguma falha na conexao com o banco ou o Codigo seja invalido.
        if(error){
            console.log("Erro ao verificar o Codigo inserido: %s ", error);
            res.send("Erro ao verificar o Codigo inserido!");
            return;
        }
        console.log(result);
        if(result[0] === undefined){
            console.log("Codigo nao existente");
            res.send("Codigo invalido!")
            return;
        }

        // Print para DEBUG.
        console.log(result[0].status);

        // Verificaçao caso o status seja 0, ou seja o codigo ainda nao foi utilizado.
        if(result[0].status == 0){
            dados.idCodigo = result[0].idCodigo;

            publicModel.enviarCadastro(dados, function(error, result){

                // Tratamento de erro caso ocorra alguma falha na conexao com o banco ao inserir o cadastro.
                if(error){
                    console.log("Erro inserir cadastro: %s ", error);
                    res.send("Erro ao cadastrar!");
                    return;
                }
                
                // Print apra DEBUG.
                console.log(result);

                publicModel.atualizarStatusCodigo(dados.idCodigo, function(error, result){
                    // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
                    if(error){
                        console.log("Erro ao atualizar o status: %s ", error);
                        res.send("Erro ao cadastrar!");
                        return;
                    }
                    
                    // Print para DEBUG.
                    console.log(result);
                    
                    publicModel.atualizarQtdVendasAtletica(dados.idAtletica, function(error, result){

                        // Tratamento de erro caso ocorra alguma falha na conexao com o banco.                        
                        if(error){
                            console.log("Erro ao atualizar a quantidade de vendas da atletica: %s ", error);
                            res.send("Erro ao cadastrar!");
                            return;
                        }

                        // Print para DEBUG.
                        console.log(result);

                        publicModel.atualizarQtdVendasEstabelecimento(dados.idEstabelecimento, function(error, result){

                            // Tratamento de erro caso ocorra alguma falha na conexao com o banco.
                            if(error){
                                console.log("Erro ao atualizar a quantidade de vendas do estabelecimento: %s ", error);
                                res.send("Erro ao cadastrar!");
                                return;
                            }

                            // Print para DEBUG.
                            console.log(result);

                            res.send("Codigo cadastrado com Sucesso!");
                            return;
                        });
                    });
                });
            });
        }

        // Verificaçao caso o status seja 1, ou seja o codigo ja foi utilizado.        
        else if(result[0].status == 1){
            res.send("Codigo ja utilizado!");
            return;
        }
        else{
            console.log("Falha no retorno do banco, verificar os status do codigo");
        }
    });
}