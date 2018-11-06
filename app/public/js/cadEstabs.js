let lista;
let editAtual = 0;

function editEstabelecimento(element){
    if (element.target.classList.contains('teste') && editAtual == 0){
        editAtual = 1;
        console.log(element);
        let id = element.target.dataset.id;
        let nome = element.target.dataset.nome;
        console.log(id);
        let pai = element.path[2];
        pai.innerHTML = `<input type="text" class="edit" placeholder="${nome}" name="nome" id="inputEdit"> 
        <button class="confirmEdit" onclick="updateEstabelecimento(${id})"><i class="fa fa-check"></i></button>
        <button class="confirmEdit" onclick="read()"><i class="fa fa-times"></i></button>
        `;
    }
    
}

function updateEstabelecimento(id){
    let nome = document.getElementById("inputEdit").value;
    console.log(nome);
    axios.post('/editarEstabelecimento', `${id};` + `${nome}`)
    .then(function (response) {
        alert(response.data);
        read();
        editAtual = 0;
    })
    .catch(function (error) {

    });
}

function delEstabelecimento(id, nome){

    if(confirm("Deseja realmente excluir o estabelecimento " + nome + "?")){
        axios.post('/deleteEstab', `${id}`)
        .then(function (response) {
            read();
        })
        .catch(function (error) {
            alert("ERRO")
        });
    }
}

function read(){
    editAtual = 0;
    lista = document.querySelector('#listaCadastrados');
    lista.addEventListener('click', editEstabelecimento);
    
    lista.innerHTML = '';

    axios.get('/getEstabs')
    .then((response) => {
        let estabelecimentos = response.data;
        estabelecimentos.forEach(element => {
            lista.innerHTML += templateEstabs(element);
        });
    })
    .catch((error) => {
        console.log("Erro ao buscar estabelecimentos cadastrados: "+error);
    });
}

function templateEstabs(estabelecimento){
    return `

    <li class="cadastro">
        <button id="del" class="cadastro">
            <i class="fas fa-trash-alt teste" onclick="delEstabelecimento(${estabelecimento.idEstabelecimento}, '${estabelecimento.nome}');"></i>
        </button>
        <button id="edit" class="cadastro">
            <i class="fas fa-edit teste" data-id="${estabelecimento.idEstabelecimento}" data-nome="${estabelecimento.nome}"></i> 
        </button>   
        ${estabelecimento.nome}
    </li>

    `;
}