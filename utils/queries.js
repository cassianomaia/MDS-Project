var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/escola_db';
var db = pgp(connectionString);

//Funções da tabela aluno
function getAllAlunos(req, res, next) {
    db.any('select * from "Aluno"')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Recuperou todos os alunos'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function getAluno(req, res, next) {
    var AlunoID = parseInt(req.params.id);
    db.one('select * from "Aluno" where id = $1', AlunoID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Recuperou um aluno'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function createAluno(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into "Aluno"(nome, "Id_Pai", "Id_Turma")' +
        'values(${ ${nome}, ${Id_Pai}, ${Id_Turma})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inseriu um aluno'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function updateAluno(req, res, next) {
    db.none('update "Aluno" set nome=$1, id_Pai=$2, id_Turma=$3, where id=$1',
      [parseInt(req.params.id),req.body.nome, 
        parseInt(req.body.id_Pai), parseInt(req.body.id_Turma),])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Atualizou aluno'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}
  

function removeAluno(req, res, next) {
    var AlunoID = parseInt(req.params.id);
    db.result('delete from "Aluno" where id = $1', AlunoID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removeu ${result.rowCount} aluno`
        });
        /* jshint ignore:end */
    })
      .catch(function (err) {
        return next(err);
    });
}

//Funções da tabela Pai
function getAllPais(req, res, next) {
    db.any('select * from "Pai"')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Recuperou todos os pais'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function getPai(req, res, next) {
    var AlunoID = parseInt(req.params.id);
    db.one('select * from "Pai" where id = $1', AlunoID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Recuperou um pai'
        });
    })
      .catch(function (err) {
        return next(err);
    });
}

function createPai(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into "Pai"("Nome", login, senha)' +
      'values(${ ${Nome}, ${login}, ${senha})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inseriu um pai'
      });
  })
    .catch(function (err) {
      return next(err);
  });
}

//Exportando do modulo queries
module.exports = {
  getAllAlunos: getAllAlunos,
  getAluno: getAluno,
  createAluno: createAluno,
  updateAluno: updateAluno,
  removeAluno: removeAluno,
  getAllPais: getAllPais,
  getPai: getPai,
  createPai: createPai,
  //updatePai: updatePai,
  //removePai: removePai,
};
