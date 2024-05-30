const id = localStorage.getItem('id');

buscarPacientes();

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



var idagend = 0;

document.addEventListener("DOMContentLoaded", async function() {
  const prevMonthBtn = document.getElementById("prevMonthBtn");
  const nextMonthBtn = document.getElementById("nextMonthBtn");
  const currentMonthYear = document.getElementById("currentMonthYear");
  const calendarBody = document.getElementById("calendarBody");
  
  let dias = await buscarAgendamento();

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  
  carregarCalendario(currentMonth, currentYear, dias);

  prevMonthBtn.addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    carregarCalendario(currentMonth, currentYear, dias);
  });

  nextMonthBtn.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    carregarCalendario(currentMonth, currentYear, dias);
  });

  function carregarCalendario(month, year, diasAgend) {
    let data = new Date();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    currentMonthYear.textContent = `${monthNames[month - 1]} ${year}`;
    calendarBody.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day", "empty-day");
      calendarBody.appendChild(dayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      let dayStr = i < 10 ? `0${i}` : `${i}`;
      let monthStr = month < 10 ? `0${month}` : `${month}`;
      let strd = `${dayStr}/${monthStr}/${year}`;

      const dayElement = document.createElement("button");
      dayElement.textContent = i;

      if (verificarDia(diasAgend, strd)) {
        dayElement.classList.add("diaAgend");
        dayElement.setAttribute('onclick', `editagend(${idagend})`);
      } else if (i < data.getDate() && month <= (data.getMonth() + 1) && year <= data.getFullYear()) {
        dayElement.classList.add("calendar-day-button");
        dayElement.setAttribute('onclick', `abrirModal()`);
      } else if (i == data.getDate() && month == (data.getMonth() + 1) && year == data.getFullYear()) {
        dayElement.classList.add("diaAtual");
        dayElement.setAttribute('onclick', `agendar(${i}, ${month}, ${year})`);
      } else {
        dayElement.classList.add("calendar-day-button");
        dayElement.setAttribute('onclick  ', `agendar(${i}, ${month}, ${year})`);
      }

      calendarBody.appendChild(dayElement);
    }
}
})

function verificarDia(dataA, dia) {
  if(dataA){
    for (let item of dataA) {
        if (item[0] === dia) {
            idagend = item[1]
            return true;
        }
    }
  }
  return false;
}

function agendar(d,m,y){
  let dia = formatarData(d);
  let mes = formatarData(m);
  localStorage.setItem('data', `${dia}/${mes}/${y}`)
  window.location = "/agendamento";
}

function formatarData(d){
  let numero = '';
  if(d < 10){
    numero = '0' + d;
  }else{
    numero = d;
  }
  return numero;
}

function fazerGet(url){
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function fazerPost(url, body) {
  return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', url);
      request.setRequestHeader('Content-Type', 'application/json');

      request.onreadystatechange = function() {
          if (request.readyState === 4) {
              if (request.status === 200) {
                  resolve(JSON.parse(request.responseText));
              } else {
                  resolve(request.status);
              }
          }
      };

      request.send(JSON.stringify(body));
  });
}


async function buscarAgendamento(){
  const agendamentos = await fazerPost('http://localhost:3000/api/listar_agendamentos',{id: id});
  if(agendamentos == 404){
    return false;
  }else{
    let datas = [];
    for(let i = 0; i < agendamentos.length; i++){
      let [data, hora] = formatarhora(agendamentos[i]);
      let id = agendamentos[i]['NNUMEAGEND'];
      datas.push([data, id]);
    }
    return datas;
  }
};

function formatarhora(datac){
  let data = datac['DATA'].slice(0,10);
  let hora = datac['DATA'].slice(11,19);

  return [data, hora];
}

async function buscarPacientes() {
  const pacientes = await fazerPost('http://localhost:3000/api/paciente', {id:id});
  alterarPaciente(pacientes);
}

function alterarPaciente(paciente){
  document.getElementById('nome').innerHTML = `Nome: ${paciente[0]['CNOMEPESS']}`;
  document.getElementById('tel').innerHTML = `Telefone: ${formatarTel(paciente[0]['CNUMETEL'])}`;
  document.getElementById('email').innerHTML = `E-mail: ${paciente[0]['CEMAILPESS']}`;
}

async function editagend(id){
  localStorage.idagend = id;
  window.location = '/edit_agend';
}

function formatarTel(tel){
  telddd = tel.slice(0,2);
  telaux1 = tel.slice(2,7);
  telaux2 = tel.slice(7,11);
  return '(' + telddd + ') ' + telaux1 + '-' + telaux2;
}

function redirecionar(tipo){
  window.location = "/" + tipo;
}

function abrirModal(){
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function fecharModal(){
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
}