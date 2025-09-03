// Expansão das notas com reação dinâmica
document.querySelectorAll('.note').forEach(note => {
  const btn = note.querySelector('.expand-btn');

  btn.addEventListener('click', () => {
    const grid = note.closest('.notes-grid, .blog-grid');

    // Fecha todos os outros cards antes de abrir o clicado
    grid.querySelectorAll('.note.open').forEach(openNote => {
      if (openNote !== note) {
        openNote.classList.remove('open');
        openNote.querySelector('.expand-btn').textContent = 'Ler mais';
      }
    });

    // Alterna apenas no clicado
    note.classList.toggle('open');
    btn.textContent = note.classList.contains('open') ? 'Fechar' : 'Ler mais';

    // Marca grid como "expansão" apenas se houver algum aberto
    if (grid.querySelector('.note.open')) {
      grid.classList.add('expanding');
    } else {
      grid.classList.remove('expanding');
    }
  });
});
