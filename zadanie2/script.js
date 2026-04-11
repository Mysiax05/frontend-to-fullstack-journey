function applyStyles() {
  const baseStyles = [
    {
      selector: "body",
      styles: {
        display: "grid",
        gridTemplateColumns: "420px 1fr",
        gridTemplateRows: "auto auto 1fr auto",
        gap: "12px",
        padding: "6px",
        boxSizing: "border-box",
      },
    },
    {
      selector: "header",
      styles: { gridColumn: "1 / -1", margin: "0", paddingLeft: "5px" },
    },
    { selector: "header h1", styles: { margin: "5px", fontSize: "36px" } },
    {
      selector: "nav",
      styles: {
        gridColumn: "1",
        gridRow: "2",
        justifySelf: "start",
        alignSelf: "start",
        margin: "0",
      },
    },
    {
      selector: "nav ul",
      styles: {
        width: "80px",
        padding: "20px 0 20px 40px",
        fontSize: "18px",
        margin: "0",
      },
    },
    {
      selector: "aside",
      styles: {
        gridColumn: "2",
        gridRow: "2 / 4",
        justifySelf: "end",
        alignSelf: "start",
        width: "500px",
        margin: "0",
      },
    },
    {
      selector: "aside h1",
      styles: { margin: "5px 0 0 10px", fontSize: "30px" },
    },
    {
      selector: "aside h2",
      styles: { margin: "0 0 0 10px", fontSize: "30px" },
    },
    {
      selector: "aside ul",
      styles: { margin: "20px 0 20px 0", fontSize: "18px" },
    },
    {
      selector: "main",
      styles: {
        gridColumn: "1",
        gridRow: "3",
        width: "400px",
        padding: "5px",
        margin: "0",
        alignSelf: "start",
      },
    },
    { selector: "main h1", styles: { margin: "5px", fontSize: "34px" } },
    {
      selector: "main blockquote",
      styles: { margin: "5px" },
    },
    {
      selector: "main p",
      isCollection: true,
      styles: { whiteSpace: "pre-line", fontSize: "16px" },
    },
    {
      selector: "footer",
      styles: {
        gridColumn: "1 / -1",
        margin: "0",
        padding: "5px",
        fontSize: "16px",
      },
    },
    {
      selector: ".azure",
      isCollection: true,
      styles: { backgroundColor: "aliceblue" },
    },

    {
      selector: ".border-shadow",
      isCollection: true,
      styles: { border: "1px solid black", boxShadow: "0 0 10px gray" },
    },
    {
      selector: ".buttons",
      isCollection: true,
      styles: {
        display: "flex",
        justifyContent: "space-evenly",
        margin: "10px",
      },
    },
  ];

  const applyConfig = (config) => {
    for (const item of config) {
      if (item.isCollection) {
        const elements = document.querySelectorAll(item.selector);
        for (const element of elements) {
          for (const property in item.styles) {
            element.style[property] = item.styles[property];
          }
        }
      } else {
        const element = document.querySelector(item.selector);
        if (element) {
          for (const property in item.styles) {
            element.style[property] = item.styles[property];
          }
        }
      }
    }
  };

  applyConfig(baseStyles);
}

const headerText = "Treść strony";

const textBlock1 = `Natenczas Wojski chwycił na taśmie przypięty 
Swój róg bawoli, długi,cętkowany, kręty 
Jak wąż boa, oburącz do ust go przycisnął, 
Wzdął policzki jak banię, w oczach krwią zabłysnął, 
Zasunął wpół powieki, wciągnął w głąb pół brzucha 
I do płuc wysłał z niego cały zapas ducha, 
I zagrał: róg jak wicher, wirowatym dechem 
Niesie w puszczę muzykę i podwaja echem.`;

const textBlock2 = `Umilkli strzelcy, stali szczwacze zadziwieni 
Mocą, czystością, dziwną harmoniją pieni. 
Starzec cały kunszt, którym niegdyś w lasach słynął, 
Jeszcze raz przed uszami myśliwców rozwinął; 
Napełnił wnet, ożywił knieje i dąbrowy, 
Jakby psiarnię w nie wpuścił i rozpoczął łowy.`;

const textBlock3 = `Bo w graniu była łowów historyja krótka: 
Zrazu odzew dźwięczący, rześki: to pobudka; 
Potem jęki po jękach skomlą: to psów granie; 
A gdzieniegdzie ton twardszy jak grzmot: to strzelanie.`;

const textContent = [headerText, textBlock1, textBlock2, textBlock3];

let counter = 0;

const delButton = document.getElementById("delButton");
const setButton = document.getElementById("setButton");
const addButton = document.getElementById("addButton");
const main = document.querySelector("main");

setButton.addEventListener("click", applyStyles);

addButton.addEventListener("click", () => {
  if (counter === 0) {
    const newH1 = document.createElement("h1");
    newH1.textContent = textContent[counter];
    main.appendChild(newH1);
  } else {
    let blockquote = document.querySelector("main blockquote");

    if (!blockquote) {
      blockquote = document.createElement("blockquote");
      blockquote.style.margin = "5px";
      main.appendChild(blockquote);
    }

    const newP = document.createElement("p");
    newP.textContent = textContent[counter];
    newP.style.whiteSpace = "pre-line";
    blockquote.appendChild(newP);
  }

  counter++;

  if (counter >= textContent.length) {
    addButton.disabled = true;
  }
});

delButton.addEventListener("click", () => {
  const body = document.querySelector("body");
  if (body) {
    body.removeAttribute("style");
  }

  const allElements = document.querySelectorAll("body *");

  allElements.forEach((element) => {
    element.removeAttribute("style");
  });
});
