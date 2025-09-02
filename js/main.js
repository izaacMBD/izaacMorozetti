// Simple interactivity: menu toggle + theme picker
(function(){
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');
    const themeBtn = document.getElementById('themeToggle');
    const themePanel = document.getElementById('themePanel');
    const themeList = document.getElementById('themeList');
    const closeTheme = document.getElementById('closeTheme');
  
    // Menu toggle for mobile
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      const hidden = siteNav.getAttribute('aria-hidden') === 'true';
      siteNav.setAttribute('aria-hidden', String(!hidden));
      siteNav.style.display = hidden ? 'block' : 'none';
    });
  
    // Theme panel
    themeBtn.addEventListener('click', () => {
      const hidden = themePanel.getAttribute('aria-hidden') === 'true';
      themePanel.setAttribute('aria-hidden', String(!hidden));
      themePanel.style.display = hidden ? 'block' : 'none';
      themeBtn.setAttribute('aria-expanded', String(!hidden));
    });
  
    closeTheme.addEventListener('click', () => {
      themePanel.setAttribute('aria-hidden', 'true');
      themePanel.style.display = 'none';
      themeBtn.setAttribute('aria-expanded', 'false');
    });
  
    // Apply theme buttons
    themeList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-theme]');
      if (!btn) return;
      const theme = btn.getAttribute('data-theme');
      document.body.className = theme;
      // persist
      try { localStorage.setItem('mxb_theme', theme); } catch(e){}
    });
  
    // load persisted theme
    try {
      const saved = localStorage.getItem('mxb_theme');
      if (saved) document.body.className = saved;
    } catch(e){}
  
    // close panels on outside click
    document.addEventListener('click', (e) => {
      if (!themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
        themePanel.setAttribute('aria-hidden','true');
        themePanel.style.display = 'none';
        themeBtn.setAttribute('aria-expanded', 'false');
      }
    });
  
  })();
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buttons button");
  
    buttons.forEach((btn) => {
      const classes = btn.classList;
  
      if (classes.contains("default")) btn.textContent = "Default";
      if (classes.contains("primary")) btn.textContent = "Primary";
      if (classes.contains("secondary")) btn.textContent = "Secondary";
      if (classes.contains("ghost")) btn.textContent = "Ghost";
      if (classes.contains("danger")) btn.textContent = "Danger";
      if (classes.contains("success")) btn.textContent = "Success";
    });
  });
    