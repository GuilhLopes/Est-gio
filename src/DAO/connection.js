const oracledb  = require('oracledb');

const dbconfig = {
    user: 'SENTINELA',
    password: 'Guibaby34',
    connectString: 'localhost:1521/XEPDB1'
};

async function conectar(){
    let connection = await oracledb.getConnection(dbconfig);
    return connection
}

module.exports = {
    conectar, oracledb
};