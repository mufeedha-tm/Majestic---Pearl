// --- Initialize EmailJS ---
(function () {
  emailjs.init("Q6V0NFCXTnwpWcEda"); // your public key
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return; // Run validation before sending

    const btn = form.querySelector(".btn-submit");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    // --- Send Email ---
    emailjs
      .send("service_zxh73xn", "template_n3ezduf", {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        checkin: form.checkin.value,
        checkout: form.checkout.value,
        guests: form.guests.value,
        roomType: form.roomType.value,
        message: form.message.value
      })
      .then(() => {
        showPopup("✅ Booking request sent successfully!");
        form.reset();
      })
      .catch(() => {
        showPopup("❌ Failed to send booking request. Please try again later.");
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  });

  // ---------------- VALIDATION ----------------
  function validateForm() {
    form.querySelectorAll(".error").forEach(el => el.textContent = "");
    let valid = true;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phonePattern = /^[0-9]{10,15}$/;

    if (form.fullName.value.trim() === "") {
      showError(form.fullName, "Full name is required");
      valid = false;
    }

    if (form.email.value.trim() === "") {
      showError(form.email, "Email is required");
      valid = false;
    } else if (!emailPattern.test(form.email.value.trim())) {
      showError(form.email, "Enter a valid email address");
      valid = false;
    }

    const cleanedPhone = form.phone.value.trim().replace(/\s+/g, "");
    if (cleanedPhone === "") {
      showError(form.phone, "Phone number is required");
      valid = false;
    } else if (!phonePattern.test(cleanedPhone)) {
      showError(form.phone, "Enter a valid phone number");
      valid = false;
    }

    if (form.checkin.value === "") {
      showError(form.checkin, "Select check-in date");
      valid = false;
    }
    if (form.checkout.value === "") {
      showError(form.checkout, "Select check-out date");
      valid = false;
    }
    if (
      form.checkin.value &&
      form.checkout.value &&
      new Date(form.checkout.value) <= new Date(form.checkin.value)
    ) {
      showError(form.checkout, "Check-out must be after check-in date");
      valid = false;
    }

    if (form.guests.value.trim() === "" || Number(form.guests.value) < 1) {
      showError(form.guests, "Enter valid number of guests");
      valid = false;
    }

    if (form.roomType.value.trim() === "") {
      showError(form.roomType, "Please select a room type");
      valid = false;
    }

    return valid;
  }

  // ---------------- ERROR DISPLAY ----------------
  function showError(input, message) {
    let error = input.parentElement.querySelector(".error");
    if (!error) {
      error = document.createElement("span");
      error.className = "error";
      input.parentElement.appendChild(error);
    }
    error.textContent = message;
  }

  // ---------------- POPUP ----------------
  function showPopup(message) {
    const popupContainer = document.getElementById("popupContainer");
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = message;
    popupContainer.appendChild(popup);

    setTimeout(() => popup.classList.add("show"), 100);
    setTimeout(() => popup.classList.remove("show"), 3000);
    setTimeout(() => popup.remove(), 3500);
  }
});
