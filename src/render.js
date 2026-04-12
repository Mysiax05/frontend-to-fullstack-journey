import { students, subjects } from "./data.js";

export function renderCards() {
  const container = document.getElementById("students-grid");
  container.replaceChildren();

  students.forEach((studentName) => {
    const card = document.createElement("div");

    const header = document.createElement("div");
    header.className = "flex items-center gap-4 border-b border-gray-200 p-4";

    const studentPhoto = document.createElement("img");
    studentPhoto.src =
      localStorage.getItem(`${studentName} - photo`) || "./src/assets/man.png";
    studentPhoto.alt = `Zdjęcie: ${studentName}`;
    studentPhoto.className =
      "w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover bg-gray";

    const headerName = document.createElement("h1");
    headerName.textContent = studentName;
    headerName.className = "text-xl font-bold text-gray-800";

    header.appendChild(studentPhoto);
    header.appendChild(headerName);

    const listContainer = document.createElement("div");
    listContainer.className = "p-4";

    const subjectsContainer = document.createElement("ul");
    subjectsContainer.className = "flex flex-col";

    let hasGrades = false;

    subjects.forEach((subject) => {
      const grade = localStorage.getItem(`${studentName} - ${subject}`);

      if (grade !== null) {
        hasGrades = true;

        const subjectName = document.createElement("li");
        subjectName.className =
          "flex justify-between items-center py-3 border-b border-gray-100 text-sm last:border-none";

        const subjectTitle = document.createElement("span");
        subjectTitle.className = "font-bold text-gray-800";
        subjectTitle.textContent = subject;

        const gradeSpan = document.createElement("span");
        gradeSpan.textContent = grade;

        if (grade === "2") {
          gradeSpan.className =
            "font-bold text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full cursor-pointer transition-colors";
        } else {
          gradeSpan.className =
            "font-bold text-green-600 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-full cursor-pointer transition-colors";
        }

        gradeSpan.addEventListener("click", () => {
          const isConfirmed = window.confirm(
            `Czy na pewno chcesz usunąć ocenę studenta ${studentName} z przedmiotu ${subject}?`,
          );

          if (isConfirmed) {
            localStorage.removeItem(`${studentName} - ${subject}`);
            renderCards();
          }
        });

        subjectName.appendChild(subjectTitle);
        subjectName.appendChild(gradeSpan);
        subjectsContainer.appendChild(subjectName);
      }
    });

    if (hasGrades) {
      card.className =
        "flex-1 min-w-[300px] border border-gray-300 rounded-xl shadow-md overflow-hidden transition-colors duration-300 bg-white";
      header.classList.add("bg-blue-200");
      listContainer.appendChild(subjectsContainer);
    } else {
      card.className =
        "flex-1 min-w-[300px] border border-gray-300 rounded-xl shadow-md overflow-hidden transition-colors duration-300 bg-gray-100";
      header.classList.add("bg-gray-200");

      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "Brak przypisanych przedmiotów";
      emptyMessage.className = "text-sm text-gray-500 italic text-center py-2";
      listContainer.appendChild(emptyMessage);
    }

    card.appendChild(header);
    card.appendChild(listContainer);

    container.appendChild(card);
  });
}
