//caso o botao seja clicado
document.querySelector('#btn-buscar').addEventListener('click', function (event) {
    //privine que o formulario seja submetido
    event.preventDefault();
    //montar o formulario
    montarPainel();
});

//definindo uma tarefa global para auxiliar na alteração de uma terefa
let tarefa = {};


//função para montar os cartões
function montarPainel() {

    // mapeando o painel de tarefas do DOM 
    let painelTarefa = document.querySelector('#painelTarefas');
    painelTarefas.innerHTML = '';

    //capturando o texto da busca
    let filtro = document.querySelector("#texto-busca").value;


    //Espera o resultado da função listarTarefas
    let promise = listarTarefas(filtro);
    promise
        //Caso o resultado seja processado
        .then(function (response) {

            // caso nao seja encontras tarefas
            if (response == null) {
                mostrarMensagem('Nenhuma tarefa encontrada para esta busca', 'd');

            } else {
                // caso sejam encontardas tarefas
                response.forEach(function (item) {
                    //criando cartão
                    let cartao = document.createElement('div');
                    cartao.className = 'card';
                    cartao.innerHTML = `    
                        <div class="card-body">
                        <div>
                            <span class="card-subtitle mb-2 text-muted">${dataToString(item.data)}</span>
                        </div>
                        <p class="card-text">${item.descricao}</p>
                        </div>
                    `;
                    //adicionando o cartão no painel de tarefas
                    painelTarefas.appendChild(cartao);

                    cartao.addEventListener('click', function(event){
                        montarFormularioAlterar(item.id);
                        tarefa.id = item.id;
                    });

                });

            }

        })

        //Caso o resultado não seja processado 
        .catch(function (error) {
            console.log(error);
        });

}

// quando o botão adicionar tarefa for clicado
document.querySelector('#btn-adicionar').addEventListener('click', function (event) {
    event.preventDefault();

    //mostra o modal
    $('#modal').modal('show');

    //mostrar o botao de inserçao
    document.querySelector('#btn-inserir').classList.remove('nao-mostrar');
    document.querySelector('#btn-alterar').classList.add('nao-mostrar');
    document.querySelector('#btn-deletar').classList.add('nao-mostrar');
    document.querySelector('.modal-title').innerHTML = 'Inserir nova tarefa';

    // setando o focus no campo descriçao-tarefa
    document.querySelector('#descricao-tarefa').focus();


    //limpando campos do formulario
    document.querySelector('#descricao-tarefa').value = '';
    document.querySelector('#data-tarefa').value = '';
});

// quando o botão inserir for clicado
document.querySelector('#btn-inserir').addEventListener('click', function (event) {

    event.preventDefault();
    inserir();
});


// funcao para inserir dados
function inserir() {


    //capturar os dados do formulario
    let descricao = document.querySelector('#descricao-tarefa').value;
    let data = document.querySelector('#data-tarefa').value;

    // cria um objeto tarefa
    let tarefa = {};
    tarefa.descricao = descricao;
    tarefa.data = data;
    tarefa.realizado = false;

    // inserir uma nova tarefa
    let promise = inserirTarefa(tarefa);
    promise
        .then(function (response) {
            mostrarMensagem('Tarefa inserida com sucesso', 's');
            montarPainel();
        })
        .catch(function (erro) {
            mostrarMensagem(erro, 'd');
        });

    //mostra o modal
    $('modal').modal('toggle');
}


//funcao que monta o formulario para alterar
function montarFormularioAlterar(id) {

    let promise = listarTarefasPorId(id);
    promise
        .then(function (tarefa) {

            //campos do formulario
            document.querySelector('#idTarefa').value = tarefa.id;
            document.querySelector('#descricao-tarefa').value = tarefa.descricao;
            document.querySelector('#data-tarefa').value = dataToInput(tarefa.data);

            //mostra o modal
            $('#modal').modal('show');

            //mostrar o botao de inserçao
            document.querySelector('#btn-inserir').classList.add('nao-mostrar');
            document.querySelector('#btn-alterar').classList.remove('nao-mostrar');
            document.querySelector('#btn-deletar').classList.remove('nao-mostrar');
            document.querySelector('.modal-title').innerHTML = 'Alterar tarefa';

            // setando o focus no campo descriçao-tarefa
            document.querySelector('#descricao-tarefa').focus();

        })
        .catch(function (erro) {
            mostrarMensagem(erro, 'd');
        });
}

//quando o botão alterar for clicado
document.querySelector('#btn-alterar').addEventListener('click', function(event){

    event.preventDefault();

    //dados do formulario
    tarefa.descricao = document.querySelector('#descricao-tarefa').value;
    tarefa.data = document.querySelector('#data-tarefa').value;

    let promise = alterarTarefa(tarefa);
    promise
        .then(function(resolve){
            mostrarMensagem('Tarefa alterada com sucesso', 's');
        })
        .catch(function(erro){
            mostrarMensagem(erro, 'd');
        });
        
        //fechar formulário
        $('#modal').modal('toggle');
});

//Quando clicar no btn-deletar...
document.querySelector('#btn-deletar').addEventListener('click', function(event){
   
    event.preventDefault();

    let promise = deletarTarefa(tarefa.id);
    promise
        .then(function(resolve){
            mostrarMensagem('Tarefa deletada com sucesso', 's');
            montarPainel();
        })
        .catch(function(erro){
            mostrarMensagem(erro, 'd');
        });

        //fechar modal
        $('#modal').modal('toggle');
});