function listarTarefas(filtro){

    return new Promise(function(resolve, reject){
        let url = 'http://localhost:3010/api/v1/tarefas/f/' + filtro;

        let requisicao = new XMLHttpRequest();

        requisicao.onreadystatechange = function(){
            if(this.readyState == 4){
                if (this.status == 200) {
                    resolve(JSON.parse(this.response));
                } else if(this.status == 400){
                    resolve(null);
                } else {
                    reject("Erro ao conectar ao servidor");                
                }
            }
        }

        requisicao.open("GET", url, true);
        requisicao.send();

    });
}

function inserirTarefa(tarefa){

    return new Promise(function(resolve, reject){

        let url = 'http://localhost:3010/api/v1/tarefas/f/';
        let requisicao = new XMLHttpRequest();

        requisicao.onreadystatechange = function(){
            if (this.readyState == 4) {
                if(this.status == 201){
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('Erro ao enviar dados ao servidor');
                }
            }
        }

        requisicao.open("POST", url, true);
        requisicao.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        requisicao.send(JSON.stringify(tarefa));
    });
}