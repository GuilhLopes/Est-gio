const express = require('express');
const rotas = express.Router();
const Medico = require('../controler/controllerMedico.js');
const Paciente = require('../controler/controllerPaciente.js');


let medico = new Medico();
let paciente = new Paciente();

rotas.get('/usuario', (req,res)=>{
    res.status(200).send(req.session.nome);
});

rotas.post('/login', async function(req, res){
    let nome = req.body.nome;
    let senha = req.body.senha;

    if(medico.fazerLogin(nome, senha)){
        req.session.nome = nome;
        res.redirect('/pacientes');
    }else{
        res.redirect('/?error=Credenciais inválidas');
    }
});

rotas.get('/pacientes', async function(req, res){

    let pacientes = await paciente.listarPacientes();

    if(pacientes.rows.length == 0){
        res.status(500).json('Nenhum paciente encontrado');
    }else{
        res.status(200).send(pacientes.rows);
    }

});

rotas.post('/paciente', async function(req,res){
    const pacientes = await paciente.listarPaciente(req.body.id);

    if(pacientes.rows.length == 0){
        res.status(500).json('Nenhum paciente encontrado');
    }else{
        res.status(200).send(pacientes.rows);
    }
});

rotas.post('/endereco', async function(req,res){
    
});

module.exports = rotas;