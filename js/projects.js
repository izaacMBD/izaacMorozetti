// Controle de carrossel + auto-play + hover efeito grid
document.querySelectorAll('.project-card').forEach(card => {
    const track = card.querySelector('.carousel-track');
    const slides = track.querySelectorAll('img');
    const prevBtn = card.querySelector('.carousel-btn.prev');
    const nextBtn = card.querySelector('.carousel-btn.next');
    let index = 0;
    let autoPlay;
  
    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  
    function nextSlide() {
      index = (index + 1) % slides.length;
      updateCarousel();
    }
  
    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    }
  
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  
    // autoplay a cada 4s
    function startAutoPlay() {
      autoPlay = setInterval(nextSlide, 4000);
    }
    function stopAutoPlay() {
      clearInterval(autoPlay);
    }
    startAutoPlay();
  
    // pausa autoplay no hover
    card.addEventListener('mouseenter', stopAutoPlay);
    card.addEventListener('mouseleave', startAutoPlay);
  });
  
  // efeito de hover global (um cresce, outros diminuem e borram)
  const grid = document.querySelector('.projects-grid');
  grid.addEventListener('mouseover', () => {
    grid.classList.add('hovering');
  });
  grid.addEventListener('mouseout', () => {
    grid.classList.remove('hovering');
  });
  