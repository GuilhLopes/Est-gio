const params = new URLSearchParams(window.location.search);
var apertado = 0;

const nome = params.get('nome');  
document.getElementById('teste').innerHTML =  nome;


function abrir(){
  document.getElementById('iten').style.border = '1px solid black';
  document.getElementById('iten').style.width = '250px';
  document.getElementById('iten').setAttribute('onmouseout', 'fechar()');
}

function fechar(){
  document.getElementById('iten').style.width = '0px';
  document.getElementById('iten').style.border = '';
  document.getElementById('iten').setAttribute('onmouseout', 'abrir()')
}

function redirecionar(tipo){
  window.location = "/" + tipo + "?nome=" + nome;
}
