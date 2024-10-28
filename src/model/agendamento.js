const {conectar, oracledb} = require('../model/connection.js');

class agendamento{
    async recuperarEndereco(nome){
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

    async agendamentoMedico(idmedico){
        let conn;

        try{
            conn = await conectar();

            let select = "select TO_CHAR(a.DAGENDAMENTO, 'DD/MM/YYYY HH24:MI:SS') data from HSSAGEND a where a.NNUMEPRES = :1 and a.CSITUAGEND = 'A' and a.DAGENDAMENTO > SYSDATE";
            let data = await conn.execute(select, [idmedico], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();
            return data;

        }catch(error){
            console.log(error);
        }
    }

    async gravarAgendamento(dados) {
        let conn;

        try{
            conn = await conectar();

            let insert = `INSERT INTO HSSAGEND (NNUMEPRES, NNUMEPESS, DAGENDAMENTO, DINCLUAGEND, NNUMEEND, CSITUAGEND) VALUES (:1,:2, TO_DATE(NVL('',:3),'DD/MM/YYYY HH24:MI:SS'), SYSDATE, :4, 'A')`;
            await conn.execute(insert, [dados['idmedico'], dados['idpaciente'], dados['datacom'], dados['end']], {autoCommit: true}, function(e,s){
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

    async buscarAgendamento(idpaciente){
        let conn;

        try{
            conn = await conectar();

            let select = "select u.NNUMEAGEND, TO_CHAR(u.DAGENDAMENTO, 'DD/MM/YYYY HH24:MI:SS') DATA, e.CDESCEND, e.CNUMEEND from HSSAGEND u,HSSPESS p, HSSEND e where u.NNUMEPESS = p.NNUMEPESS and e.NNUMEEND = u.NNUMEEND and trunc(u.DAGENDAMENTO) > trunc(SYSDATE) and u.CSITUAGEND = 'A' and u.NNUMEPESS = :1";
            let agendamento = await conn.execute(select, [idpaciente], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();
            return agendamento;


        }catch(error){
            console.log(error);
        }
    }

    async resgatarAgendamento(idagend){
        let conn;

        try{
            conn = await conectar();

            let select = "select TO_CHAR(u.DAGENDAMENTO, 'DD/MM/YYYY') DATA,TO_CHAR(u.DAGENDAMENTO, 'HH24:MI:SS') HORA, u.NNUMEEND from HSSAGEND u, HSSEND e WHERE e.NNUMEEND = u.NNUMEEND and u.NNUMEAGEND = :1";
            let agendamento = await conn.execute(select, [idagend], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();
            return agendamento;


        }catch(error){
            console.log(error);
        }
    }

    async editarAgendamento(dados){
        let conn;

        try{
            conn = await conectar();

            let update = `update HSSAGEND u set u.DAGENDAMENTO = TO_DATE(NVL('',:1),'DD/MM/YYYY HH24:MI:SS'), u.NNUMEEND = :2 where u.NNUMEAGEND = :3`;
            await conn.execute(update, [dados['datacom'], dados['end'], dados['idagend']], {autoCommit: true}, function(e,s){
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

    async desativarAgendamento(idagend){
        let conn;

        try{
            conn = await conectar();

            let update = `update HSSAGEND u set u.CSITUAGEND = 'C' where u.NNUMEAGEND = :1`;
            await conn.execute(update, [idagend], {autoCommit: true}, function(e,s){
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