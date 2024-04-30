const express = require('express');
const rotas = express.Router();
const {conectar, oracledb} = require('../DAO/connection.js');


rotas.post('/login', async function(req, res){
    let nome = req.body.nome;
    let senha = req.body.senha;
    let conn;

    try{
        conn = await conectar();

        let select = 'select * from hsspres p where p.clogpres = :1 AND P.csenpres = :2';
        let prestadores = await conn.execute(select, [nome, senha], {outFormat: oracledb.OUT_FORMAT_OBJECT});

        if(prestadores.rows.length == 0){
            res.status(500).json('Prestador não encontrado');
        }else{
            res.redirect('/pacientes?nome=' + nome)
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if(conn){
            await conn.close();
        }
    }
});

rotas.get('/pacientes', async function(req, res){
    let conn;

    try{
        conn = await conectar();

        let select = "SELECT P.CNOMEPESS, T.CNUMETEL, P.CEMAILPESS FROM HSSPESS P ,UNIPESSTEL U ,HSSTEL T WHERE P.NNUMEPESS = U.NUMEPESS AND T.NNUMETEL = U.NNUMETEL AND U.CPRINCTEL = 'S'";
        let pacientes = await conn.execute(select, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});

        if(pacientes.rows.length == 0){
            res.status(500).json('Nenhum paciente encontrado');
        }else{
            res.status(200).send(pacientes.rows);
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if(conn){
            await conn.close();
        }
    }

});

module.exports = rotas;