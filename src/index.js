const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const apirotas = require('./rotas/rotasApi.js');
const rotasfront = require('./rotas/rotasFront.js');

const port = 3000;
var path = require('path');
const app = express();

app.use(session({secret:'2h1vbjwbqndj2b1i4k1n4'}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));

app.use('/api', apirotas);
app.use('/', rotasfront);

app.listen(port, ()=>{
    console.log('Site está rodando na porta 3000!');
});