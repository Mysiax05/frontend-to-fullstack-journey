import { students, subjects } from "./data.js";

export function renderCards() {
  const container = document.getElementById("students-grid");
  container.replaceChildren();

  students.forEach((studentName) => {
    const card = document.createElement("div");

    const headerName = document.createElement("h1");
    headerName.textContent = studentName;

    const studentPhoto = document.createElement("img");
    studentPhoto.src = localStorage.getItem(`${studentName} - photo`);
    studentPhoto.alt = `Zdjęcie: ${studentName}`;

    const listContainer = document.createElement("div");

    const subjectsContainer = document.createElement("ul");
    subjects.forEach((subject) => {
      const subjectName = document.createElement("li");
      subjectName.textContent =
        subject + " " + localStorage.getItem(`${studentName} - ${subject}`);

      subjectsContainer.appendChild(subjectName);
    });

    listContainer.appendChild(subjectsContainer);

    card.appendChild(headerName);
    card.appendChild(studentPhoto);
    card.appendChild(listContainer);

    container.appendChild(card);
  });
}
