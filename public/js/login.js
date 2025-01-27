let loginForm = document.getElementById("loginForm");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let errorTextContainer = document.getElementById("errorTextContainer");
let showPassword = document.getElementById("showPassword");
let loginBtn = document.getElementById("loginBtn");

let isPasswordVisible = false;

const emailRegex =
  /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

let userData = {
  email: "",
  password: "",
};

const validateForm = () => {
  const isEmailValid = emailRegex.test(userData.email);
  const isPasswordValid = userData.password.length > 0;
  if (isEmailValid && isPasswordValid) {
    loginBtn.classList.remove("disabled");
  } else {
    loginBtn.classList.add("disabled");
  }
};

emailField.addEventListener("input", (e) => {
  console.log(e.target.value);
  let value = e.target.value;
  userData.email = value;

  if (emailRegex.test(value)) {
    emailField.classList.remove("error-state");
    errorTextContainer.style.display = "none";
  } else {
    emailField.classList.add("error-state");
    errorTextContainer.style.display = "flex";
  }

  validateForm();
});

passwordField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.password = value;

  validateForm();
});

showPassword.addEventListener("click", () => {
  isPasswordVisible = !isPasswordVisible;
  isPasswordVisible
    ? passwordField.setAttribute("type", "text")
    : passwordField.setAttribute("type", "password");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(userData);
});
