// Expansão das notas com reação dinâmica
document.querySelectorAll('.note').forEach(note => {
  const btn = note.querySelector('.expand-btn');

  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    const grid = note.closest('.blog-grid') || note.closest('.notes-grid');

    // Se o card já está aberto, fecha ele
    if (note.classList.contains('open')) {
      note.classList.remove('open');
      btn.textContent = 'Ler mais';
      grid.classList.remove('expanding');
      return;
    }

    // Fecha todos os outros cards
    grid.querySelectorAll('.note.open').forEach(openNote => {
      openNote.classList.remove('open');
      openNote.querySelector('.expand-btn').textContent = 'Ler mais';
    });

    // Abre o clicado
    note.classList.add('open');
    btn.textContent = 'Fechar';
    grid.classList.add('expanding');
  });
});
