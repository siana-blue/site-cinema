function readCookie(cookieName) {
  const cookiesList = document.cookie.split(";");
  for (let i = 0; i < cookiesList.length; i++) {
    const cookieParts = cookiesList[i].split("=");
    if (cookieParts[0] === cookieName) {
      return cookieParts[1];
    }
  }
  return null;
}

// Gestion du token d'authentification

const authLink = document.getElementById("auth-link");
const navBar = document.querySelector("nav ul");
let adminLi = null;

function logOut() {
  document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function loggedDisplay() {
  authLink.innerText = "Déconnexion";
  authLink.href = "/";
  authLink.addEventListener("click", logOut);

  adminLi = document.createElement("li");
  adminLi.style.backgroundColor = "blue";
  const aAdmin = document.createElement("a");
  aAdmin.href = "/movies";
  aAdmin.innerText = "Admin";
  adminLi.appendChild(aAdmin);
  navBar.insertBefore(adminLi, navBar.lastChild);
}

const jwtToken = readCookie("jwtToken");
if (jwtToken) loggedDisplay();

// Mise en page générale

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

// Mise à jour des semaines suivantes (liens du menu)

const nextweeksItems = document.querySelectorAll("#next-weeks-list li a");
fetch("/db/utils/weeks")
  .then((res) => res.json())
  .then((result) => {
    for (let i = 1; i < result.length; i++) {
      nextweeksItems[i - 1].innerText = result[i];
    }
  });
