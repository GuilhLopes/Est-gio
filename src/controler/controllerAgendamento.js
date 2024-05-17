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
            let dados = {
                hora: hora,
                data: data,
                end: end
            }
            await agendamento.gravarAgendamento(dados);
            return true;
        }
    }
}

module.exports = controllerAgendamento;