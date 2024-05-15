const {conectar, oracledb} = require('../model/connection.js');

class paciente{

    constructor(){

    }

    async buscarPacientes(){
        let conn;

        try{
            conn = await conectar();

            let select = "SELECT P.NNUMEPESS, P.CNOMEPESS, T.CNUMETEL, P.CEMAILPESS FROM HSSPESS P ,UNIPESSTEL U ,HSSTEL T WHERE P.NNUMEPESS = U.NNUMEPESS AND T.NNUMETEL = U.NNUMETEL AND U.CPRINCTEL = 'S'";
            let pacientes = await conn.execute(select, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();

            if(pacientes.rows.length == 0){
                return null;
            }else{
                return pacientes;
                
            }

        }catch(error){
            console.log(error);
        }
    }

    async resgatarPaciente(id){
        let conn;

        try{
            conn = await conectar();

            let select = "SELECT P.NNUMEPESS, P.CNOMEPESS, T.CNUMETEL, P.CEMAILPESS FROM HSSPESS P ,UNIPESSTEL U ,HSSTEL T WHERE P.NNUMEPESS = U.NNUMEPESS AND T.NNUMETEL = U.NNUMETEL AND U.CPRINCTEL = 'S'AND P.NNUMEPESS = :1";
            let pacientes = await conn.execute(select, [id], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();

            return pacientes;

        }catch(error){
            console.log(error);
        }
    }

}

module.exports = paciente;