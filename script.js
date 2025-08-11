// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme initialization and toggle
(function(){
  try{
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var shouldUseDark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }catch(e){ /* no-op */ }

  var toggle = document.getElementById('theme-toggle');
  if(!toggle) return;

  function syncToggleLabel(){
    var isDark = document.documentElement.classList.contains('dark');
    toggle.textContent = isDark ? '🌙 Dark' : '☀️ Light';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  syncToggleLabel();

  toggle.addEventListener('click', function(){
    var isDark = document.documentElement.classList.toggle('dark');
    try{ localStorage.setItem('theme', isDark ? 'dark' : 'light'); }catch(e){ /* no-op */ }
    syncToggleLabel();
  });
})();


