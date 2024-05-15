const id = localStorage.getItem('id');
buscarPacientes();

const data = localStorage.getItem('data');

console.log(data)

document.getElementById('data').value = data;


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

function fazerGet(url){
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function fazerPost(url, body, callback) {
  let request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
          callback(JSON.parse(request.responseText));
      }
  };
  
  request.send(JSON.stringify(body));
}

function buscarPacientes() {
  fazerPost('http://localhost:3000/api/paciente', {id:id}, function(pacientes) {
      alterarPaciente(pacientes);
  });
}

function alterarPaciente(paciente){
  document.getElementById('nome').innerHTML = `Nome: ${paciente[0]['CNOMEPESS']}`;
  document.getElementById('tel').innerHTML = `Telefone: ${paciente[0]['CNUMETEL']}`;
  document.getElementById('email').innerHTML = `E-mail: ${paciente[0]['CEMAILPESS']}`;
}

function redirecionar(tipo){
  window.location = "/" + tipo;
}