("use strict");

import "./style.css";
import { students, subjects } from "./data.js";
import { renderCards } from "./render.js";

const usosTabLink = document.getElementById("usos-tab-link");
const usosForm = document.getElementById("usos-form");

if (usosTabLink && usosForm) {
  usosTabLink.addEventListener("click", (event) => {
    event.preventDefault();
    usosForm.classList.toggle("hidden");
  });
}

const studentSelect = document.getElementById("student-select");
const subjectSelect = document.getElementById("subject-select");

if (studentSelect && subjectSelect) {
  students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student;
    option.textContent = student;
    studentSelect.appendChild(option);
  });

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });
}

if (usosForm) {
  usosForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const studentName = document.getElementById("student-select").value;
    const subject = document.getElementById("subject-select").value;
    const gradeInput = document.getElementById("grade-input");
    const grade = gradeInput.value.trim();

    if (!grade) {
      window.alert("Błąd: Proszę wpisać ocenę!");
      return;
    }

    localStorage.setItem(`${studentName} - ${subject}`, grade);

    gradeInput.value = "";

    renderCards();
  });
}
renderCards();
