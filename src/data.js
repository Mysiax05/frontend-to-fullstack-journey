export const subjects = [
  "MOWNiT",
  "Systemy Operacyjne",
  "Teoria Automatów",
  "Technika Cyfrowa",
  "Bazy Danych",
  "Projektowanie Obiektowe",
  "JavaScript",
  "Rust",
];

export const students = ["Anna Nowak", "Jerzy Zmuda"];

if (localStorage.getItem("Anna Nowak - photo") === null) {
  localStorage.setItem("Anna Nowak - photo", "./src/assets/woman.png");
}

if (localStorage.getItem("Jerzy Zmuda - photo") === null) {
  localStorage.setItem("Jerzy Zmuda - photo", "./src/assets/man.png");
}
