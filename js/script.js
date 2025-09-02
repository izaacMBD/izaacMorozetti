// Utilidades simples
const qs = (sel, el=document) => el.querySelector(sel);
const qsa = (sel, el=document) => [...el.querySelectorAll(sel)];

// Roteamento por hash
const routes = ["/home","/sobre","/projetos","/blog","/contato"];
function setActiveRoute(path){
  routes.forEach(r => {
    const view = qs(`#view-${r.replace('/','')}`);
    if(!view) return;
    view.classList.toggle('active', r === path);
  });
  qsa('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${path}`));
  // Foco no main para acessibilidade
  qs('#app').focus();
}
function handleHash(){
  const path = location.hash.replace('#','') || '/home';
  if(!routes.includes(path)) return location.hash = '#/home';
  history.replaceState({}, '', `#${path}`);
  setActiveRoute(path);
}
window.addEventListener('hashchange', handleHash);

// Carousel
function initCarousel(root){
  const track = qs('.carousel-track', root);
  const slides = qsa('.slide', root);
  const dots = qsa('.dot', root);
  const prev = qs('.arrow.left', root);
  const next = qs('.arrow.right', root);
  let idx = 0, timer;
  function go(i){
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-idx * 100}%)`;
    dots.forEach((d,di)=>d.classList.toggle('active', di===idx));
  }
  function play(){ timer = setInterval(()=>go(idx+1), 5000); }
  function pause(){ clearInterval(timer); }
  dots.forEach((d,di)=>d.addEventListener('click', ()=>go(di)));
  prev.addEventListener('click', ()=>go(idx-1));
  next.addEventListener('click', ()=>go(idx+1));
  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', play);
  go(0); play();
  // Swipe
  let startX=0; let dragging=false;
  root.addEventListener('pointerdown', e=>{ dragging=true; startX=e.clientX; pause(); });
  root.addEventListener('pointerup', e=>{ if(!dragging) return; dragging=false; const dx=e.clientX-startX; if(Math.abs(dx)>40) go(idx + (dx<0?1:-1)); play(); });
}

// Tabs
function initTabs(){
  const tabs = qsa('.tab-btn');
  const panes = qsa('#tab-content [data-pane]');
  function show(name){
    tabs.forEach(t=>{ const on=t.dataset.tab===name; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
    panes.forEach(p=>{ const on=p.dataset.pane===name; p.hidden=!on; });
  }
  tabs.forEach(t=> t.addEventListener('click', ()=>show(t.dataset.tab)));
  show('skills');
}

// Accordion
function initAccordion(){
  qsa('.acc-item').forEach(it=>{
    qs('.acc-head', it).addEventListener('click', ()=> it.classList.toggle('open'));
  });
}

// Theme toggle (monocromático, apenas alterna contraste)
function initTheme(){
  const btn = qs('#themeBtn');
  let mode = 'dark';
  function apply(){
    document.body.style.background = mode==='dark'
      ? 'radial-gradient(1200px 800px at 70% -10%, hsl(var(--hue), 20%, 14%), var(--bg))'
      : 'linear-gradient(180deg, hsl(var(--hue), 30%, 96%), hsl(var(--hue), 20%, 92%))';
    document.documentElement.style.setProperty('--text', mode==='dark'?'hsl(var(--hue), 20%, 92%)':'hsl(var(--hue), 10%, 12%)');
    document.documentElement.style.setProperty('--text-dim', mode==='dark'?'hsl(var(--hue), 10%, 70%)':'hsl(var(--hue), 0%, 35%)');
    document.documentElement.style.setProperty('--surface', mode==='dark'?'hsl(var(--hue), 10%, 12%)':'hsl(var(--hue), 30%, 98%)');
    document.documentElement.style.setProperty('--muted', mode==='dark'?'hsl(var(--hue), 8%, 26%)':'hsl(var(--hue), 10%, 88%)');
  }
  btn.addEventListener('click', ()=>{ mode = (mode==='dark'?'light':'dark'); btn.setAttribute('aria-pressed', String(mode==='light')); apply(); toast(`Tema: ${mode}`); });
  apply();
}

// Toast
function toast(msg){
  const t = qs('#toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2200);
}

// Dados de exemplo
const projects = [
  { id:1, title:'E-commerce Minimal', tag:'Front-end', desc:'SPA performática com checkout simplificado.', kpi:'Core Web Vitals A' },
  { id:2, title:'Dashboard Financeiro', tag:'UI/UX', desc:'Visualização de métricas com acessibilidade.', kpi:'+12% engajamento' },
  { id:3, title:'Landing SaaS', tag:'Branding', desc:'Conversão otimizada e testes A/B.', kpi:'+35% conversão' },
  { id:4, title:'Blog Estático', tag:'Conteúdo', desc:'Publicação rápida com Markdown.', kpi:'SEO 98' },
  { id:5, title:'App Portfólio', tag:'Front-end', desc:'PWA com cache inteligente.', kpi:'Offline Ready' },
  { id:6, title:'Painel Admin', tag:'UI/UX', desc:'Controles avançados e tabelas.', kpi:'Dark/Light' },
];

const posts = [
  { id:1, title:'Design monocromático: guia prático', snippet:'Como usar uma paleta de um único tom sem cair na monotonia.', date:'2025-08-10' },
  { id:2, title:'Acessibilidade que converte', snippet:'Pequenas melhorias que aumentam retenção.', date:'2025-07-02' },
  { id:3, title:'Performance web moderna', snippet:'Truques simples para atingir 90+ no Lighthouse.', date:'2025-06-12' },
];

function renderProjects(){
  const grid = qs('#projects-grid');
  grid.innerHTML = '';
  projects.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card col-4';
    card.innerHTML = `
      <div class="cover">${p.title}</div>
      <div class="body">
        <div class="flex gap-8" style="align-items:center;justify-content:space-between">
          <span class="badge">${p.tag}</span>
          <span style="font-size:12px;color:var(--text-dim)">${p.kpi}</span>
        </div>
        <h3 style="margin:8px 0 6px">${p.title}</h3>
        <p style="color:var(--text-dim)">${p.desc}</p>
        <div class="mt-16 flex gap-8">
          <button class="btn sm primary" data-view="${p.id}">Ver</button>
          <button class="btn sm ghost" data-like="${p.id}">Curtir</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  // Eventos
  grid.addEventListener('click', e=>{
    const v = e.target.closest('[data-view]');
    const l = e.target.closest('[data-like]');
    if(v){
      const id = Number(v.dataset.view); const pr = projects.find(x=>x.id===id);
      openProject(pr);
    }
    if(l){ toast('Obrigado pelo feedback'); }
  });
}

function openProject(pr){
  const dlg = qs('#projectModal');
  qs('#modalTitle').textContent = pr.title;
  qs('#modalBody').innerHTML = `<p>${pr.desc}</p><ul><li>Categoria: ${pr.tag}</li><li>Métrica: ${pr.kpi}</li></ul>`;
  dlg.showModal();
}

function renderPosts(){
  const grid = qs('#blog-grid');
  grid.innerHTML = '';
  posts.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'card col-6';
    el.innerHTML = `
      <div class="cover">${new Date(p.date).toLocaleDateString('pt-BR')}</div>
      <div class="body">
        <h3>${p.title}</h3>
        <p style="color:var(--text-dim)">${p.snippet}</p>
        <div class="mt-16"><a class="btn sm ghost" href="#" data-read="${p.id}">Ler</a></div>
      </div>`;
    grid.appendChild(el);
  });
  grid.addEventListener('click', e=>{
    const r = e.target.closest('[data-read]');
    if(r){ e.preventDefault(); toast('Conteúdo de exemplo.'); }
  });
}

// Formulário
function initForm(){
  const form = qs('#contactForm');
  const status = qs('#formStatus');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const ok = data.nome && /.+@.+/.test(data.email) && data.mensagem?.length>4;
    if(!ok){ status.textContent = 'Verifique os campos obrigatórios.'; status.style.color = 'var(--warn)'; return; }
    status.textContent = 'Enviando...';
    setTimeout(()=>{ status.textContent = 'Enviado com sucesso.'; status.style.color = 'var(--ok)'; form.reset(); toast('Mensagem enviada'); }, 700);
  });
}

// Interseção para animações suaves
function initReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'none'}], {duration:350, easing:'ease-out'}); io.unobserve(en.target); }
    });
  }, { threshold: .12 });
  qsa('.card, .panel, .stat').forEach(el=> io.observe(el));
}

// Inicialização
window.addEventListener('DOMContentLoaded', ()=>{
  handleHash();
  initCarousel(qs('#home-carousel'));
  initTabs();
  initAccordion();
  initTheme();
  renderProjects();
  renderPosts();
  initForm();
  initReveal();
  qs('#year').textContent = new Date().getFullYear();
});