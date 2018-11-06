let lista;
let editAtual = 0;

function editAtletica(element){
    if (element.target.classList.contains('teste') && editAtual == 0){
        editAtual = 1;
        console.log(element);
        let id = element.target.dataset.id;
        let nome = element.target.dataset.nome;
        console.log(id);
        let pai = element.path[2];
        pai.innerHTML = `<input type="text" class="edit" placeholder="${nome}" name="nome" id="inputEdit"> 
        <button class="confirmEdit" onclick="updateAtletica(${id})"><i class="fa fa-check"></i></button>
        <button class="confirmEdit" onclick="read()"><i class="fa fa-times"></i></button>
        `;
    }   
}

function updateAtletica(id){
    let nome = document.getElementById("inputEdit").value;
    console.log(nome);
    axios.post('/editarAtletica', `${id};` + `${nome}`)
    .then(function (response) {
        alert(response.data);
        read();
        editAtual = 0;
    })
    .catch(function (error) {

    });
}

function delAtletica(id, nome){
    if(confirm("Deseja realmente excluir a atlética " + nome + "?")){
        axios.post('/deleteAtletica', `${id}`)
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
    lista.addEventListener('click', editAtletica);

    lista.innerHTML = '';

    axios.get('/getAtleticas')
    .then((response) => {
        console.log(response.data);
        let atleticas = response.data;
        atleticas.forEach(element => {
            lista.innerHTML += templateAtleticas(element);
        });
    })
    .catch((error) => {
        console.log("Erro ao buscar atléticas cadastradas");
    });
}

function templateAtleticas(atletica){
    return `

    <li class="cadastro">
        <button id="del" class="cadastro">
            <i class="fas fa-trash-alt" onclick="delAtletica(${atletica.idAtletica}, '${atletica.nome}');"></i>
        </button>
        <button id="edit" class="cadastro">
            <i class="fas fa-edit teste" data-id="${atletica.idAtletica}"></i> 
        </button>   
        ${atletica.nome}
    </li>

    `;
}