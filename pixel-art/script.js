const container = document.querySelector(".container");
let color;
let isDown = false;

function generateUI() {
  for (let i = 0; i < 11; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("rid", i);
      cell.setAttribute("cid", j);

      if (i == 10) {
        const randomColor = generateRandomColor();
        cell.style.backgroundColor = randomColor;
      }
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

container.addEventListener("mousedown", runOnMouseDown);
container.addEventListener("mouseup", runOnMouseUp);

function runOnOver(e) {
  if (isDown) {
    const elem = e.target;
    console.log(elem);
    if (elem.getAttribute("rid") != 10 && color) {
      elem.style.backgroundColor = color;
    }
  }
}

function runOnMouseDown(e) {
  isDown = true;
  const elem = e.target;
  if (elem.getAttribute("rid") == 10) {
    color = elem.style.backgroundColor;
  } else if (color) {
    elem.style.backgroundColor = color;
    container.addEventListener("mouseover", runOnOver);
  }
}

function runOnMouseUp() {
  isDown = false;
  container.removeEventListener("mouseover", runOnOver);
}

generateUI();
