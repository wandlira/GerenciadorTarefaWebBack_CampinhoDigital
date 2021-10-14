const express = require('express');

const servidor = express();

servidor.get('/api', (req, res) =>{
    res.send('WANDERSON E JANE')

});

servidor.listen(3000)