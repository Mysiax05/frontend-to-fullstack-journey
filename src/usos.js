("use strict");

import "./style.css";
import { students, subjects } from "./data.js";
import { renderCards } from "./render.js";

function getParsedInput() {
  const rawText = document.forms["usosForm"].elements["basicInput"].value;
  return rawText.split(",").map((item) => item.trim());
}

function addDegree() {
  const parts = getParsedInput();

  if (parts.length < 3) {
    window.alert("Zły format! Wpisz: Imię Nazwisko, Ocena, Przedmiot");
    return;
  }

  const studentName = parts[0];
  const degree = parts[1];
  const subject = parts[2];

  if (!students.includes(studentName)) {
    window.alert(`Student ${studentName} nie istnieje w bazie!`);
    return;
  }
  if (!subjects.includes(subject)) {
    window.alert(`Przedmiot ${subject} nie istnieje!`);
    return;
  }

  const dbKey = `${studentName} - ${subject}`;
  localStorage.setItem(dbKey, degree);
  console.log(`Dodano ocenę ${degree} z ${subject} dla ${studentName}`);

  renderCards();
}

function deleteDegree() {
  const parts = getParsedInput();

  if (parts.length < 3) {
    window.alert("Zły format! Wpisz: Imię Nazwisko, Ocena, Przedmiot");
    return;
  }

  const studentName = parts[0];
  const subject = parts[2];
  const dbKey = `${studentName} - ${subject}`;

  if (localStorage.getItem(dbKey) === null) {
    window.alert(`Brak oceny do usunięcia dla ${studentName} z ${subject}`);
    return;
  }

  localStorage.removeItem(dbKey);
  console.log(`Usunięto ocenę dla ${studentName} z ${subject}`);

  renderCards();
}

function showResults() {
  const parts = getParsedInput();
  const studentName = parts[0];

  if (!studentName) {
    window.alert("Wpisz imię i nazwisko studenta, aby wyświetlić oceny.");
    return;
  }

  console.log(`Oceny studenta: ${studentName}`);
  let hasGrades = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith(studentName)) {
      const grade = localStorage.getItem(key);
      console.log(`${key}: ${grade}`);
      hasGrades = true;
    }
  }

  if (!hasGrades) {
    console.log("Ten student nie ma jeszcze żadnych ocen.");
  }
}

window.addDegree = addDegree;
window.deleteDegree = deleteDegree;
window.showResults = showResults;

renderCards();
