const {conectar, oracledb} = require('../model/connection.js');

class email{
    async buscarDados(){
        let conn;
        try{
            conn = await conectar();

            let select = `SELECT * FROM (SELECT TO_CHAR(gui.DINCLGUIA, 'DD/MM/YYYY') AS "Data",CASE WHEN ROW_NUMBER() OVER (PARTITION BY pres.CNOMEPRES ORDER BY gui.DINCLGUIA) = 1 THEN 'Sim' ELSE 'Não' END AS "Ultimo_Registro",pess.CNOMEPESS,pess.CEMAILPESS,tel.CNUMETEL,pres.CNOMEPRES,ppre.CEMAILPRES,equ.CDESCEQUI,ROW_NUMBER() OVER (PARTITION BY pres.CNOMEPRES ORDER BY gui.DINCLGUIA) AS rn FROM hssguia gui,hsspess pess,HSSTEL tel,HSSPRES pres,HSSEQUI equ,UNIPESSTEL upt,UNIPRESEQUI uep,hsspres ppre,hssequi pequi,UNIPRESEQUI pueq WHERE gui.NNUMEPESS = pess.NNUMEPESS AND upt.NNUMEPESS = pess.NNUMEPESS AND gui.NNUMEPRES = pres.NNUMEPRES AND uep.NNUMEPRES = pres.NNUMEPRES AND uep.NNUMEEQUI = equ.NNUMEEQUI AND tel.NNUMETEL = upt.NNUMETEL AND pess.NNUMEEQUI != equ.NNUMEEQUI AND ppre.NNUMEPRES = pueq.NNUMEPRES AND pess.NNUMEEQUI = pueq.NNUMEEQUI AND pueq.CPRINCPRES = 'S' AND uep.CPRINCPRES = 'S' AND TRUNC(gui.DINCLGUIA) = TRUNC(SYSDATE) - 1 AND gui.CSITUGUIA = 'A' AND gui.NNUMEPROC = 3) subquery WHERE rn = 1 ORDER BY "CNOMEPRES", "Ultimo_Registro"`;
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