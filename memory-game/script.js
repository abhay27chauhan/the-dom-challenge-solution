const row = document.querySelector(".row");
const cell = document.querySelector(".cell");
const button = document.querySelector("button");
const heading = document.querySelector("h1");

let count = 1;
const children = row.children;
const maxCount = children.length;
let indexToBlink = [];
let resultArr = [];
let score = 0;

heading.innerText = `Score: ${score}`;

function fillIndexToBlink() {
  while (indexToBlink.length != count) {
    const index = Math.floor(Math.random() * maxCount);
    if (!indexToBlink.includes(index)) {
      indexToBlink.push(index);
    }
    console.log(indexToBlink);
  }
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function serialBlinking(index, randomColor) {
  if (index >= indexToBlink.length) {
    return;
  }
  const elem = children[indexToBlink[index]];

  setTimeout(() => {
    elem.style.backgroundColor = randomColor;
    setTimeout(() => {
      elem.style.backgroundColor = "gray";
      serialBlinking(index + 1, randomColor);
    }, 200);
  }, 200);
}

row.addEventListener("click", runOnClick);
button.addEventListener("click", startGame);

function startGame() {
  heading.innerText = `Score: ${score}`;
  fillIndexToBlink();
  const randomColor = generateRandomColor();
  serialBlinking(0, randomColor);
}

function runOnClick(e) {
  resultArr.push(Number(e.target.getAttribute("cid")));
  console.log(resultArr, indexToBlink);
  if (resultArr.length == indexToBlink.length) {
    if (JSON.stringify(resultArr) == JSON.stringify(indexToBlink)) {
      resultArr = [];
      count = count < maxCount ? count + 1 : count;
      indexToBlink = [];
      score++;
      startGame();
    } else {
      score = 0;
      indexToBlink = [];
      resultArr = [];
      count = 1;
      row.classList.add("shake");
      setTimeout(() => row.classList.remove("shake"), 1500);
      heading.innerText = `Score: ${score}`;
    }
  }
}
