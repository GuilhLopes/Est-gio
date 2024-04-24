const oracledb  = require('oracledb');

const dbconfig = {
    user: 'SENTINELA',
    password: 'Guibaby34',
    connectString: 'localhost:1521/XEPDB1'
};

async function conectar(){
    let connection = await oracledb.getConnection(dbconfig);

    console.log('conexão com o banco efetuada!!');

    return connection
}

module.exports = {
    conectar, oracledb
};