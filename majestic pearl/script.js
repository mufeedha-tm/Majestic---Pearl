// Smooth scroll for booking button
document.querySelectorAll('.scroll-book').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
  });
});

// Floating top shell scroll
const floatTop = document.getElementById('floatTop');
floatTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal animation on scroll
window.addEventListener('scroll', revealElements);
function revealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

// Booking form validation
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = document.getElementById('guests').value;

  if (!checkin || !checkout || guests < 1) {
    alert('Please fill all booking details correctly.');
    return;
  }

  alert('Your stay inquiry has been received. We will confirm availability shortly!');
});

// Reveal animation on scroll
const reveals = document.querySelectorAll('.service-card');
window.addEventListener('scroll', () => {
  reveals.forEach(card => {
    const top = card.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.8;
    if (top < trigger) {
      card.classList.add('show');
    }
  });
});
