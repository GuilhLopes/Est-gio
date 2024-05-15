const Medico = require('../model/medico');

let medico = new Medico();

class controllerMedico{
    constructor(){}

    async fazerLogin(nome, senha){
        
        let prestadores = await medico.buscarMedico(nome,senha);
        if(prestadores.rows.length){
            return true
        }else{
            return false
        }
    }
}

module.exports = controllerMedico;