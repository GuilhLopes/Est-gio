const {conectar, oracledb} = require('../model/connection.js');

class email{
    async buscarDados(){
        let conn;
        try{
            conn = await conectar();

            let select = `select TO_CHAR(gui.DINCLGUIA, 'DD/MM/YYYY') "Data", CASE WHEN ROW_NUMBER() OVER (PARTITION BY pres.CNOMEPRES ORDER BY gui.DINCLGUIA) = 1 THEN 'Sim' ELSE 'Não' END "Ultimo_Registro",pess.CNOMEPESS ,pess.CEMAILPESS ,tel.CNUMETEL ,pres.CNOMEPRES,pres.CEMAILPRES,equ.CDESCEQUI from hssguia gui,hsspess pess,HSSTEL tel,HSSPRES pres ,HSSEQUI equ,UNIPESSTEL upt,UNIPRESEQUI uep where gui.NNUMEPESS = pess.NNUMEPESS and upt.NNUMEPESS = pess.NNUMEPESS and gui.NNUMEPRES = pres.NNUMEPRES and uep.NNUMEPRES = pres.NNUMEPRES and uep.NNUMEEQUI = equ.NNUMEEQUI and tel.NNUMETEL = upt.NNUMETEL and uep.CPRINCPRES = 'S' and trunc(gui.DINCLGUIA) = trunc(SYSDATE) - 1 and gui.NNUMEPROC = 3 order by pres.CNOMEPRES, CASE WHEN ROW_NUMBER() OVER (PARTITION BY pres.CNOMEPRES ORDER BY gui.DINCLGUIA) = 1 THEN 'Sim' ELSE 'Não' END`;
            let dados = await conn.execute(select, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            await conn.close();
            return dados.rows;

        }catch(error){
            console.log(error);
        }
    }

    async salvarEmail(dados){
        let conn;

        try{
            conn = await conectar();

            let insert = `insert into HSSSAIDA (NNUMESAIDA,CDESTINATARIO, CCONTEUDO, DINCLUSAIDA) select max(s.NNUMESAIDA) + 1,:1,:2,sysdate from HSSSAIDA s`;
            await conn.execute(insert, [dados['to'], dados['html']], {autoCommit: true}, function(e,s){
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

module.exports = email;