const form = document.getElementById("resetPasswordForm");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const messageEl = document.getElementById("message");

function setMessage(msg) {
  if (!messageEl) return;
  messageEl.textContent = msg || "";
  messageEl.classList.toggle("hidden", !msg);
}

function togglePasswordVisibility(input) {
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

document.getElementById("toggleNewPassword")?.addEventListener("click", () => {
  togglePasswordVisibility(newPassword);
});

document.getElementById("toggleConfirmPassword")?.addEventListener("click", () => {
  togglePasswordVisibility(confirmPassword);
});

form?.addEventListener("submit", (e) => {
  if (!newPassword || !confirmPassword) return;
  if (newPassword.value !== confirmPassword.value) {
    e.preventDefault();
    setMessage("Passwords do not match.");
  }
});

(() => {
  const slider = document.getElementById("resetImageSlider");
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

