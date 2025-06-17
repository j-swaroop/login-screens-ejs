import { countries } from "./countries.js";

const signupFormStepOne = document.querySelector('#signupFormStepOne')
const signUpForm = document.querySelector("#signUpForm");

const usernameField = document.getElementById("usernameField");
const passwordField = document.getElementById("password");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const passwordContainerEl = document.getElementById('passwordContainer')
const tooltipWrapper = document.getElementById('tooltipWrapper')
const countryCodeField = document.getElementById('countryCode');

let errorTextContainer = document.querySelectorAll(".error-msg-feild");
const errMessage = document.querySelector("#errMessage");
const userNameWrapper = document.querySelector(".username");
const emailWrapper = document.querySelector(".email-input");
const phoneWrapper = document.querySelector('.phone-wrapper')
const passwordWrapper = document.querySelector(".password-input");

const dropdownWrapper = document.querySelector(".dropdown-wrapper");
const dropdownToggle = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownItemText = document.getElementById("dropdownItemText");
const dropdownItemImg = document.getElementById("dropdownItemImg");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownContainer = document.querySelector(".dropdown-container");
const dropdownItemsWrapper = document.querySelector(".dropdown-items-wrapper");
const dropdownSearchBar = document.querySelector("#dropdownItemsSearch");

const dropdownUpArrow = document.querySelector("#dropdownUpArrow");
const dropdownDownArrow = document.querySelector("#dropdownDownArrow");

const overlay = document.querySelector(".overlay");

const sectionOne = document.querySelectorAll(".sectionOne");
const sectionTwo = document.querySelectorAll(".sectionTwo");
const backButton = document.querySelector('.back-button')

const showPassword = document.getElementById("showPassword");
const eyeButtonContainer = document.querySelector(".eye-button");
const showPasswordIcon = document.querySelector(".show-password-icon");
const hidePasswordIcon = document.querySelector(".hide-password-icon");

const alreadyHaveAccount = document.querySelector(".have-account");

const currentStepWrapper = document.querySelector('.current-step-wrapper');
const stepOneButton = document.querySelector('#stepOneButton');
const titleUsername = document.querySelector('.title-username')

let currentStep = 1

let isPasswordVisible = false;
let userData = {
  name: "",
  password: "",
  email: "",
  phone: "",
  countryCode: "+91",
};
let isPasswordValid = false
let searchValue = "";
let debounceTimeout;

if (emailField.value){
  userData.email = emailField.value 
}

if (phoneField.value){
  userData.phone = phoneField.value 
}

if (countryCodeField.value){
  userData.countryCode = countryCodeField.value
}

function hideErrorMessages(){
  errorTextContainer[0].style.display = "none";
  errorTextContainer[1].style.display = "none";
  errorTextContainer[2].style.display = "none";
  errorTextContainer[3].style.display = "none";
  errorTextContainer[4].style.display = 'none'
  userNameWrapper.classList.remove("error-state");
  emailWrapper.classList.remove("error-state");
  phoneWrapper.classList.remove("error-state");

  let messageEl = document.getElementById('message')
  if (messageEl){
    messageEl.style.display = 'none'
  }

}

usernameField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.name = value;

  hideErrorMessages()
});

emailField.addEventListener("input", (e) => {
  let value = e.target.value;
  userData.email = value;

  hideErrorMessages()
});

phoneField.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, ""); 
  
  let formattedValue = value.replace(/(\d{5})(?=\d)/g, "$1 ");
  e.target.value = formattedValue;

  const phonePattern = /^[1-9]\d{0,14}$/; 
  const isValidPhone = phonePattern.test(value);

  if (value === "") {
    userData.phone = ""; 
  } else if (isValidPhone) {
    userData.phone = value;
  }
  
  hideErrorMessages()
});




function showOrHidePassword(){
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
    showOrHidePassword()
    errorTextContainer[4].style.display = 'none'
  } else {
    eyeButtonContainer.style.display = "none";
  }

  const password = value;
   
  const isLengthValid = password.length >= 8;
  // const hasUppercase = /[A-Z]/.test(password);
  const hasUpperAndLowerCase = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  updateValidation("length", isLengthValid);
  updateValidation("uppercase", hasUpperAndLowerCase);
  updateValidation("special", hasSpecial);
  updateValidation("number", hasNumber);

  if (isLengthValid && hasUpperAndLowerCase && hasNumber && hasSpecial) {
    tooltipWrapper.style.display = 'none'
    isPasswordValid = true
  } else {
    tooltipWrapper.style.display = 'block'
    isPasswordValid = false
  }

});


showPassword.addEventListener("click", () => {
  isPasswordVisible = !isPasswordVisible;
  showOrHidePassword()
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

    if (userData.countryCode && userData.countryCode === country.phone) {
      item.classList.add("selected");
      dropdownItemText.textContent = country.phone;
      dropdownItemImg.src = country.flag;
      // dropdownContainer.classList.add('disabled')
    }

    item.addEventListener("click", function () {
      // console.log(country);
      // dropdownItemText.textContent = country.phone;
      // dropdownItemImg.src = country.flag;
      // userData.countryCode = country.phone;
      // console.log(userData);

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

backButton.addEventListener('click', () => {
  currentStep -= 1
  toggleSectionOneOrTwo()
})

function toggleSectionOneOrTwo(){
  if (currentStep !== 1){
    sectionOne[0].classList.add('hide-content')
    sectionTwo[0].classList.remove('hide-content')
    sectionOne[1].classList.add('hide-content')
    sectionTwo[1].classList.remove('hide-content')
    alreadyHaveAccount.classList.add('hide-content')
    currentStepWrapper.children[1].classList.add('active-step');
    currentStepWrapper.children[0].classList.add('active-step');
    backButton.classList.remove('hide-content')
    titleUsername.innerHTML = `Welcome ${userData.name}`
  }else{
    sectionOne[0].classList.remove('hide-content')
    sectionTwo[0].classList.add('hide-content')
    sectionOne[1].classList.remove('hide-content')
    sectionTwo[1].classList.add('hide-content')
    alreadyHaveAccount.classList.remove('hide-content')
    currentStepWrapper.children[0].classList.add('active-step');
    currentStepWrapper.children[1].classList.remove('active-step');
    backButton.classList.add('hide-content')
  }
}

function validateStepOne(){

  let messageEl = document.getElementById('message')
  if (messageEl){
    messageEl.style.display = 'none'
  }

  const { name, email, password, phone, countryCode } = userData
  // console.log(userData);
  userNameWrapper.classList.remove("error-state");
  emailWrapper.classList.remove("error-state");
  // passwordContainerEl.classList.remove("error-state");
  phoneWrapper.classList.remove("error-state");

  errorTextContainer[0].style.display = "none";
  errorTextContainer[1].style.display = "none";
  errorTextContainer[2].style.display = "none";
  errorTextContainer[3].style.display = "none";

  const isAllEmpty =
    !userData.name.trim() &&
    !userData.email.trim() &&
    // !userData.password.trim() &&
    !userData.phone.trim();

  if (isAllEmpty) {
    userNameWrapper.classList.add("error-state");
    errorTextContainer[0].style.display = "flex";
    errorTextContainer[3].style.display = "flex";
    return;
  }

  if (!name.trim()) {
    userNameWrapper.classList.add("error-state");
    errorTextContainer[0].style.display = "flex";
    return;
  }

  if (!email && !phone) {
    if (!email) emailWrapper.classList.add("error-state");
    if (!phone) phoneWrapper.classList.add("error-state");
    errorTextContainer[3].style.display = "flex";
    return;
  }

  if (email.trim()){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      emailWrapper.classList.add("error-state");
      errorTextContainer[1].style.display = "flex";
      return
    }
  }
  if (phone.trim()){
    // const phonePattern = /^\+?[1-9]\d{1,14}$/;
    // const phonePattern = /^\d{10}$/;
    const phonePattern = /^\d{4,12}$/;
    const isValidPhone = phonePattern.test(phone);

    if (!isValidPhone) {
      phoneWrapper.classList.add("error-state");
      errorTextContainer[2].style.display = "flex";
      return;
    }
  }

  isEmailRegistered(email, function (error, response) {
    if (response.data) {
      messageEl.classList.remove("hidden");
      messageEl.style.display = 'flex'
      messageEl.innerText = "This email is already registered!"; 
      return;
    }

    // if (messageEl.className.indexOf('hidden') === -1) {
    //   messageEl.classList.add("hidden");
    // }

    currentStep += 1;
    toggleSectionOneOrTwo();
  });  

  // currentStep += 1
  // toggleSectionOneOrTwo()

}

// function validateStepTwo(){
  
// }

stepOneButton.addEventListener('click', () => {
  validateStepOne()
})

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorTextContainer[4].style.display = 'none'
  passwordWrapper.classList.remove("error-state");

  const { name, email, password, phone, countryCode } = userData
  const isLengthValid = password.length >= 8;
  // const hasUppercase = /[A-Z]/.test(password);
  const hasUpperAndLowerCase = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  if (!password){
    passwordWrapper.classList.add("error-state");
    errorTextContainer[4].style.display = 'flex'
    return;
  }

  if (!(isLengthValid && hasUpperAndLowerCase && hasNumber && hasSpecial)){ 
    passwordWrapper.classList.add("error-state");
    errMessage.innerHTML = '*Invalid password'
    errorTextContainer[4].style.display = 'flex'
    return;
  }


  console.log(userData)
    
  
});
