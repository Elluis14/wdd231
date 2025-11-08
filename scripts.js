// array de cursos (puedes ajustarlo a los que te den en la clase)
const courses = [
  { id: 1, code: "WDD 130", name: "Web Fundamentals", credits: 2, subject: "wdd", taken: true },
  { id: 2, code: "WDD 231", name: "Frontend Dev I", credits: 3, subject: "wdd", taken: false },
  { id: 3, code: "WDD 232", name: "Frontend Dev II", credits: 3, subject: "wdd", taken: false },
  { id: 4, code: "CSE 110", name: "Intro to Programming", credits: 2, subject: "cse", taken: true },
  { id: 5, code: "CSE 210", name: "OOP Programming", credits: 3, subject: "cse", taken: false },
  { id: 6, code: "CIT 230", name: "Web Backend", credits: 3, subject: "cit", taken: false }
];

const coursesContainer = document.getElementById("courses-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalCreditsEl = document.getElementById("total-credits");

// render inicial
renderCourses(courses);
updateCredits(courses);

// filtro
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // activar botón
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    if (filter === "all") {
      renderCourses(courses);
      updateCredits(courses);
    } else {
      const filtered = courses.filter(c => c.subject === filter);
      renderCourses(filtered);
      updateCredits(filtered);
    }
  });
});

// toggle menu mobile
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");
menuBtn.addEventListener("click", () => {
  const isOpen = nav.style.display === "block";
  nav.style.display = isOpen ? "none" : "block";
});

// footer year + last modified
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

function renderCourses(list) {
  coursesContainer.innerHTML = "";
  list.forEach(course => {
    const card = document.createElement("article");
    card.className = "course-card";

    const header = document.createElement("div");
    header.className = "course-header";

    const title = document.createElement("h4");
    title.className = "course-title";
    title.textContent = course.code;

    const subject = document.createElement("span");
    subject.className = "badge subject";
    subject.textContent = course.subject.toUpperCase();

    header.appendChild(title);
    header.appendChild(subject);

    const name = document.createElement("p");
    name.textContent = course.name;

    const credits = document.createElement("p");
    credits.textContent = `Credits: ${course.credits}`;

    card.appendChild(header);
    card.appendChild(name);
    card.appendChild(credits);

    if (course.taken) {
      const taken = document.createElement("span");
      taken.className = "badge completed";
      taken.textContent = "Taken";
      card.appendChild(taken);
    }

    coursesContainer.appendChild(card);
  });
}

function updateCredits(list) {
  const total = list.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsEl.textContent = total;
}
