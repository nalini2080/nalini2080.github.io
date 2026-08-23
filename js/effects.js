/* =========================================================
   Shared interactive effects: custom cursor + trail,
   constellation canvas background, Konami-code easter egg.
   Included on every page.
   ========================================================= */

(function () {
  const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 768;

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-mobile-toggle');
  const navPanel = document.querySelector('.nav-mobile-panel');
  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => navPanel.classList.toggle('open'));
  }

  /* ---------- Custom cursor + fading trail ---------- */
  if (!isTouch) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const trailCanvas = document.createElement('canvas');
    trailCanvas.className = 'cursor-trail-canvas';
    document.body.appendChild(trailCanvas);
    const tctx = trailCanvas.getContext('2d');

    function resizeTrail() {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    }
    resizeTrail();
    window.addEventListener('resize', resizeTrail);

    let trail = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      trail.push({ x: mouseX, y: mouseY, life: 1 });
      if (trail.length > 40) trail.shift();

      const el = document.elementFromPoint(mouseX, mouseY);
      if (el && el.closest('a, button, .card, .hobby-card')) {
        dot.classList.add('hover');
      } else {
        dot.classList.remove('hover');
      }
    });

    function drawTrail() {
      tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.life -= 0.035;
        if (p.life <= 0) continue;
        tctx.beginPath();
        tctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
        tctx.fillStyle = `rgba(64, 224, 208, ${p.life * 0.5})`;
        tctx.fill();
      }
      trail = trail.filter((p) => p.life > 0);
      requestAnimationFrame(drawTrail);
    }
    drawTrail();
  }

  /* ---------- Constellation background (hero canvas) ---------- */
  const heroCanvas = document.getElementById('constellation');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let stars = [];
    let mx = -9999, my = -9999;
    let t = 0;

    function resizeHero() {
      heroCanvas.width = heroCanvas.parentElement.offsetWidth;
      heroCanvas.height = heroCanvas.parentElement.offsetHeight;
      const count = Math.min(110, Math.floor((heroCanvas.width * heroCanvas.height) / 11000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.8 + Math.random() * 1.6,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }
    resizeHero();
    window.addEventListener('resize', resizeHero);

    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    });
    heroCanvas.parentElement.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });

    function tick() {
      t++;
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > heroCanvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > heroCanvas.height) s.vy *= -1;

        const dx = mx - s.x, dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          s.x -= dx * 0.012;
          s.y -= dy * 0.012;
        }
      }
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i], b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(64, 224, 208, ${0.18 * (1 - d / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        const s = stars[i];
        const twinkle = 0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 224, 255, ${0.5 + twinkle * 0.5})`;
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- Konami code easter egg ---------- */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let progress = 0;

  const overlay = document.createElement('div');
  overlay.className = 'egg-overlay';
  overlay.innerHTML = `
    <div class="egg-card">
      <div class="emoji-row">🧶⛰️🏖️📖🏓🏊</div>
      <h3>You found the secret!</h3>
      <p>Since you like exploring&nbsp;&mdash; head over to the Play page for a hobby-themed mini game.</p>
      <a href="play.html" class="btn btn-primary">Go play &rarr;</a>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('show'); });

  function launchConfetti() {
    const emojis = ['🧶', '⛰️', '🏖️', '📖', '🏓', '🏊'];
    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      span.className = 'confetti';
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.animationDuration = 2 + Math.random() * 2 + 's';
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 4200);
    }
  }

  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI[progress]) {
      progress++;
      if (progress === KONAMI.length) {
        overlay.classList.add('show');
        launchConfetti();
        progress = 0;
      }
    } else {
      progress = (key === KONAMI[0]) ? 1 : 0;
    }
  });
})();
