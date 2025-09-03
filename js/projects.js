// Controle de carrossel para cada card
document.querySelectorAll('.project-card').forEach(card => {
    const track = card.querySelector('.carousel-track');
    const slides = track.querySelectorAll('img');
    const prevBtn = card.querySelector('.carousel-btn.prev');
    const nextBtn = card.querySelector('.carousel-btn.next');
    let index = 0;
  
    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });
  
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  });
  