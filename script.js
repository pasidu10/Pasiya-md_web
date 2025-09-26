// Simple fade-in animation on scroll for bot boxes
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".bot-box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  boxes.forEach(box => observer.observe(box));
});
