var nome = 'Gustavo';
var apertado = 0;

document.getElementById('teste').innerHTML = 'Logado como: ' + nome;


function abrir(){
  document.getElementById('iten').style.border = '1px solid black';
  document.getElementById('iten').style.width = '250px';
  document.getElementById('img').setAttribute('onclick', 'fechar()');

}

function fechar(){
  document.getElementById('iten').style.width = '0px';
  document.getElementById('iten').style.border = '';
  document.getElementById('img').setAttribute('onclick', 'abrir()');
}

function addPacientes(){
  document.getElementById('tabela').append
}