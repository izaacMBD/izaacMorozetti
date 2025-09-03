document.querySelectorAll('.note').forEach(note => {
  const btn = note.querySelector('.expand-btn');

  btn.addEventListener('click', e => {
    e.stopPropagation(); // evita que o clique no botão afete o card

    const grid = note.closest('.blog-grid, .notes-grid');

    // Fecha todos os outros cards dentro do mesmo grid
    grid.querySelectorAll('.note.open').forEach(openNote => {
      if (openNote !== note) {
        openNote.classList.remove('open');
        openNote.querySelector('.expand-btn').textContent = 'Ler mais';
      }
    });

    // Alterna apenas o card clicado
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
