var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/escola_db';
var db = pgp(connectionString);

//Funções da tabela aluno
function getAllAlunos(req, res, next) {
    db.any('select * from Aluno')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Alunos'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function getAluno(req, res, next) {
    var AlunoID = parseInt(req.params.id);
    db.one('select * from Aluno where id = $1', AlunoID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE Aluno'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function createAluno(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into Aluno(id, nome, id_Pai, id_Turma)' +
        'values(${id}, ${nome}, ${id_Pai}, ${id_Turma})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Aluno'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function updateAluno(req, res, next) {
    db.none('update Aluno set nome=$1, id_Pai=$2, id_Turma=$3, where id=$1',
      [parseInt(req.params.id),req.body.nome, 
        parseInt(req.body.id_Pai), parseInt(req.body.id_Turma),])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated Aluno'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}
  

function removeAluno(req, res, next) {
    var AlunoID = parseInt(req.params.id);
    db.result('delete from Aluno where id = $1', AlunoID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Aluno`
        });
        /* jshint ignore:end */
    })
      .catch(function (err) {
        return next(err);
    });
}

//Funções da tabela Pai
function getAllPais(req, res, next) {
    db.any('select * from Pai')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Pais'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}



//Export do modulo queries
module.exports = {
  getAllAlunos: getAllAlunos,
  getAluno: getAluno,
  createAluno: createAluno,
  updateAluno: updateAluno,
  removeAluno: removeAluno,
  getAllPais: getAllPais,
  //getPai: getPai,
  //createPai: createPai,
  //updatePai: updatePai,
  //removePai: removePai,
};
