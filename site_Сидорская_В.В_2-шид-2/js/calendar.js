const baseSessions = [
  "9:30",
  "12:45",
  "15:00",
  "18:00",
  "20:30",
  "21:00",
  "22:15",
  "23:00"
];
const today = new Date();
const currentDate = today.toISOString().split("T")[0];
const months = [
  "ЯНВАРЯ",
  "ФЕВРАЛЯ",
  "МАРТА",
  "АПРЕЛЯ",
  "МАЯ",
  "ИЮНЯ",
  "ИЮЛЯ",
  "АВГУСТА",
  "СЕНТЯБРЯ",
  "ОКТЯБРЯ",
  "НОЯБРЯ",
  "ДЕКАБРЯ"
];
const sessionsStatus = {
  [currentDate]: {
    "9:30": 12,
    "12:45": 5,
    "15:00": 2,
    "18:00": 0,
    "20:30": 7,
    "21:00": 4,
    "22:15": 1,
    "23:00": 0
  },

  "2026-05-12": {
    "9:30": 8,
    "12:45": 0,
    "15:00": 1,
    "18:00": 0,
    "20:30": 3,
    "21:00": 2,
    "22:15": 0,
    "23:00": 5
  }
};
const sessionsContainer = document.getElementById("sessionsContainer");
const selectedDate = document.getElementById("selectedDate");
const ticketStatus = document.getElementById("ticketStatus");
selectedDate.textContent = `${today.getDate()} ${months[today.getMonth()]}`;


function renderSessions(date) {
  sessionsContainer.innerHTML = "";
  const currentData = sessionsStatus[date] || {};
  ticketStatus.textContent = "";

  baseSessions.forEach((time) => {
    const tickets = currentData[time] ?? 0;
    const btn = document.createElement("button");
    btn.classList.add("session-btn");
    btn.textContent = time;

    if (tickets === 0) {
      btn.classList.add("sold");
    }
    btn.addEventListener("click", () => {
      document.querySelectorAll(".session-btn").forEach(el =>el.classList.remove("active"));
      btn.classList.add("active");

      if (tickets === 0) {
        ticketStatus.textContent = "все билеты распроданы";
      } 
      else {
        ticketStatus.textContent = `доступно (${tickets} билетов)`;
      }
    });

    sessionsContainer.appendChild(btn);

  });
}


flatpickr("#calendar", {
  inline: true,
  locale: "ru",
  static: true,
  monthSelectorType: "static",
  defaultDate: currentDate,
  disable: [
    "2026-05-01",
    "2026-05-06",
    "2026-05-09"
  ],
  
  onChange: function(selectedDates,dateStr) {
    const date = new Date(dateStr);
    selectedDate.textContent =`${date.getDate()} ${months[date.getMonth()]}`;
    renderSessions(dateStr);
  }
});

renderSessions(currentDate);









