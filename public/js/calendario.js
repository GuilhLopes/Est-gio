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

function redirecionar(tipo){
  window.location = "/" + tipo;
}



document.addEventListener("DOMContentLoaded", function() {
  const prevMonthBtn = document.getElementById("prevMonthBtn");
  const nextMonthBtn = document.getElementById("nextMonthBtn");
  const currentMonthYear = document.getElementById("currentMonthYear");
  const calendarBody = document.getElementById("calendarBody");

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  renderCalendar(currentMonth, currentYear);

  prevMonthBtn.addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  function renderCalendar(month, year) {
    let data = new Date();
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Augosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    currentMonthYear.textContent = `${monthNames[month]} ${year}`;
    calendarBody.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day", "empty-day");
      calendarBody.appendChild(dayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if(i == data.getDate() && month == data.getMonth() && year == data.getFullYear()){
        const dayElement = document.createElement("button");
        dayElement.classList.add("diaAtual");
        dayElement.setAttribute('onclick',`agendar(${i}, ${month}, ${year})`)
        dayElement.textContent = i;
        calendarBody.appendChild(dayElement);

      }else{
        const dayElement = document.createElement("button");
        dayElement.classList.add("calendar-day-button");
        dayElement.setAttribute('onclick',`agendar(${i}, ${month}, ${year})`)
        dayElement.textContent = i;
        calendarBody.appendChild(dayElement);
      }
    }
  }
});

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
  document.getElementById('tel').innerHTML = `telefone: ${paciente[0]['CNUMETEL']}`;
  document.getElementById('email').innerHTML = `E-mail: ${paciente[0]['CEMAILPESS']}`;
}