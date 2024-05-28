const express = require('express');
const session = require('express-session');
const rotas = express.Router();

function verificarLogin(req, res, next){
  if(req.session.nome){
      next();
  }else{
      res.redirect('/');
      next();
  }
}

rotas.get('/', function(req,res){
    if(!session.error){
      res.render('Login');
    }else{
      session.error = '';
      res.render('Login_e');
    }
});

rotas.get('/pacientes', verificarLogin,function(req,res){
    res.render('Pacientes');
});

rotas.get('/lista_agend',verificarLogin, function(req,res) {
  res.render('Lista_agendamento');
});

rotas.get('/calendario',verificarLogin, function(req,res) {
  res.render('calendario');
});

rotas.get('/agendamento', verificarLogin,function(req,res){
    res.render('agendamento');
});

rotas.get('/edit_agend', verificarLogin, (req,res)=>{
    res.render('edit_agend');
});


module.exports = rotas;