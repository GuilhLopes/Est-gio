const express = require('express');
const rotas = express.Router();
const {conectar, oracledb} = require('../DAO/connection.js');

rotas.get('/prestadores', async function(req, res){
    let conn;

    try{
        conn = await conectar();

        let select = 'select * from hsspres';
        let prestadores = await conn.execute(select, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});

        res.status(200).json(prestadores.rows);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if(conn){
            await conn.close();
        }
    }
});

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
            res.redirect('/pacientes')
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