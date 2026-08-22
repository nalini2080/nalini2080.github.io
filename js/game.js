/* =========================================================
   "Catch Your Hobbies" — a small canvas game.
   Move the basket to catch falling hobby icons; avoid the
   yarn-tangle bombs. Score persists as a high score locally.
   ========================================================= */

(function () {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const WIDTH = 640, HEIGHT = 420;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const GOOD_ICONS = ['🧶', '⛰️', '🏖️', '📖', '🏓', '🏊'];
  const BAD_ICON = '🌀';

  const scoreEl = document.getElementById('gameScore');
  const bestEl = document.getElementById('gameBest');
  const livesEl = document.getElementById('gameLives');
  const startBtn = document.getElementById('gameStart');

  let basket = { x: WIDTH / 2, w: 70, h: 18 };
  let items = [];
  let score = 0;
  let lives = 3;
  let best = Number(localStorage.getItem('hobbyGameBest') || 0);
  let running = false;
  let spawnTimer = 0;
  let speedFactor = 1;

  bestEl.textContent = best;

  function resetGame() {
    items = [];
    score = 0;
    lives = 3;
    speedFactor = 1;
    spawnTimer = 0;
    scoreEl.textContent = score;
    livesEl.textContent = '❤️'.repeat(lives);
  }

  function spawnItem() {
    const isBad = Math.random() < 0.15;
    items.push({
      x: 30 + Math.random() * (WIDTH - 60),
      y: -20,
      vy: 1.6 * speedFactor + Math.random() * 1.2,
      icon: isBad ? BAD_ICON : GOOD_ICONS[Math.floor(Math.random() * GOOD_ICONS.length)],
      bad: isBad,
    });
  }

  function pointerX(clientX) {
    const rect = canvas.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * WIDTH;
  }

  canvas.addEventListener('mousemove', (e) => {
    basket.x = Math.max(basket.w / 2, Math.min(WIDTH - basket.w / 2, pointerX(e.clientX)));
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    basket.x = Math.max(basket.w / 2, Math.min(WIDTH - basket.w / 2, pointerX(e.touches[0].clientX)));
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (!running) return;
    if (e.key === 'ArrowLeft') basket.x = Math.max(basket.w / 2, basket.x - 24);
    if (e.key === 'ArrowRight') basket.x = Math.min(WIDTH - basket.w / 2, basket.x + 24);
  });

  function endGame() {
    running = false;
    if (score > best) {
      best = score;
      localStorage.setItem('hobbyGameBest', best);
    }
    bestEl.textContent = best;
    startBtn.textContent = 'Play again';
    startBtn.disabled = false;
    ctx.fillStyle = 'rgba(2,2,41,0.55)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.font = '28px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game over — score ' + score, WIDTH / 2, HEIGHT / 2);
  }

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    spawnTimer++;
    const spawnRate = Math.max(22, 55 - Math.floor(score / 5));
    if (spawnTimer > spawnRate) {
      spawnItem();
      spawnTimer = 0;
    }
    speedFactor = 1 + score / 40;

    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.vy;
      ctx.fillText(it.icon, it.x, it.y);

      const caught = it.y > HEIGHT - 34 && it.y < HEIGHT - 10 &&
        Math.abs(it.x - basket.x) < basket.w / 2;

      if (caught) {
        items.splice(i, 1);
        if (it.bad) {
          lives--;
          livesEl.textContent = '❤️'.repeat(Math.max(lives, 0));
          if (lives <= 0) { endGame(); return; }
        } else {
          score++;
          scoreEl.textContent = score;
        }
      } else if (it.y > HEIGHT + 20) {
        items.splice(i, 1);
        if (!it.bad) {
          lives--;
          livesEl.textContent = '❤️'.repeat(Math.max(lives, 0));
          if (lives <= 0) { endGame(); return; }
        }
      }
    }

    ctx.fillStyle = '#1A1B41';
    ctx.beginPath();
    ctx.roundRect(basket.x - basket.w / 2, HEIGHT - 26, basket.w, basket.h, 6);
    ctx.fill();
    ctx.font = '18px sans-serif';
    ctx.fillText('🧺', basket.x, HEIGHT - 10);

    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', () => {
    resetGame();
    running = true;
    startBtn.disabled = true;
    startBtn.textContent = 'Playing...';
    loop();
  });
})();
