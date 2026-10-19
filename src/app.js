/*
 * Appinion Admin admin theme — the only script in the template (~80 lines, no dependencies).
 * Everything else is plain HTML + Tailwind classes, so pages port straight to Blade / Vue / React.
 *
 *  1. Dark mode        <button id="themeBtn">  and  <input type="radio" name="theme" value="light|dark|system">
 *  2. Sidebar          #sidebar, #overlay, #menuBtn, #sbClose (mobile drawer)  +  #sbToggle / #sbExpand (desktop collapse)
 *  3. Settings tabs    <a data-tab="x" href="#/settings/x">  +  <section data-panel="x">
 *  4. Segmented ctrl   <div class="seg"><button aria-pressed="true">…</button></div>
 *  5. Range slider     <input class="range"> (keeps the filled track in sync)
 *  6. Profile menu     #userBtn toggles #userMenu (theme options, shortcuts dialog, reset)
 */
(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const get = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  /* ---------- 1. dark mode: 'light' | 'dark' | 'system' (the <head> snippet applies it before paint) ---------- */
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const theme = () => get('hearth-theme') || 'system';
  const applyTheme = () => {
    root.classList.toggle('dark', theme() === 'dark' || (theme() === 'system' && mq.matches));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = root.classList.contains('dark') ? '#141210' : '#f3efe8';
    $$('input[name="theme"]').forEach((r) => (r.checked = r.value === theme()));
    $$('[data-theme-option]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.themeOption === theme())));
  };
  const setTheme = (mode) => { set('hearth-theme', mode); applyTheme(); };
  $('#themeBtn')?.addEventListener('click', () => setTheme(root.classList.contains('dark') ? 'light' : 'dark'));
  $$('input[name="theme"]').forEach((r) => r.addEventListener('change', () => setTheme(r.value)));
  mq.addEventListener('change', () => theme() === 'system' && applyTheme());
  applyTheme();

  /* ---------- 2. sidebar ---------- */
  const sidebar = $('#sidebar'), overlay = $('#overlay'), expandBtn = $('#sbExpand');
  const collapse = (on) => {
    root.classList.toggle('sb-collapsed', on);
    expandBtn?.classList.toggle('lg:grid', on);
    set('hearth-sb', on ? '1' : '0');
  };
  const drawer = (open) => {
    sidebar.classList.toggle('-translate-x-full', !open);
    overlay.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
  };
  $('#sbToggle')?.addEventListener('click', () => collapse(true));
  expandBtn?.addEventListener('click', () => collapse(false));
  $('#menuBtn')?.addEventListener('click', () => drawer(true));
  $('#sbClose')?.addEventListener('click', () => drawer(false));
  overlay?.addEventListener('click', () => drawer(false));
  collapse(root.classList.contains('sb-collapsed'));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') drawer(false);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#search')?.focus(); }
  });

  /* ---------- 3. settings tabs (hash routed) ---------- */
  const tabs = $$('[data-tab]'), panels = $$('[data-panel]');
  if (tabs.length) {
    const show = () => {
      const want = (location.hash.match(/^#\/settings\/(\w+)/) || [])[1];
      const key = panels.some((p) => p.dataset.panel === want) ? want : panels[0].dataset.panel;
      panels.forEach((p) => p.classList.toggle('hidden', p.dataset.panel !== key));
      tabs.forEach((t) => t.classList.toggle('on', t.dataset.tab === key));
    };
    addEventListener('hashchange', show);
    show();
  }

  /* ---------- 4. segmented controls ---------- */
  $$('.seg').forEach((seg) => seg.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) $$('button', seg).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));

  /* ---------- 6. profile menu (sidebar user button) ---------- */
  const menu = $('#userMenu'), userBtn = $('#userBtn');
  if (menu && userBtn) {
    const toggle = (on) => { menu.hidden = !on; userBtn.setAttribute('aria-expanded', String(on)); };
    userBtn.addEventListener('click', () => toggle(menu.hidden));
    document.addEventListener('click', (e) => { if (!menu.contains(e.target) && !userBtn.contains(e.target)) toggle(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
    $$('[data-theme-option]', menu).forEach((b) => b.addEventListener('click', () => { setTheme(b.dataset.themeOption); toggle(false); }));
    $('#shortcutsBtn')?.addEventListener('click', () => { toggle(false); $('#shortcutsDlg')?.showModal(); });
    $('#logoutBtn')?.addEventListener('click', () => { location.href = 'login.html'; });
  }

  /* ---------- 5. range slider fill ---------- */
  $$('input.range').forEach((r) => {
    const fill = () => r.style.setProperty('--p', `${((r.value - r.min) / (r.max - r.min)) * 100}%`);
    r.addEventListener('input', fill);
    fill();
  });
})();
