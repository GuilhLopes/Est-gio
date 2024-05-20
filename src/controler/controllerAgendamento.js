const session = require('express-session');
const Agendamento = require('../model/agendamento.js');

let agendamento = new Agendamento();

class controllerAgendamento{
    constructor(){}

    async recuperarEndereco(nome){
        
        let endereco = await agendamento.pegarEndereco(nome);
        if(endereco.rows.length == 0){
            return null;
        }else{
            return endereco;
        }
    }

    async tratamentoDados(hora, data, end){
        if(!hora || !data || !end){
            return false;
        }else{
            let datah = `${data} ${hora}:00`
            console.log(session.idpaciente) 
            let dados = {
                idmedico: session.loginid,
                idpaciente: session.idpaciente,
                datacom: datah,
                end: end
            }
            await agendamento.gravarAgendamento(dados);
            return true;
        }
    }

    async resgatarAgendamento(idpaciente){
        let agend = await agendamento.buscarAgendamento(idpaciente);
        if(agend.rows.length){
            return agend;
        }else{
            return false;
        }
    }
}

module.exports = controllerAgendamento;