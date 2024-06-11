const id = localStorage.getItem('id');
const idagend = localStorage.getItem('idagend');
buscarPacientes();
buscarAgendamento();
let idend = 0;

const nome = document.getElementById('login').innerHTML;
buscarEndereco();
const data = localStorage.getItem('data');
console.log(data);

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

function buscarAgendamento(){
    fazerPost('http://localhost:3000/api/buscar_agendamento',{id: idagend}, function(agendamento){
        carregarAgend(agendamento)
    },true)
}

function carregarAgend(agend){
    document.getElementById('id').value = idagend;
    document.getElementById('data').value = agend[0]['DATA'];
    console.log(agend[0]['HORA'].slice(0,5))
    document.getElementById('hora').value = agend[0]['HORA'].slice(0,5);
    idend = agend[0]['NNUMEEND']
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
    if(endereco[i]['NNUMEEND'] == idend){
        option.setAttribute('value', endereco[i]['NNUMEEND']);
        option.selected = true;
        option.text = `${endereco[i]['CDESCEND']} ${endereco[i]['CNUMEEND']}`;
    }else{
        option.setAttribute('value', endereco[i]['NNUMEEND']);
        option.text = `${endereco[i]['CDESCEND']} ${endereco[i]['CNUMEEND']}`;
    }

    document.getElementById('endereco').add(option)
  }
}

function redirecionar(tipo){
  window.location = "/" + tipo;
}


function EditarAgendamento(){
  let id = document.getElementById('id').value;
  let data = document.getElementById('data').value;
  let hora = document.getElementById('hora').value;
  let end = document.getElementById('endereco').value;
  let dados = {
    id: id,
    hora: hora,
    data: data,
    endereco: end
  }

  fazerPost('http://localhost:3000/api/edit_agendamento', dados, function(agendamento){
    if(agendamento == 200){
      abrirSucesso()
    }else{
      abrirErro()
    }
  },false)

}

function abrirSucesso(){
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function abrirErro(){
  let modal = document.getElementById('modalerror');
  modal.style.display = 'block';
}

function fecharErro(){
  let modal = document.getElementById('modalerror');
  modal.style.display = 'none';
}

function abrirEsucesso(){
  let modal = document.getElementById('modalexsucesso');
  modal.style.display = 'block';
}

function abrirEerro(){
  let modal = document.getElementById('modaleerro');
  modal.style.display = 'block';
}

function fecharEerro(){
  let modal = document.getElementById('modaleerro');
  modal.style.display = 'none';
}

function excluirAgendamento(){
  let id = document.getElementById('id').value;
  fazerPost('http://localhost:3000/api/inativar_agendamento', {id:id}, function(resposta){
    if(resposta == 200){
      abrirEsucesso()
    }else{
      abrirEerro()
    }
  },false)
}

function abrirExcluir(){
  let modal = document.getElementById('modalexcluir')
  modal.style.display = 'block';
}

function fecharExcluir(){
  let modal = document.getElementById('modalexcluir')
  modal.style.display = 'none';
}