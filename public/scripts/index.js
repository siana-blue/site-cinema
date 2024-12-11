// Gestion du token d'authentification

const authLink = document.getElementById("auth-link");

function logOut() {
  sessionStorage.removeItem("loggedIn");
  localStorage.removeItem("jwtToken");

  authLink.innerText = "Connexion";
  authLink.href = "/auth";
  authLink.removeEventListener("click", logOut);
}

function loggedDisplay() {
  authLink.innerText = "Déconnexion";
  authLink.href = "";
  authLink.addEventListener("click", logOut);
}

// Vérifie si un token est présent en localStorage
// Puis si l'utilisateur est déjà connecté via la variable de session
// si la session est vide, revérification du token qui a peut-être expiré
// s'il n'a pas expiré et est bien valide, la variable de session est réactivée
// S'il y a la moindre incohérence ou token expiré, le localStorage
// et le sessionStorage sont effacés pour redemander une connexion.
const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
  if (isLoggedIn) {
    loggedDisplay();
  } else {
    fetch("/auth/jwt?jwt=" + jwtToken).then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("loggedIn", "true");
        loggedDisplay();
      } else {
        logOut();
      }
    });
  }
}

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
