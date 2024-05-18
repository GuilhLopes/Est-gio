const {conectar, oracledb} = require('../model/connection.js');

class agendamento{
    async pegarEndereco(nome){
        let conn;

        try{
            conn = await conectar();

            let select = "SELECT e.nnumeend,e.cdescend, e.cnumeend FROM hssend E, HSSPRES P, UNIPRESEND U WHERE u.nnumepres = p.nnumepres AND u.nnumeend = e.nnumeend AND p.clogpres = :1";
            let endereco = await conn.execute(select, [nome], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();
            return endereco;

        }catch(error){
            console.log(error);
        }
    }

    async gravarAgendamento(dados) {
        let conn;

        try{
            conn = await conectar();

            let select = `INSERT INTO HSSAGEND (NNUMEPRES, NNUMEPESS, DAGENDAMENTO, DINCLUAGEND, NNUMEEND) VALUES (:1,:2, TO_DATE(NVL('',:3),'DD/MM/YYYY HH24:MI:SS'), SYSDATE, 1)`;
            await conn.execute(select, [dados['idmedico'], dados['idpaciente'], dados['datacom']], {autoCommit: true}, function(e,s){
                if(e){
                    console.log(e);
                }else{
                    console.log(s);
                }
            });
            await conn.close();

        }catch(error){
            console.log(error);
        }
    }
}

module.exports= agendamento;