// Expansão das notas
document.querySelectorAll('.note').forEach(note => {
    const btn = note.querySelector('.expand-btn');
    btn.addEventListener('click', () => {
      note.classList.toggle('open');
      btn.textContent = note.classList.contains('open') ? 'Fechar' : 'Ler mais';
    });
  });
  