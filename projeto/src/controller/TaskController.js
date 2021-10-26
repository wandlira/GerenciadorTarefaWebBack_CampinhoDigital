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
        .catch(error => {return res.status(500).json(error)});


        //save() MÉTODO UTILIZADO PARA SALVAR OS DADOS QUE VEM DO FRONT E BANCO DE DADOS
        //then() RESPOSTA POSITIVA, CASO O SALVAMENTO FOR BEM SUCEDIDO.
        //catch() TRATAMENTO DE ERRO, CASO FOR MAL SUCEDIDO. 
    }

    async update(req, res){

    
        await TaskModel.findByIdAndUpdate({'_id' :req.params.id}, req.body, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }


    async readAll(req, res){

    
        await TaskModel.find({macadress: {'$in': req.body.macadress}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }
    
    async readById(req, res){

    
        await TaskModel.findById(req.params.id)
        .then(response => {
            if(response)
                return res.status(200).json(response)
            else
                return res.status(404).json({error : 'Tarefa não encontrada'})
            })
        .catch(error => {return res.status(500).json(error)});

    }

    async delete(req, res){

    
        await TaskModel.deleteOne({'_id' :req.params.id})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }


}


module.exports = new TaskController();