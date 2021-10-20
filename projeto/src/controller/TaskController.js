const TaskModel = require('../model/TaskModel');

//A CONTROLLER FAZ O TRÁFEGO, RECEBENDO E ENVIADO RESPOSTAS.
class TaskController{

    //MÉTODO RESPONSÁVEL POR RECEBER A REQUISIÇÃO DE ARMAZENAMENTO NO BANCO DE DADOS E CRIAR ESSE ARMAZENAMENTO
    async create(req, res){
        //RECEBE A REQUISIÇÃO DO FRON
        const task = new TaskModel(req.body);
        //SALVA NO BANCO DE DADOS.
        await task
        .save() 
        .then(response => {return res.status(200).json(response)})
        .catch(erro => {return res.status(500).json(erro)});


        //save() MÉTODO UTILIZADO PARA SALVAR OS DADOS QUE VEM DO FRONT E BANCO DE DADOS
        //then() RESPOSTA POSITIVA, CASO O SALVAMENTO FOR BEM SUCEDIDO.
        //catch() TRATAMENTO DE ERRO, CASO FOR MAL SUCEDIDO. 
    }


}


module.exports = new TaskController();