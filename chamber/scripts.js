// Fecha dinámica en el footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Nav responsive
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");
menuBtn.addEventListener("click", () => {
  nav.style.display = nav.style.display === "block" ? "none" : "block";
});

// Async/Await para leer JSON
async function loadMembers() {
  const response = await fetch("members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  const container = document.getElementById("members-container");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p><strong>Level:</strong> ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

// Toggle entre grid/list
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const membersContainer = document.getElementById("members-container");

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.remove("grid");
  membersContainer.classList.add("list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

// Cargar datos al iniciar
loadMembers();
