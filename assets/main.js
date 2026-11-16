// Nexo Projetos · interações do site
(function () {
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu no celular
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Trilho de projetos
  document.querySelectorAll('[data-rail]').forEach(root => {
    const rail = root.querySelector('.rail');
    const cards = Array.from(rail.children);
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const count = root.querySelector('.rail-count');
    const bar = root.querySelector('.rail-progress i');
    const total = cards.length;
    const pad = n => String(n).padStart(2, '0');

    const current = () => {
      const left = rail.scrollLeft;
      let idx = 0, best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft) - left);
        if (d < best) { best = d; idx = i; }
      });
      return idx;
    };
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? rail.scrollLeft / max : 0;
      const i = ratio > 0.98 ? total - 1 : current();
      if (count) count.innerHTML = `<b>${pad(i + 1)}</b> / ${pad(total)}`;
      if (bar) {
        const w = Math.max(rail.clientWidth / rail.scrollWidth, 0.08);
        bar.style.width = (w * 100) + '%';
        bar.style.transform = `translateX(${ratio * (1 / w - 1) * 100}%)`;
      }
      if (prev) prev.disabled = rail.scrollLeft < 4;
      if (next) next.disabled = rail.scrollLeft > max - 4;
    };
    const go = dir => {
      const i = Math.min(Math.max(current() + dir, 0), total - 1);
      const padL = parseFloat(getComputedStyle(rail).paddingLeft);
      rail.scrollTo({ left: cards[i].offsetLeft - rail.offsetLeft - padL, behavior: 'smooth' });
    };
    prev && prev.addEventListener('click', () => go(-1));
    next && next.addEventListener('click', () => go(1));
    rail.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    rail.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    update();
  });

  // Surgir ao rolar: só esconde o que está abaixo da tela; o que já aparece fica visível
  const els = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.remove('pending'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('pending'); io.observe(el); }
    });
  }

  // Índice da página de projeto
  const toc = document.querySelectorAll('.p-toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    const map = new Map(Array.from(toc).map(a => [a.getAttribute('href').slice(1), a]));
    const io2 = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { toc.forEach(a => a.classList.remove('active')); map.get(e.target.id)?.classList.add('active'); }
    }), { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); s && io2.observe(s); });
  }

  // Formulário de contato: abre o e-mail do visitante com a mensagem pronta
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const to = form.getAttribute('data-to');
      const subject = `Contato pelo site: ${d.get('assunto') || 'Novo projeto'}`;
      const body = `Nome: ${d.get('nome')}\nEmpresa ou órgão: ${d.get('empresa') || '-'}\nE-mail: ${d.get('email')}\n\n${d.get('mensagem')}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
