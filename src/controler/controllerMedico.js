const Medico = require('../model/medico');

let medico = new Medico();

class controllerMedico{
    constructor(){}

    async fazerLogin(nome, senha){
        
        let prestadores = await medico.buscarMedico(nome,senha);
        if(prestadores){
            if(prestadores.rows[0]['CLOGPRES'] == nome && prestadores.rows[0]['CSENPRES'] == senha){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}

module.exports = controllerMedico;