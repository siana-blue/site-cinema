function toggleMenu() {
  const navBlock = document.querySelector("nav");
  const bodyBlock = document.querySelector("body");

  if (navBlock.classList.contains("menu-open")) {
    navBlock.classList.remove("menu-open");
    bodyBlock.style.overflowY = "";
  } else {
    navBlock.classList.add("menu-open");
    bodyBlock.style.overflowY = "hidden";
  }
}

function toggleMenuItem(menuItem) {
  if (menuItem.classList.contains("menu-open")) {
    menuItem.classList.remove("menu-open");
  } else {
    menuItem.classList.add("menu-open");
  }
}

const burgerBtn = document.getElementById("burger-menu");
burgerBtn.addEventListener("click", () => {
  toggleMenu();
});

const unfoldBtns = document.querySelectorAll("nav .unfold button");
const ulToUnfolds = document.querySelectorAll("nav .unfold button ~ ul");
const length = unfoldBtns.length;
if (length !== ulToUnfolds.length)
  throw new Error(
    "No ul match for every 'unfold' button (or the other way around TMTC)"
  );
for (let i = 0; i < length; i++) {
  const btn = unfoldBtns[i];
  const ul = ulToUnfolds[i];
  btn.addEventListener("click", () => {
    toggleMenuItem(ul);
  });
}
