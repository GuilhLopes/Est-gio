const session = require('express-session');
const Agendamento = require('../model/agendamento.js');

let agendamento = new Agendamento();

class controllerAgendamento{
    constructor(){}

    async recuperarEndereco(nome){
        
        let endereco = await agendamento.recuperarEndereco(nome);
        if(endereco.rows.length == 0){
            return null;
        }else{
            return endereco;
        }
    }

    async tratamentoDados(id,hora, data, end, tipo){
        console.log( await this.verificarAgendamentos(session.loginid, `${data} ${hora}:00`, end));
        if((!hora || !data || !end) || ( await this.verificarAgendamentos(session.loginid, `${data} ${hora}:00`, end))){
            return false;
        }else{
            if(tipo == 'salvar'){
                let datah = `${data} ${hora}:00`
                let dados = {
                    idmedico: session.loginid,
                    idpaciente: session.idpaciente,
                    datacom: datah,
                    end: end
                }
                await agendamento.gravarAgendamento(dados);
            }else if(tipo == 'update'){
                if(!id){
                    return false
                }else{
                    let datah = `${data} ${hora}`
                    let dados = {
                        idagend: id,
                        datacom: datah,
                        end: end
                    }
                    await agendamento.editarAgendamento(dados);
                }
            }
            return true;
        }
    }

    async verificarAgendamentos(idmedico, data){
        let datas = await agendamento.agendamentoMedico(idmedico);
        let aux = false;
        datas.rows.forEach((dataaux) =>{
            if(data == dataaux['DATA']){
                aux = true;
            }
        });
        return aux;
    }

    async buscarAgendamentos(idpaciente){
        let agend = await agendamento.buscarAgendamento(idpaciente);
        if(agend.rows.length){
            return agend;
        }else{
            return false;
        }
    }

    async resgatarAgendamento(idagend){
        let agend = await agendamento.resgatarAgendamento(idagend);
        if(agend.rows.length){
            return agend;
        }else{
            return false;
        }
    }

    async inativarAgendamento(idagend){
        if(!idagend){
            return false;
        }else{
            await agendamento.desativarAgendamento(idagend)
            return true;
        }
    }
}

module.exports = controllerAgendamento;