const express = require('express');
const rotas = express.Router();

rotas.get('/', function(req,res){
    res.render('Login');
});

rotas.get('/pacientes', function(req,res){
    res.render('Pacientes');
});

rotas.get('/lista_agend', function(req,res) {
  res.render('Lista_agendamento');
});

rotas.get('/calendario', function(req,res) {
  res.render('calendario');
});


module.exports = rotas;