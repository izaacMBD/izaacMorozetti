// Expansão das notas com reação dinâmica
document.querySelectorAll('.note').forEach(note => {
  const btn = note.querySelector('.expand-btn');

  btn.addEventListener('click', e => {
    e.stopPropagation(); // garante que não propague para o card inteiro
    const grid = note.closest('.blog-grid') || note.closest('.notes-grid');

    // Fecha os outros cards
    grid.querySelectorAll('.note.open').forEach(openNote => {
      if (openNote !== note) {
        openNote.classList.remove('open');
        openNote.querySelector('.expand-btn').textContent = 'Ler mais';
      }
    });

    // Alterna apenas o clicado
    note.classList.toggle('open');
    btn.textContent = note.classList.contains('open') ? 'Fechar' : 'Ler mais';

    // Aplica classe de expansão no grid
    if (grid.querySelector('.note.open')) {
      grid.classList.add('expanding');
    } else {
      grid.classList.remove('expanding');
    }
  });
});
