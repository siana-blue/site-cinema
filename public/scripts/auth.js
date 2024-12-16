const loginForm = document.getElementById("login-form");
const loginInput = document.getElementById("login-input");
const passwordInput = document.getElementById("password-input");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const errorMsg = document.getElementById("error-message");
  errorMsg.innerText = "";

  fetch(
    `/auth/jwt?login=${loginInput.value}&password=${passwordInput.value}`
  ).then((res) => {
    if (res.status !== 200) {
      errorMsg.innerText = "Connexion impossible";
    } else {
      const token = res.headers.get("Authorization").split(" ")[1];
      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      document.cookie =
        "jwtToken=" + token + "; expires=" + expireDate + "; path=/";

      window.location.replace("/");
    }
  });
});
