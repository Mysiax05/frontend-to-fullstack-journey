import { students, subjects } from "./data.js";

export function renderCards() {
  const container = document.getElementById("students-grid");
  container.replaceChildren();

  students.forEach((studentName) => {
    const card = document.createElement("div");
    card.className =
      "flex-1 min-w-[300px] border border-gray-300 rounded-xl shadow-md overflow-hidden bg-white";

    const header = document.createElement("div");
    header.className =
      "flex items-center gap-4 bg-blue-200 border-b border-gray-200 p-4";

    const studentPhoto = document.createElement("img");
    studentPhoto.src = localStorage.getItem(`${studentName} - photo`);
    studentPhoto.alt = `Zdjęcie: ${studentName}`;
    studentPhoto.className =
      "w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover bg-white";

    const headerName = document.createElement("h1");
    headerName.textContent = studentName;
    headerName.className = "text-xl font-bold text-gray-800";

    header.appendChild(studentPhoto);
    header.appendChild(headerName);

    const listContainer = document.createElement("div");
    listContainer.className = "p-4";

    const subjectsContainer = document.createElement("ul");
    subjectsContainer.className = "flex flex-col";

    subjects.forEach((subject) => {
      const subjectName = document.createElement("li");
      subjectName.textContent =
        subject + " " + localStorage.getItem(`${studentName} - ${subject}`);

      subjectName.className =
        "py-2 border-b border-gray-100 text-gray-700 text-sm last:border-none";

      subjectsContainer.appendChild(subjectName);
    });

    listContainer.appendChild(subjectsContainer);

    card.appendChild(header);
    card.appendChild(listContainer);

    container.appendChild(card);
  });
}
