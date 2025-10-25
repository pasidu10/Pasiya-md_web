// simple fade-in on scroll
const revealElements = document.querySelectorAll('.hero, .about-preview');
window.addEventListener('scroll', () => {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});
