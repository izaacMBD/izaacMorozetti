(function(){
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');
    const themeBtn = document.getElementById('themeToggle');
    const themePanel = document.getElementById('themePanel');
    const themeList = document.getElementById('themeList');
    const closeTheme = document.getElementById('closeTheme');
  
    // Menu toggle
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.setAttribute('aria-hidden', expanded ? 'true' : 'false');
      siteNav.classList.toggle('open');
    });
  
    // Theme panel toggle
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
  
    // Apply theme
    themeList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-theme]');
      if (!btn) return;
      const theme = btn.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem('mxb_theme', theme); } catch(e){}
    });
  
    // Load persisted theme
    try {
      const saved = localStorage.getItem('mxb_theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
    } catch(e){}
  
    // Close panels on outside click
    document.addEventListener('click', (e) => {
      if (!themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
        themePanel.setAttribute('aria-hidden','true');
        themePanel.style.display = 'none';
        themeBtn.setAttribute('aria-expanded', 'false');
      }
    });
  
    // Card 3D hover
    document.querySelectorAll('.post').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `scale(1.05) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
      });
    });
  })();