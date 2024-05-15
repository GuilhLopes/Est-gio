const Paciente = require('../model/paciente.js')

let paciente = new Paciente()
class controllerPaciente{
    constructor(){}

    async listarPacientes(){
        
        let pacientes = await paciente.buscarPacientes();
        if(pacientes.rows.length == 0){
            return null;
        }else{
            return pacientes;
        }
    }

    async listarPaciente(id){
        
        let pacientes = await paciente.resgatarPaciente(id);
        if(pacientes.rows.length == 0){
            return null;
        }else{
            return pacientes;
        }
    }
}

module.exports = controllerPaciente;