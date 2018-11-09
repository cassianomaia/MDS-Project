var express = require('express');
var router = express.Router();

/* GET home page. */
exports.index = function(req, res) {
  res.render('index.html', { title: 'Express' });
};


//Rotas do banco de dados
var db = require('../utils/queries')

//Rotas da api
router.get('/api/alunos', db.getAllAlunos);
router.get('/api/alunos/:id', db.getAluno);
router.post('/api/alunos', db.createAluno);
router.post('/api/alunos/:id', db.updateAluno);
router.delete('/api/alunos/:id', db.removeAluno);

router.get('/api/pais', db.getAllPais);
//router.get('/api/pais/:id', db.getPai);
//router.post('/api/pais', db.createPai);
//router.put('/api/pais/:id', db.updatePai);
//router.delete('/api/pais/:id', db.removePai);
module.exports = router;
