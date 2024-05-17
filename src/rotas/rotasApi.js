const express = require('express');
const rotas = express.Router();
const Medico = require('../controler/controllerMedico.js');
const Paciente = require('../controler/controllerPaciente.js');
const Agendamento = require('../controler/controllerAgendamento.js');

let medico = new Medico();
let paciente = new Paciente();
let agendamento = new Agendamento();

rotas.get('/usuario', (req,res)=>{
    res.status(200).send(req.session.nome);
});

rotas.post('/login', async function(req, res){
    let nome = req.body.nome;
    let senha = req.body.senha;
    let verificar = await medico.fazerLogin(nome, senha);

    if(verificar){
        req.session.nome = nome;
        res.redirect('/pacientes');
    }else{
        res.redirect('/?error=Credenciais inválidas');
    }
});

rotas.get('/pacientes', async function(req, res){
    let pacientes = await paciente.listarPacientes();
    res.status(200).send(pacientes.rows);

});

rotas.post('/paciente', async function(req,res){
    const pacientes = await paciente.listarPaciente(req.body.id);
    res.status(200).send(pacientes.rows);
    
});

rotas.post('/endereco', async function(req,res){
    let nome = res.locals.usuario;
    let endereco = await agendamento.recuperarEndereco(nome);
    res.status(200).send(endereco.rows);
});

rotas.post('/agendamento', async function(req,res){
    let hora = req.body.hora;
    let data = req.body.data;
    let end = req.body.endereco;

    if(await agendamento.tratamentoDados(hora,data,end)){
        res.status(200).redirect('/calendario');
    }else{
        res.status(500).redirect('/agendamento');
    }

})

module.exports = rotas;