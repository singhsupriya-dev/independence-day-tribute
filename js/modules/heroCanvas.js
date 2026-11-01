/**
 * Hero Canvas & Interactive Particle Atmosphere
 * Rotating Ashoka Chakra background & drifting archival dust particles.
 */

export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle System (Dust of History / Golden Embers)
  const particles = [];
  const particleCount = Math.min(width < 768 ? 30 : 65, 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.4 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.6 ? '#E2B86E' : (Math.random() > 0.5 ? '#D97724' : '#C8BFB6')
    });
  }

  // Interactive mouse tracking for parallax floating fragments
  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Parallax on floating text fragments
    const fragments = document.querySelectorAll('.hero-floating-fragment');
    fragments.forEach((frag, idx) => {
      const speed = (idx + 1) * 0.02;
      const offsetX = (e.clientX - width / 2) * speed;
      const offsetY = (e.clientY - height / 2) * speed;
      frag.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw and update particles
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    }

    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }

  animate();
}
