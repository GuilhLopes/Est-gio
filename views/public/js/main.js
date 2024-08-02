var apertado = 0;

retornarPacientes();

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

function retornarPacientes(){
  let medico = document.getElementById('usuario').innerHTML;
  fazerPost('http://localhost:3000/api/pacienteMedico', {nome: medico}, function(paciente){
    addLinhas(paciente);
  }, true);
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

function addLinhas(pacientes){
  for (var i = 0; i < pacientes.length; i++){
    let divant = document.getElementById('tabela');
    
    let divnew = document.createElement('div');
    divnew.setAttribute("class", 'titen');

    let divnome = document.createElement('div');
    divnome.setAttribute("class", 'col-ro');
    divnome.innerHTML = pacientes[i]['CNOMEPESS'];

    let divemail = document.createElement('div');
    divemail.setAttribute("class", 'col-ro');
    divemail.innerHTML = pacientes[i]['CEMAILPESS'];

    /*Criando a div do telefone */
    let divtel = document.createElement('div');
    divtel.setAttribute("class", 'col-ro'); 
    divtel.innerHTML = formatarTel(pacientes[i]['CNUMETEL']);

    /*Criando a div da imagem do agendamento */
    let divlista = document.createElement('div');
    divlista.setAttribute("class", 'col-ro b-tabela');

    let b = document.createElement('button');
    b.setAttribute('class', 'calend');
    b.setAttribute('onclick', `redirecionar("lista_agend", ${pacientes[i]['NNUMEPESS']})`);

    let img = document.createElement('img');
    img.setAttribute("class", 'imgMenu');
    img.setAttribute("src", '/static/Group.png');
    img.setAttribute("id", 'img');

    b.append(img);
    divlista.append(b);

    let divagend = document.createElement('div');
    divagend.setAttribute("class", 'col-ro b-tabela');

    let agend = document.createElement('button');
    agend.setAttribute('class', 'calend');
    agend.setAttribute('onclick', `redirecionar("calendario", ${pacientes[i]['NNUMEPESS']})`);

    let imgagend = document.createElement('img')
    imgagend.setAttribute("class", 'imgMenu');
    imgagend.setAttribute("src", '/static/Group.png');
    imgagend.setAttribute("id", 'img');

    agend.append(imgagend);
    divagend.append(agend);

    divnew.append(divnome);
    divnew.append(divemail);
    divnew.append(divtel);
    divnew.append(divlista);
    divnew.append(divagend);
    
    divant.append(divnew);
  }
}



function formatarTel(tel){
  telddd = tel.slice(0,2);
  telaux1 = tel.slice(2,7);
  telaux2 = tel.slice(7,11);
  return '(' + telddd + ') ' + telaux1 + '-' + telaux2;
}

function redirecionar(tipo, id){
  if(id != undefined){
    localStorage.setItem('id', id)
    window.location = `/${tipo}`;
  }else{
    abrirErro()
  }
}

function abrirErro(){
  let modal = document.getElementById('modalerror');
  modal.style.display = 'block';
}

function fecharErro(){
  let modal = document.getElementById('modalerror');
  modal.style.display = 'none';
}
