import { countries } from "./countries.js";

const signUpForm = document.querySelector("#signUpForm");

const usernameField = document.getElementById("usernameField");
const passwordField = document.getElementById("password");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const passwordContainerEl = document.getElementById('passwordContainer')
const tooltipWrapper = document.getElementById('tooltipWrapper')

const dropdownToggle = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownItemText = document.getElementById("dropdownItemText");
const dropdownItemImg = document.getElementById("dropdownItemImg");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownContainer = document.querySelector(".dropdown-container");

let isPasswordVisible = false;
let userData = {
  name: "",
  password: "",
  email: "",
  phone: "",
  countryCode: "+91",
};
let isPasswordValid = false

usernameField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.name = value;

  if (value) {
    usernameField.classList.remove("error-state");
  } else {
    usernameField.classList.add("error-state");
  }
  console.log(userData);
});

emailField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.email = value;

  const emailRegex =
    /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (emailRegex.test(value)) {
    emailField.classList.remove("error-state");
  } else {
    emailField.classList.add("error-state");
  }
});

phoneField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.phone = value;

  const phonePattern = /^\+?[1-9]\d{1,14}$/;
  const isValidPhone = phonePattern.test(value);

  if (!isValidPhone) {
    phoneField.classList.add("error-state");
  } else {
    phoneField.classList.remove("error-state");
  }
});

showPassword.addEventListener("click", () => {
  isPasswordVisible = !isPasswordVisible;
  isPasswordVisible
    ? passwordField.setAttribute("type", "text")
    : passwordField.setAttribute("type", "password");
});

passwordField.addEventListener("input", (e) => {
  const password = e.target.value;
  userData.password = password;

  console.log(userData);

  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  updateValidation("length", isLengthValid);
  updateValidation("uppercase", hasUppercase);
  updateValidation("special", hasSpecial);
  updateValidation("number", hasNumber);

  if (isLengthValid && hasUppercase && hasNumber && hasSpecial) {
    passwordContainerEl.classList.remove("error-state");
    tooltipWrapper.style.display = 'none'
    isPasswordValid = true
    // console.log('tooltip');
  } else {
    tooltipWrapper.style.display = 'block'
    passwordContainerEl.classList.add("error-state");
    isPasswordValid = false
  }
});

passwordField.addEventListener('focus', () => {
  if (!isPasswordValid){
    tooltipWrapper.style.display = 'block';  
  }
});

passwordField.addEventListener('blur', () => {
  // if (isPasswordValid){
    tooltipWrapper.style.display = 'none';  
  // }
});

function updateValidation(id, isValid) {
  const validationElement = document.getElementById(id);
  const imgElement = validationElement.querySelector("img");
  // console.log(imgElement);

  if (isValid) {
    validationElement.classList.remove("invalid");
    validationElement.classList.add("valid");
    imgElement.src = "./assets/tick-circle.png";
  } else {
    validationElement.classList.remove("valid");
    validationElement.classList.add("invalid");
    imgElement.src = "./assets/close-circle.png";
  }
}

dropdownToggle.addEventListener("click", function () {
  if (
    dropdownMenu.style.display === "none" ||
    dropdownMenu.style.display === ""
  ) {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});

function generateDropdownItems() {
  countries.forEach((country) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");

    //   item.dataset.id = country._id;
    const itemImg = document.createElement("img");
    itemImg.src = country.flag;
    itemImg.alt = `${country.name} flag`;
    itemImg.classList.add("dropdown-item-img");

    item.appendChild(itemImg);

    const countryName = document.createElement("span");
    countryName.textContent = country.name;
    countryName.classList.add("dropdown-item-name");
    item.appendChild(countryName);

    const countryCode = document.createElement("span");
    countryCode.textContent = country.phone;
    countryCode.classList.add("dropdown-item-phone");
    item.appendChild(countryCode);

    dropdownMenu.appendChild(item);

    item.addEventListener("click", function () {
      console.log(country);
      dropdownItemText.textContent = country.phone;
      dropdownItemImg.src = country.flag;
      userData.countryCode = country.phone;
      console.log(userData);

      dropdownMenu.style.display = "none";
    });
  });
}

generateDropdownItems();

dropdownContainer.addEventListener("blur", ({ relatedTarget }) => {
  if (
    dropdownContainer &&
    (dropdownContainer.contains(relatedTarget) ||
      dropdownContainer.isEqualNode(relatedTarget))
  ) {
    return;
  }
  dropdownMenu.style.display = "none";
});

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const { name, email, password, phone, countryCode } = userData;

  usernameField.classList.remove("error-state");
  emailField.classList.remove("error-state");
  passwordContainerEl.classList.remove("error-state");
  phoneField.classList.remove("error-state");

  const isAllEmpty =
    !userData.name.trim() &&
    !userData.email.trim() &&
    !userData.password.trim() &&
    !userData.phone.trim();

  if (isAllEmpty) {
    usernameField.classList.add("error-state");
    emailField.classList.add("error-state");
    passwordContainerEl.classList.add("error-state");
    phoneField.classList.add("error-state");
    return;
  }

  if (!name.trim()) {
    usernameField.classList.add("error-state");
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    emailField.classList.add("error-state");
    return;
  }

  const phonePattern = /^\+?[1-9]\d{1,14}$/;
  const isValidPhone = phonePattern.test(phone);

  if (!isValidPhone) {
    phoneField.classList.add("error-state");
    return;
  }

  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  if (!isLengthValid && !hasUppercase && !hasNumber && !hasSpecial) {
    passwordContainerEl.classList.add("error-state");
    return;
  }
});
