const id = localStorage.getItem('id');
buscarPacientes();

const nome = document.getElementById('login').innerHTML;
buscarEndereco();
const data = localStorage.getItem('data');

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

function fazerPost(url, body, callback, json) {
  let request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.onreadystatechange = function() {
      if (request.readyState === 4){
        if(json){
          callback(JSON.parse(request.responseText));
        }else{
          callback(request.status);
        }
      }
  };
  
  request.send(JSON.stringify(body));
}

function gravarAgendamento(){
  let data = document.getElementById('data').value;
  let hora = document.getElementById('hora').value;
  let end = document.getElementById('endereco').value;
  let dados = {
    hora: hora,
    data: data,
    endereco: end
  }

  fazerPost('http://localhost:3000/api/agendamento', dados, function(agendamento){
    if(agendamento == 200){
      abrirSucesso()
    }else{
      abrirErro()
    }
  },false)

}

function abrirErro(){
  let modal = document.getElementById('modalerror');
  modal.style.display = 'block';
}

function abrirSucesso(){
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function fecharErro(){
  let modal = document.getElementById('modalerror');
  modal.style.display = 'none';
}

function buscarPacientes() {
  fazerPost('http://localhost:3000/api/paciente', {id:id}, function(pacientes) {
      alterarPaciente(pacientes);
  }, true);
}

function alterarPaciente(paciente){
  document.getElementById('nome').innerHTML = `Nome: ${paciente[0]['CNOMEPESS']}`;
  document.getElementById('tel').innerHTML = `Telefone: ${formatarTel(paciente[0]['CNUMETEL'])}`;
  document.getElementById('email').innerHTML = `E-mail: ${paciente[0]['CEMAILPESS']}`;
}

function formatarTel(tel){
  telddd = tel.slice(0,2);
  telaux1 = tel.slice(2,7);
  telaux2 = tel.slice(7,11);
  return '(' + telddd + ') ' + telaux1 + '-' + telaux2;
}

function buscarEndereco(){
  fazerPost('http://localhost:3000/api/endereco', {nome: nome}, function(endereco){
    inserirEndereco(endereco);
  }, true);
}

function inserirEndereco(endereco){
  for(let i = 0; i < endereco.length; i++){
    let option = document.createElement('option');
    option.setAttribute('value', endereco[i]['NNUMEEND']);
    option.text = `${endereco[i]['CDESCEND']} ${endereco[i]['CNUMEEND']}`;

    document.getElementById('endereco').add(option)
  }
}

function redirecionar(tipo){
  window.location = "/" + tipo;
}