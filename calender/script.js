const calender = document.querySelector(".calender");
const dates = document.querySelector(".dates");
const ptag = document.querySelector(".buttons p");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let current = new Date();

function getPadding(date) {
  const todayDate = date ? new Date(date) : new Date();
  const firstDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
  let lastDay = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth() + 1,
    0
  ).getDate();
  lastDay = Number(lastDay);
  const month = Number(todayDate.getMonth());
  const year = todayDate.getFullYear();

  ptag.innerText = month + 1 + "-" + year;

  let padding = weekDays.findIndex(
    (weekday) =>
      weekday == firstDay.toLocaleDateString("en-US", { weekday: "short" })
  );
  padding = Number(padding);

  return {padding, lastDay};
}

const {padding, lastDay} = getPadding();

function generateCalender(padding, lastDay, dates){
  for (let i = 0; i < lastDay + padding; i++) {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date");
  
    if (i < padding) {
      dates.appendChild(dateContainer);
    } else {
      dateContainer.innerText = i - padding + 1;
      dates.appendChild(dateContainer);
    }
  }
}

generateCalender(padding, lastDay, dates)

left.addEventListener("click", function () {
  current = new Date(new Date().setMonth(current.getMonth()-1))
  const {padding, lastDay} = getPadding(current);
  const dates = document.querySelector(".dates");
  removeAllChildNodes(dates)
  generateCalender(padding, lastDay, dates);
});

right.addEventListener("click", function () {
  current = new Date(new Date().setMonth(current.getMonth()+1))
  console.log(current);
  const {padding, lastDay} = getPadding(current);
  const dates = document.querySelector(".dates");
  removeAllChildNodes(dates);
  generateCalender(padding, lastDay, dates);
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}