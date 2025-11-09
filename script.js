/* =====================================================
   PASIYA-MD AI OFFICIAL SCRIPT FILE
   Smooth Scroll + Mobile Menu + Scroll Animations
   ===================================================== */

// 🌐 Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// 📱 Mobile Menu Toggle
const nav = document.querySelector(".nav-links");
const menuBtn = document.createElement("div");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "☰";
document.querySelector(".navbar").appendChild(menuBtn);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  if (nav.classList.contains("active")) {
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.background = "rgba(0, 0, 0, 0.9)";
    nav.style.position = "absolute";
    nav.style.top = "60px";
    nav.style.right = "20px";
    nav.style.padding = "20px";
    nav.style.borderRadius = "10px";
  } else {
    nav.style.display = "none";
  }
});

// ✨ Scroll Animation Effect
const elements = document.querySelectorAll("section, .card, .tool");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;

    if (elTop < triggerBottom) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// 🪄 Initial animation styles
const style = document.createElement("style");
style.innerHTML = `
  section, .card, .tool {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.7s ease;
  }
  section.visible, .card.visible, .tool.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ✨ Console Message
console.log("%cPASIYA-MD AI SYSTEM ACTIVATED 🤖", "color:#00FFF2; font-size:16px; font-weight:bold;");
console.log("%cPowered by PASIYA-MD TEAM | Owner: +94784548818 / +94766359869", "color:#FFD700;");
