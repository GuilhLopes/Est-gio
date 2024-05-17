const {conectar, oracledb} = require('./connection.js');

class medico{

    constructor(){

    }

    async buscarMedico(nome, senha) {
        let conn;

        try{
            conn = await conectar();

            let select = 'select * from hsspres p where p.clogpres = :1 AND P.csenpres = :2';
            let prestadores = await conn.execute(select, [nome, senha], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            
            await conn.close();
            if(prestadores.rows.length){
                return prestadores;
            }else{
                return false;
            }

        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = medico;