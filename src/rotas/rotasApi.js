const express = require('express');
const rotas = express.Router();
const Medico = require('../controler/controllerMedico.js');
const Paciente = require('../controler/controllerPaciente.js');
const Agendamento = require('../controler/controllerAgendamento.js');
const session = require('express-session');

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
        session.error = true;
        res.redirect('/');
    }
});

rotas.post('/pacienteMedico', async function(req, res){
    let medico = req.body.nome;
    let pacientes = await paciente.listarPacientes(medico);
    res.status(200).send(pacientes.rows);

});

rotas.post('/paciente', async function(req,res){
    session.idpaciente = req.body.id;
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

    if(await agendamento.tratamentoDados(undefined,hora,data,end,'salvar')){
        res.status(200).send('deu certo')
    }else{
        res.status(500).send('não')
    }

});

rotas.post('/listar_agendamentos', async function(req, res){
    let idpaciente = req.body.id;
    let resposta = await agendamento.buscarAgendamentos(idpaciente);
    if(!resposta.rows){
        res.status(404).send('Sem agendamentos');
    }else{
        res.status(200).send(resposta.rows);
    }
});

rotas.post('/buscar_agendamento', async function(req,res){
    let idagend = req.body.id;
    let resposta = await agendamento.resgatarAgendamento(idagend);
    res.status(200).send(resposta.rows);
});

rotas.post('/edit_agendamento', async function(req,res){
    let id = req.body.id;
    let hora = req.body.hora;
    let data = req.body.data;
    let end = req.body.endereco;

    if(await agendamento.tratamentoDados(id,hora,data,end,'update')){
        res.status(200).send('deu certo');
    }else{
        res.status(500).send('error');
    }
});

rotas.post('/inativar_agendamento', async function(req,res){
    let id = req.body.id;
    if(await agendamento.inativarAgendamento(id)){
        res.status(200).send('Inativou')
    }else{
        res.status(500).send('Não inativou')
    }
})

module.exports = rotas;