    // Ano automático
    document.getElementById("year").textContent = new Date().getFullYear();

    // Carousel
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function updateCarousel(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.setAttribute("aria-selected", i === index));
      currentIndex = index;
    }

    document.querySelectorAll(".arrow").forEach(btn => {
      btn.addEventListener("click", () => {
        let newIndex = (currentIndex + parseInt(btn.dataset.dir) + slides.length) % slides.length;
        updateCarousel(newIndex);
      });
    });

    dots.forEach((dot, i) => dot.addEventListener("click", () => updateCarousel(i)));

    // Troca de tema (claro/escuro monocromático invertido)
    const themeBtn = document.getElementById("themeBtn");
    let dark = true;
    themeBtn.addEventListener("click", () => {
      dark = !dark;
      document.body.style.background = dark ? "#000" : "#fff";
      document.body.style.color = dark ? "#fff" : "#000";
      document.querySelectorAll(".btn.ghost").forEach(btn => btn.style.borderColor = dark ? "#fff" : "#000");
      document.querySelectorAll(".nav-link::after");
      themeBtn.setAttribute("aria-pressed", !dark);
    });