const track = document.querySelector('.trip-track');
const cards = [...document.querySelectorAll('.trip-card')];
const previous = document.querySelector('.prev');
const next = document.querySelector('.next');
const progress = document.querySelector('.carousel-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
let current = 0;

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function visibleCards() {
  return window.innerWidth <= 800 ? 1 : 3;
}

function updateCarousel() {
  const max = Math.max(0, cards.length - visibleCards());
  current = Math.min(current, max);
  const gap = 22;
  const cardWidth = cards[0].getBoundingClientRect().width + gap;
  track.style.transform = `translateX(-${current * cardWidth}px)`;
  progress.style.width = `${((current + visibleCards()) / cards.length) * 100}%`;
  previous.disabled = current === 0;
  next.disabled = current === max;
  previous.style.opacity = previous.disabled ? '.35' : '1';
  next.style.opacity = next.disabled ? '.35' : '1';
}

previous.addEventListener('click', () => { current -= 1; updateCarousel(); });
next.addEventListener('click', () => { current += 1; updateCarousel(); });
window.addEventListener('resize', updateCarousel);
updateCarousel();

let startX = 0;
track.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].clientX - startX;
  if (Math.abs(distance) > 45) {
    if (distance < 0 && current < cards.length - visibleCards()) current += 1;
    if (distance > 0 && current > 0) current -= 1;
    updateCarousel();
  }
}, { passive: true });
