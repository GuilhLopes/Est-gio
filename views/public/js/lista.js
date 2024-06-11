var apertado = 0;
const params = new URLSearchParams(window.location.search);

const id = localStorage.getItem('id');

buscarPacientes();
buscarAgendamento();

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

function buscarAgendamento(){
  fazerPost('http://localhost:3000/api/listar_agendamentos',{id: id},function(agendamentos){
    listar_agendamentos(agendamentos);
  })
};

function listar_agendamentos(agendamentos){
  for(var i = 0; i < agendamentos.length; i++){
    let [data, hora] = formatarhora(agendamentos[i])
    let tabela = document.getElementById('tabela');

    let divitens = document.createElement('div');
    divitens.setAttribute('class', 'titen');

    let divdata = document.createElement('div');
    divdata.setAttribute('class', 'col-ro');
    divdata.innerHTML = data;

    let divhora = document.createElement('div');
    divhora.setAttribute('class', 'col-ro');
    divhora.innerHTML = hora;

    let divend = document.createElement('div');
    divend.setAttribute('class', 'col-ro');
    divend.innerHTML = `${agendamentos[i]['CDESCEND']} ${agendamentos[i]['CNUMEEND']}`;

    let divagend = document.createElement('div');
    divagend.setAttribute("class", 'col-ro');

    let agend = document.createElement('button');
    agend.setAttribute('class', 'calend');
    agend.setAttribute('onclick', `editagend(${agendamentos[i]['NNUMEAGEND']})`);

    let imgagend = document.createElement('img')
    imgagend.setAttribute("class", 'imgMenu');
    imgagend.setAttribute("src", '/static/Group.png');
    imgagend.setAttribute("id", 'img');
    
    agend.append(imgagend);
    divagend.append(agend);

    divitens.append(divdata);
    divitens.append(divhora);
    divitens.append(divend);
    divitens.append(divagend);

    tabela.append(divitens);
  }
}

async function editagend(id){
  localStorage.idagend = id;
  window.location = '/edit_agend';
}

function formatarhora(datac){
  let data = datac['DATA'].slice(0,10);
  let hora = datac['DATA'].slice(11,19);

  return [data, hora];
}

function buscarPacientes() {
  fazerPost('http://localhost:3000/api/paciente', {id:id}, function(pacientes) {
      alterarPaciente(pacientes);
  });
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

function redirecionar(tipo){
  window.location = `/${tipo}`;
}
