const TaskModel = require('../model/TaskModel');

const now = new Date();

const {
        startOfDay,
        endOfDay,
        startOfWeek,
        endOfWeek,
        startOfMonth,
        endOfMonth,
        startOfYear,
        endOfYear
        } = require('date-fns');




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

    //MÉTODO PARA ATUALIZAR
    async update(req, res){

    
        await TaskModel.findByIdAndUpdate({'_id' :req.params.id}, req.body, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    //MÉTODO PARA LEITURA DE TODAS AS TAREFAS
    async readAll(req, res){

    
        await TaskModel.find({macadress: {'$in': req.params.macadress}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }
    
    //MÉTODO PARA LEITURA DE TAREFA ESPECÍFICA
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

    //MÉTODO PARA DELETAR TAREFA
    async delete(req, res){

    
        await TaskModel.deleteOne({'_id' :req.params.id})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    //MÉTODO PARA ATUALIZR O STATUS DA TAREFA (FEITA OU NÃO FEITA)
    async done (req, res){
        await TaskModel.findByIdAndUpdate({'_id':req.params.id},{'done':req.params.done}, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }

    //MÉTODO RESPONSÁVEL POR VERIFICAR SE A TAREFA ESTÁ ATRASADA
    //LT = LESS... THAN
    async late(req, res){
        await TaskModel
        .find({'when':{'$lt': now}, 'macadress': {'$in': req.params.macadress} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }


    //FILTROS  (HOJE)
    async today(req, res){
        await TaskModel.find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfDay(now), '$lt': endOfDay(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }


    //FILTROS  (SEMANA)
    async week(req, res){
        await TaskModel.find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfWeek(now), '$lt': endOfWeek(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }


    //FILTROS  (MÊS)
    async month(req, res){
        await TaskModel.find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfMonth(now), '$lt': endOfMonth(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }


     //FILTROS  (ANO)
     async year(req, res){
        await TaskModel.find({'macadress': {'$in': req.params.macadress}, 'when':{'$gte': startOfYear(now), '$lt': endOfYear(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    }

}


module.exports = new TaskController();