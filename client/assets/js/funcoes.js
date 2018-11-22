//caso o botao pesquisar seja clicado
document.querySelector('#btn-buscar').addEventListener('click', function(event){
    //previne que o formulario seja submetido
    event.preventDefault();
    //montar o formulario
    montarPainel();
})

//funçao para montar os cartoes
function montarPainel(){
    
    //mapeando o painel de tarefas do DOM
    let painelTarefa = document.querySelector('#painelTarefas');
    painelTarefas.innerHTML = '';

    //mapeando a caixa de busca
    let filtro = document.querySelector('#texto-busca').value;

    //espera o resultado da função listarTarefas()
    let promise = listarTarefas(filtro);
    promise
        //caso o resultado seja processado
        .then(function(response){
            
            //caso nao sejam encontrados tarefas via API
            if (response == null){
                mostrarMensagem('Nenhuma tarefa encontrada para busca!', 'd');
            } else {
                //caso sejam encontrados tarefas via API

                response.forEach(function(item){
                    //criando o cartão
                    let cartao = document.createElement('div');
                    cartao.className = 'card'
                    cartao.innerHTML = `
                        <div class="card-body">
                            <div>
                                <span class="card-subtitle mb-2 text-muted">${item.data}</span>
                            </div>
                            <p class="card-text">${item.descricao}</p>
                            </div>
                        `;
                        //
                        painelTarefas.appendChild(cartao);
                });
            }
            
        })
        //caso o resultado nao seja processado
        .catch(function(error){
            console.log(error);
        });
}

//quando o botao adicionar tarefa for clicado
document.querySelector('#btn-adicionar').addEventListener('click', function(event){
    event.preventDefault();

    //mostra o modal
    $('#modal').modal('show');

    //muda o layout do modal
    document.querySelector('#btn-inserir').classList.remove('nao-mostrar');
    document.querySelector('#btn-alterar').classList.add('nao-mostrar');
    document.querySelector('#btn-deletar').classList.add('nao-mostrar');
    document.querySelector('.modal-title').innerHTML = 'Inserir nova tarefa';

    //setando o focus no campo descriçao-tarefa
    document.querySelector('#descricao-tarefa').focus();

    //limpando campos do formulario
    document.querySelector('#descricao-tarefa').value = '';
    document.querySelector('#data-tarefa').value = '';

});