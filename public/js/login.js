import { countries } from "./countries.js";

let loginForm = document.getElementById("loginForm");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let errorTextContainer = document.querySelectorAll(".error-msg-feild");
let showPassword = document.getElementById("showPassword");
let loginBtn = document.getElementById("loginBtn");
const countryCodeField = document.getElementById("countryCode");

const phoneField = document.getElementById("phone");

const dropdownWrapper = document.querySelector(".dropdown-wrapper");
const dropdownToggle = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownItemText = document.getElementById("dropdownItemText");
const dropdownItemImg = document.getElementById("dropdownItemImg");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownContainer = document.querySelector(".dropdown-container");
const dropdownItemsWrapper = document.querySelector(".dropdown-items-wrapper");
const dropdownSearchBar = document.querySelector("#dropdownItemsSearch");

const eyeButtonContainer = document.querySelector(".eye-button");
const showPasswordIcon = document.querySelector(".show-password-icon");
const hidePasswordIcon = document.querySelector(".hide-password-icon");
const emailOrPhoneWrapper = document.querySelector(".email-input");
const passwordWrapper = document.querySelector(".password-input");
const overlay = document.querySelector(".overlay");

const dropdownUpArrow = document.querySelector("#dropdownUpArrow");
const dropdownDownArrow = document.querySelector("#dropdownDownArrow");
const passwordError = document.querySelector("#passwordError");
const emailError = document.querySelector("#emailError");

let isPasswordVisible = false;
let searchValue = "";
let debounceTimeout;

let userData = {
  email: "",
  password: "",
  contactNumber: "",
  countryCode: "+91",
};

dropdownWrapper.style.display = "none";

if (passwordError && passwordError.textContent.trim() !== "") {
  passwordWrapper.classList.add("error-state");
}

if (emailError && emailError.textContent.trim() !== "") {
  emailOrPhoneWrapper.classList.add("error-state");
}

if (passwordField.value){
  userData.password = passwordField.value
  eyeButtonContainer.style.display = "flex";
}

if (countryCodeField.value) {
  userData.countryCode = countryCodeField.value;

  dropdownWrapper.style.display = "flex";
  emailField.name = "contactNumber";
  userData.contactNumber = emailField.value
}

if (!countryCodeField.value){
  emailField.name = "email";
  userData.contactNumber = "";
  userData.email = emailField.value;
}


function toggleDropdown() {
  if (
    dropdownMenu.style.display === "none" ||
    dropdownMenu.style.display === ""
  ) {
    dropdownMenu.classList.add("open");
    overlay.classList.add("open");
    dropdownMenu.style.display = "flex";
    dropdownDownArrow.classList.remove("show-dropdown-arrow-icon");
    dropdownUpArrow.classList.add("show-dropdown-arrow-icon");
  } else {
    dropdownMenu.classList.remove("open");
    overlay.classList.remove("open");
    dropdownMenu.style.display = "none";
    dropdownDownArrow.classList.add("show-dropdown-arrow-icon");
    dropdownUpArrow.classList.remove("show-dropdown-arrow-icon");
  }
}

dropdownToggle.addEventListener("click", toggleDropdown);

function generateDropdownItems() {
  let allCountries = countries;
  dropdownItemsWrapper.innerHTML = "";

  if (searchValue) {
    let filteredItems = allCountries.filter(
      (item) =>
        item.phone.includes(searchValue) ||
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    allCountries = filteredItems;
  }

  allCountries.forEach((country) => {
    const item = document.createElement("div");
    item.id = country._id
    item.classList.add("dropdown-item");

    //   item.dataset.id = country._id;
    const itemImg = document.createElement("img");
    itemImg.src = country.flag;
    itemImg.alt = `${country.name} flag`;
    itemImg.classList.add("dropdown-item-img");

    item.appendChild(itemImg);

    const countryItemTextWrapper = document.createElement("div");
    countryItemTextWrapper.classList.add("dropdown-item-text-wrapper");
    item.appendChild(countryItemTextWrapper);

    const countryName = document.createElement("span");
    countryName.textContent = country.name;
    countryName.classList.add("dropdown-item-name");
    countryItemTextWrapper.appendChild(countryName);

    const countryCode = document.createElement("span");
    countryCode.textContent = country.phone;
    countryCode.classList.add("dropdown-item-phone");
    countryItemTextWrapper.appendChild(countryCode);

    dropdownItemsWrapper.appendChild(item);


    if (userData.countryCode && userData.countryCode === country.phone){
      dropdownItemText.textContent = country.phone;
      dropdownItemImg.src = country.flag;
    }

    item.addEventListener("click", function () {
      // console.log(country);
       // Check the image element

      // dropdownItemText.textContent = country.phone;
      // dropdownItemImg.src = country.flag;
      // userData.countryCode = country.phone;
     

      const selectedFlagImg = document.getElementById("dropdownItemImg");

      // Remove the current image element from the label
      if (selectedFlagImg) {
        selectedFlagImg.remove();
      }

      // Create a new image element
      const newImgElement = document.createElement("img");
      newImgElement.src = country.flag; 
      newImgElement.alt = `${country.name} flag`;
      newImgElement.id = "dropdownItemImg"; 

      const label = document.querySelector(".dropdown-selected-option");
      label.prepend(newImgElement);

      // Update the phone code in the label
      const selectedPhoneCode = document.getElementById("dropdownItemText");
      selectedPhoneCode.textContent = country.phone;
      
      dropdownItemText.textContent = country.phone;
      // dropdownItemImg.src = country.flag;
      userData.countryCode = country.phone;
      

      dropdownMenu.style.display = "none";
      searchValue = "";
      dropdownSearchBar.value = "";
      overlay.classList.remove("open");
      dropdownDownArrow.classList.add("show-dropdown-arrow-icon");
      dropdownUpArrow.classList.remove("show-dropdown-arrow-icon");
      generateDropdownItems();
    });
  });
}

generateDropdownItems();

dropdownSearchBar.addEventListener("input", (e) => {
  const value = e.target.value;
  searchValue = value;
  if (value) {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      generateDropdownItems();
    }, 500);
  } else {
    generateDropdownItems();
  }
});

function handleBlur(relatedTarget) {
  if (
    dropdownContainer &&
    (dropdownContainer.contains(relatedTarget) ||
      dropdownContainer.isEqualNode(relatedTarget))
  ) {
    return;
  }
  overlay.classList.remove("open");
  dropdownMenu.style.display = "none";
  searchValue = "";
  dropdownSearchBar.value = "";
  dropdownDownArrow.classList.add("show-dropdown-arrow-icon");
  dropdownUpArrow.classList.remove("show-dropdown-arrow-icon");
  generateDropdownItems();
}

dropdownContainer.addEventListener("blur", ({ relatedTarget }) => {
  handleBlur(relatedTarget);
});

dropdownSearchBar.addEventListener("blur", ({ relatedTarget }) => {
  handleBlur(relatedTarget);
});

const emailRegex =
  /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
// const phoneRegex = /^\d{10}$/;
const phoneRegex = /^\d{4,12}$/;



const validateForm = () => {
  const isEmailValid = emailRegex.test(userData.email);
  const isPasswordValid = userData.password.length > 0;
  const isValidPhone = phonePattern.test(userData.contactNumber);
  if ((isEmailValid || isValidPhone) && isPasswordValid) {
    loginBtn.classList.remove("disabled");
  } else {
    loginBtn.classList.add("disabled");
  }
};

emailField.addEventListener("blur", (e) => {
  if (!userData.email) {
    emailOrPhoneWrapper.classList.remove("error-state");
    errorTextContainer[0].style.display = "none";
  }
});

function hideErrorMessages(){
  errorTextContainer[0].style.display = "none";
  errorTextContainer[1].style.display = "none";

  emailOrPhoneWrapper.classList.remove("error-state");
  passwordWrapper.classList.remove("error-state");


  if (passwordError) {
    passwordError.style.display = "none";
  }

  if (emailError) {
    emailError.style.display = "none";
  }

  let messageEl = document.getElementById('message')
  if (messageEl){
    messageEl.style.display = 'none'
  }

}

emailField.addEventListener("input", (e) => {
  // console.log(e.target.value);
  let value = e.target.value;
  // if (emailRegex.test(value)) {
  //   emailOrPhoneWrapper.classList.remove("error-state");
  //   errorTextContainer[0].style.display = "none";
  // } else {
  //   emailOrPhoneWrapper.classList.add("error-state");
  //   errorTextContainer[0].style.display = "flex";
  // }

  // validateForm();

  if (/^\d{1,12}$/.test(value)) {
    dropdownWrapper.style.display = "flex";
    // emailField.type = 'tel'
    emailField.name = "contactNumber";
    userData.contactNumber = value;
    userData.email = "";
  } else {
    dropdownWrapper.style.display = "none";
    // emailField.type = 'email'
    emailField.name = "email";
    userData.contactNumber = "";
    userData.email = value;
  }

  hideErrorMessages()
});

// phoneField.addEventListener("input", (e) => {
//   let value = e.target.value;
//   // console.log(value);
//   if (value){
//     emailField.classList.remove("error-state");
//     errorTextContainer.style.display = "none";
//   }
//   userData.contactNumber = value;
//   validateForm();
// });

function showOrHidePassword() {
  // isPasswordVisible = !isPasswordVisible;

  if (isPasswordVisible) {
    passwordField.setAttribute("type", "text");
    showPasswordIcon.style.display = "flex";
    hidePasswordIcon.style.display = "none";
  } else {
    passwordField.setAttribute("type", "password");
    showPasswordIcon.style.display = "none";
    hidePasswordIcon.style.display = "flex";
  }
}

passwordField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.password = value;

  if (value) {
    eyeButtonContainer.style.display = "flex";
    passwordWrapper.classList.remove("error-state");
    showOrHidePassword();
    errorTextContainer[1].style.display = "none";
  } else {
    eyeButtonContainer.style.display = "none";
  }

  hideErrorMessages()
  // validateForm();
});

showPassword.addEventListener("click", () => {
  isPasswordVisible = !isPasswordVisible;
  showOrHidePassword();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (passwordError) {
    passwordError.style.display = "none";
  }

  if (emailError) {
    emailError.style.display = "none";
  }

  countryCodeField.value = userData.countryCode;

  if ((!userData.email || !userData.contactNumber) && !userData.password) {
    emailOrPhoneWrapper.classList.add("error-state");
    errorTextContainer[0].style.display = "flex";
    passwordWrapper.classList.add("error-state");
    errorTextContainer[1].style.display = "flex";
  }

  if (!(userData.email || userData.contactNumber)) {
    emailOrPhoneWrapper.classList.add("error-state");
    errorTextContainer[0].style.display = "flex";
    return;
  } else if (
    !(
      emailRegex.test(userData.email) || phoneRegex.test(userData.contactNumber)
    )
  ) {
    emailOrPhoneWrapper.classList.add("error-state");
    errorTextContainer[0].style.display = "flex";
    return;
  } else {
    emailOrPhoneWrapper.classList.remove("error-state");
    errorTextContainer[0].style.display = "none";
  }

  if (!userData.password) {
    passwordWrapper.classList.add("error-state");
    errorTextContainer[1].style.display = "flex";
    return;
  } else {
    passwordWrapper.classList.remove("error-state");
    errorTextContainer[1].style.display = "none";
  }

  console.log('Harry', userData);
});
