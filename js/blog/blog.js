// Expansão das notas com reação dinâmica
document.querySelectorAll('.note').forEach(note => {
  const btn = note.querySelector('.expand-btn');

  btn.addEventListener('click', () => {
    const grid = note.closest('.notes-grid');

    // Fecha os outros cards antes de abrir o clicado
    document.querySelectorAll('.note.open').forEach(openNote => {
      if (openNote !== note) {
        openNote.classList.remove('open');
        openNote.querySelector('.expand-btn').textContent = 'Ler mais';
      }
    });

    // Alterna apenas no clicado
    note.classList.toggle('open');
    btn.textContent = note.classList.contains('open') ? 'Fechar' : 'Ler mais';

    // Se houver algum aberto, aplica classe de "expansão"
    if (document.querySelector('.note.open')) {
      grid.classList.add('expanding');
    } else {
      grid.classList.remove('expanding');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".expand-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const note = btn.closest(".note");
      const grid = note.closest(".notes-grid, .blog-grid");

      // Fecha todos os outros no mesmo grid
      grid.querySelectorAll(".note.open").forEach(openNote => {
        if (openNote !== note) {
          openNote.classList.remove("open");
        }
      });

      // Alterna apenas o card clicado
      note.classList.toggle("open");
    });
  });
});