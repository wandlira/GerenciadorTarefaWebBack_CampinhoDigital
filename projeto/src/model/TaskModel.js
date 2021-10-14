


const Schema = mongoose.Schema;

const TaskSchema = new Schema({

macAdress: {type: String, required: true},
type: {type: Number, required: true},
title: {type: String, required: true},
description: {type: String, required: true},
when: {type: Date, required: true},
done: {type: Boolean, default: false},
created: {type: Date, required: Date.now()}

});


module.exports = mongoose.model('Task', TaskSchema);

