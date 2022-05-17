let slider = document.querySelector(".slider");
let prev = document.querySelector(".left-handle");
let next = document.querySelector(".right-handle");
let indicator = document.querySelector(".indicator");

for (let i = 0; i < 100; i++) {
  let img = document.createElement("img");
  img.src = `https://via.placeholder.com/300x200?text=${i + 1}`;
  slider.appendChild(img);
}

let items = slider.children.length;

let scrolingValue = 0;
let screenNum = 0;
let numberOfScreens;
prev.addEventListener("click", slideLeft);
next.addEventListener("click", slideRight);

getNumberOfScreens(items, slider.children[0]);

for (let i = 0; i <= numberOfScreens; i++) {
  let div = document.createElement("div");
  div.className = "screen";
  div.setAttribute("data-screen", i);
  indicator.appendChild(div);
}

setScreen(screenNum);
clickOnIndictor();

window.onresize = function () {
  getNumberOfScreens(items, slider.children[0]);
};

function slideRight() {
  if (scrolingValue > -numberOfScreens * 100) {
    scrolingValue -= 100;
    slider.style.transform = `translateX(${scrolingValue}%)`;
    screenNum++;
    setScreen(screenNum);
  }
}

function slideLeft() {
  if (scrolingValue < 0) {
    scrolingValue += 100;
    slider.style.transform = `translateX(${scrolingValue}%)`;
    screenNum--;
    setScreen(screenNum);
  }
}

function setScreen(screenNum) {
  [...indicator.children].forEach((screen) => {
    screen.classList.remove("active");
  });
  console.log(indicator);
  console.log(indicator.children[screenNum]);
  indicator.children[screenNum].classList.add("active");
}

function clickOnIndictor() {
  [...indicator.children].forEach((screen) => {
    screen.addEventListener("click", (ev) => {
      screenNum = parseInt(ev.target.dataset.screen);
      scrolingValue = -screenNum * 100;
      slider.style.transform = `translateX(${scrolingValue}%)`;
      setScreen(screenNum);
    });
  });
}

function getNumberOfScreens(items, element) {
  let itemsPerScreen =
    getComputedStyle(element).getPropertyValue("--items-per-screen");
  numberOfScreens = Math.floor(items / itemsPerScreen);
  indicator.innerHTML = "";
  for (let i = 0; i <= numberOfScreens; i++) {
    let div = document.createElement("div");
    div.className = "screen";
    div.setAttribute("data-screen", i);
    indicator.appendChild(div);
  }
  clickOnIndictor();
}
