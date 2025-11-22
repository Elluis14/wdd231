// FOOTER DATES
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// NAVIGATION
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");

menuBtn?.addEventListener("click", () => {
  const open = nav.style.display === "block";
  nav.style.display = open ? "none" : "block";
  menuBtn.setAttribute("aria-expanded", String(!open));
});

/* ======================
   WEATHER API
====================== */

// Tu API key
const OWM_API_KEY = "097b388ad87bd34c6dcd3f5dcf7f6a27";

// Ciudad
const CITY = "San Miguel,SV";

// Fahrenheit
const UNITS = "imperial";

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function renderWeather(container, w) {
  const temp = Math.round(w.main.temp);
  const desc = w.weather[0].description;
  const icon = w.weather[0].icon;

  container.innerHTML += `
    <div class="row">
      <div class="card">
        <strong>Now</strong><br>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <div><strong>${temp}°F</strong></div>
        <div>${desc}</div>
      </div>
    </div>
  `;
}

function pick3Days(list) {
  const days = {};
  list.forEach(i => {
    const d = new Date(i.dt * 1000);
    const dayKey = d.toISOString().slice(0,10);
    const hour = d.getHours();
    const diff = Math.abs(12 - hour);
    if (!days[dayKey] || diff < days[dayKey].diff) {
      days[dayKey] = { diff, item: i };
    }
  });

  return Object.values(days).slice(1,4).map(d => d.item);
}

function renderForecast(container, items) {
  const row = document.createElement("div");
  row.className = "row";

  items.forEach(d => {
    const date = new Date(d.dt * 1000);
    const label = date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    const temp = Math.round(d.main.temp);
    const desc = d.weather[0].description;
    const icon = d.weather[0].icon;

    row.innerHTML += `
      <div class="card">
        <strong>${label}</strong><br>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
        <div><strong>${temp}°F</strong></div>
        <div>${desc}</div>
      </div>
    `;
  });

  container.appendChild(row);
}

async function loadWeather() {
  const box = document.getElementById("weather");

  try {
    const current = await getJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OWM_API_KEY}&units=${UNITS}`
    );

    box.innerHTML = "";
    renderWeather(box, current);

    const forecast = await getJSON(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${OWM_API_KEY}&units=${UNITS}`
    );

    const days = pick3Days(forecast.list);
    renderForecast(box, days);

  } catch (err) {
    console.error(err);
    box.innerHTML = `<p class="muted">Weather unavailable.</p>`;
  }
}

loadWeather();

/* ======================
   SPOTLIGHT
====================== */

async function loadSpotlight() {
  const data = await getJSON("members.json");
  const members = data.members;

  const goldSilver = members.filter(m =>
    /^(gold|silver)$/i.test(m.membership)
  );

  const shuffled = goldSilver.sort(() => Math.random() - 0.5);
  const pickCount = Math.floor(Math.random() * 2) + 2; // 2 o 3
  const picks = shuffled.slice(0, pickCount);

  const box = document.getElementById("spotlight");
  box.innerHTML = "";

  picks.forEach(m => {
    box.innerHTML += `
      <article>
        <img src="${m.image}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p><a href="${m.website}" target="_blank">Website</a></p>
        <p><strong>${m.membership}</strong> Member</p>
      </article>
    `;
  });
}

loadSpotlight();
