(function () {
  emailjs.init("Q6V0NFCXTnwpWcEda"); 
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const btn = form.querySelector(".btn-submit");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    const data = {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      checkin: form.checkin.value,
      checkout: form.checkout.value,
      guests: form.guests.value,
      roomType: form.roomType.value,
      message: form.message.value,
    };

    emailjs
      .send("service_zxh73xn", "template_n3ezduf", data)
      .then(() => {
        showPopup("✅ Booking request sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showPopup("❌ Failed to send booking request. Please try again later.", true);
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  });
});

function showPopup(message, isError = false) {
  const popup = document.createElement("div");
  popup.className = "popup-message";
  if (isError) popup.classList.add("error");
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 350);
  }, 3000);
}
