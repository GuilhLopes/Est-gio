const params = new URLSearchParams(window.location.search);

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
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
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
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
      dayElement.textContent = i;
      calendarBody.appendChild(dayElement);
    }
  }
});
  