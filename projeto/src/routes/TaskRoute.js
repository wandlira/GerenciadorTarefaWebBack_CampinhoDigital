const express = require('express')
const router = express.Router();

const TaskController = require ('../controller/TaskController');

router.post('/', TaskController.create);
router.put('/:id', TaskController.update);

module.exports = router; 