const container = document.querySelector(".container");
const heading = document.querySelector("h1");

function randomColorGenerator(rnc) {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let row = Math.floor(Math.random() * rnc);
  let col = Math.floor(Math.random() * rnc);

  const color = `rgb(${red}, ${green}, ${blue})`;
  const oddColor = `rgba(${red}, ${green}, ${blue}, 0.8)`;

  return {
    color,
    oddColor,
    row,
    col,
  };
}

let rnc = 4;
let score = 0;
let color;
let oddColor;

heading.innerText = `Score: ${score}`;

function generateUI(rnc) {
  const { row, col, ...rest } = randomColorGenerator(rnc);
  color = rest.color;
  oddColor = rest.oddColor;

  for (let i = 0; i < rnc; i++) {
    const rowElem = document.createElement("div");
    rowElem.classList.add("row");

    for (let j = 0; j < rnc; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (i == row && j == col) {
        cell.setAttribute("cid", oddColor);
        cell.style.backgroundColor = oddColor;
      } else {
        cell.setAttribute("cid", color);
        cell.style.backgroundColor = color;
      }
      rowElem.appendChild(cell);
    }

    container.appendChild(rowElem);
  }
}

generateUI(rnc);

container.addEventListener("click", runOnClick);

function runOnClick(e) {
  const bgColor = e.target.getAttribute("cid");
  const container = document.querySelector(".container");
  if (bgColor == oddColor) {
    rnc++;
    score++;
    heading.innerText = `Score: ${score}`;
    removeAllChildNodes(container);
    generateUI(rnc);
  } else {
    rnc = 4;
    score = 0;
    container.classList.add("shake");
    setTimeout(() => {
      container.classList.remove("shake");
      removeAllChildNodes(container);
      generateUI(rnc);
    }, 2000);
    heading.innerText = `Score: ${score}`;
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
