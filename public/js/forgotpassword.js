import { countries } from "./countries.js";

const emailField = document.getElementById("email");
const countryCodeField = document.getElementById("countryCode");
const dropdownWrapper = document.querySelector(".dropdown-wrapper");
const dropdownToggle = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownItemText = document.getElementById("dropdownItemText");
const dropdownItemsWrapper = document.querySelector(".dropdown-items-wrapper");
const dropdownSearchBar = document.querySelector("#dropdownItemsSearch");
const dropdownContainer = document.querySelector(".dropdown-container");
const overlay = document.querySelector(".overlay");
const dropdownUpArrow = document.querySelector("#dropdownUpArrow");
const dropdownDownArrow = document.querySelector("#dropdownDownArrow");

let searchValue = "";
let debounceTimeout;

(() => {
  const slider = document.getElementById("forgotImageSlider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".login-slide");
  if (slides.length <= 1) return;

  let currentIndex = 0;
  const slideDurationMs = 3000;

  setInterval(() => {
    slides[currentIndex].classList.remove("is-active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("is-active");
  }, slideDurationMs);
})();

if (dropdownWrapper && emailField) {
  dropdownWrapper.style.display = /^\d{1,12}$/.test(emailField.value) ? "flex" : "none";
}

if (countryCodeField && dropdownItemText && countryCodeField.value) {
  dropdownItemText.textContent = countryCodeField.value;
}

function toggleDropdown() {
  if (!dropdownMenu) return;

  const isClosed = dropdownMenu.style.display === "none" || dropdownMenu.style.display === "";
  if (isClosed) {
    dropdownMenu.classList.add("open");
    overlay?.classList.add("open");
    dropdownMenu.style.display = "flex";
    dropdownDownArrow?.classList.remove("show-dropdown-arrow-icon");
    dropdownUpArrow?.classList.add("show-dropdown-arrow-icon");
  } else {
    dropdownMenu.classList.remove("open");
    overlay?.classList.remove("open");
    dropdownMenu.style.display = "none";
    dropdownDownArrow?.classList.add("show-dropdown-arrow-icon");
    dropdownUpArrow?.classList.remove("show-dropdown-arrow-icon");
  }
}

function generateDropdownItems() {
  if (!dropdownItemsWrapper) return;

  let allCountries = countries;
  dropdownItemsWrapper.innerHTML = "";

  if (searchValue) {
    allCountries = allCountries.filter(
      (item) => item.phone.includes(searchValue) || item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  allCountries.forEach((country) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");

    const itemImg = document.createElement("img");
    itemImg.src = country.flag;
    itemImg.alt = `${country.name} flag`;
    itemImg.classList.add("dropdown-item-img");
    item.appendChild(itemImg);

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("dropdown-item-text-wrapper");

    const countryName = document.createElement("span");
    countryName.textContent = country.name;
    countryName.classList.add("dropdown-item-name");
    textWrapper.appendChild(countryName);

    const countryCode = document.createElement("span");
    countryCode.textContent = country.phone;
    countryCode.classList.add("dropdown-item-phone");
    textWrapper.appendChild(countryCode);

    item.appendChild(textWrapper);
    dropdownItemsWrapper.appendChild(item);

    item.addEventListener("click", () => {
      if (dropdownItemText) dropdownItemText.textContent = country.phone;
      if (countryCodeField) countryCodeField.value = country.phone;

      const selectedFlagImg = document.getElementById("dropdownItemImg");
      if (selectedFlagImg) selectedFlagImg.src = country.flag;

      if (dropdownMenu) dropdownMenu.style.display = "none";
      overlay?.classList.remove("open");
      dropdownDownArrow?.classList.add("show-dropdown-arrow-icon");
      dropdownUpArrow?.classList.remove("show-dropdown-arrow-icon");
      dropdownMenu?.classList.remove("open");
      searchValue = "";
      if (dropdownSearchBar) dropdownSearchBar.value = "";
      generateDropdownItems();
    });
  });
}

function handleBlur(relatedTarget) {
  if (
    dropdownContainer &&
    (dropdownContainer.contains(relatedTarget) || dropdownContainer.isEqualNode(relatedTarget))
  ) {
    return;
  }

  overlay?.classList.remove("open");
  if (dropdownMenu) {
    dropdownMenu.classList.remove("open");
    dropdownMenu.style.display = "none";
  }
  dropdownDownArrow?.classList.add("show-dropdown-arrow-icon");
  dropdownUpArrow?.classList.remove("show-dropdown-arrow-icon");
}

dropdownToggle?.addEventListener("click", toggleDropdown);

dropdownSearchBar?.addEventListener("input", (e) => {
  searchValue = e.target.value;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    generateDropdownItems();
  }, 250);
});

dropdownContainer?.addEventListener("blur", ({ relatedTarget }) => {
  handleBlur(relatedTarget);
});

dropdownSearchBar?.addEventListener("blur", ({ relatedTarget }) => {
  handleBlur(relatedTarget);
});

emailField?.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  const isPhone = /^\d{1,12}$/.test(value);

  if (!dropdownWrapper || !countryCodeField) return;

  if (isPhone) {
    dropdownWrapper.style.display = "flex";
    emailField.name = "contactNumber";
  } else {
    dropdownWrapper.style.display = "none";
    emailField.name = "email";
    countryCodeField.value = "+91";
  }
});

generateDropdownItems();
