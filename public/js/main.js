const params = new URLSearchParams(window.location.search);
var apertado = 0;
retornarPacientes();


const nome = params.get('nome');

document.getElementById('teste').innerHTML = nome;


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

function fazerGet(url){
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function retornarPacientes(){
  let pacientes = fazerGet('http://localhost:3000/api/pacientes');
  pacientes = JSON.parse(pacientes);
  addLinhas(pacientes);
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
    divlista.setAttribute("class", 'col-ro');

    let a = document.createElement('a');
    a.setAttribute('href', '/lista_agend');

    let img = document.createElement('img');
    img.setAttribute("class", 'imgMenu');
    img.setAttribute("src", '/static/Group.png');
    img.setAttribute("id", 'img');

    a.append(img);
    divlista.append(a);

    let divagend = document.createElement('div');
    divagend.setAttribute("class", 'col-ro');

    let agend = document.createElement('a');
    agend.setAttribute('href', '/agendamento');

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