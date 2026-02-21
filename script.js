let opened = false;

const heart = document.getElementById('heart');
const heartSvg = document.getElementById('heart-svg');
const hint = document.getElementById('hint');
const bg = document.getElementById('bg');
const sun = document.getElementById('sun');
const horizon = document.getElementById('horizon');
const stars = document.getElementById('stars');
const msgs = [
  document.getElementById('msg1'),
  document.getElementById('msg2'),
  document.getElementById('msg3'),
  document.getElementById('msg4'),
];
const clouds = document.querySelectorAll('.cloud');
const birds = document.querySelectorAll('.bird');
const petals = document.querySelectorAll('.petal');
const heartWrap = document.getElementById('heart-wrap');

// Genera stelle
(function() {
  const s = document.getElementById('stars');
  for (let i = 0; i < 60; i++) {
    const d = document.createElement('div');
    d.className = 'star';
    const size = Math.random() * 3 + 1;
    d.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*70}%;
      left:${Math.random()*100}%;
      animation-delay:${Math.random()*4}s;
      animation-duration:${2+Math.random()*3}s;
    `;
    s.appendChild(d);
  }
})();

// Particelle dal cuore
function spawnSparks() {
  const colors = ['#ff8fa3','#ffd700','#ffb347','#e8607a','#f9a8c0','#c0a0ff'];
  for (let i = 0; i < 18; i++) {
    const sp = document.createElement('div');
    sp.className = 'spark';
    const angle = (i / 18) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    sp.style.cssText = `
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --tx:${Math.cos(angle)*dist}px;
      --ty:${Math.sin(angle)*dist}px;
      animation-delay:${Math.random()*0.3}s;
    `;
    heart.appendChild(sp);
    setTimeout(() => sp.remove(), 1200);
  }
}

// Cuoricini fluttuanti
function spawnFloaties() {
  const emojis = ['♥','💕','💗','🌸','✨','💖'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const f = document.createElement('div');
      f.className = 'floaty';
      f.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      f.style.cssText = `
        left:${10 + Math.random()*80}%;
        bottom:${10 + Math.random()*30}%;
        font-size:${1 + Math.random()*1.5}rem;
        animation-duration:${3+Math.random()*2}s;
      `;
      document.body.appendChild(f);
      setTimeout(() => f.remove(), 5000);
    }, i * 180);
  }
}

function openHeart() {
  if (opened) return;
  opened = true;

  // Stop heartbeat, apri cuore
  heart.style.animation = 'none';
  heart.style.transform = 'scale(1.2)';
  heartSvg.classList.add('opened');
  hint.classList.add('hidden');

  spawnSparks();

  // Dissolvenza del cuore
  setTimeout(() => {
    heartWrap.style.transition = 'opacity 1.5s, transform 1.5s';
    heartWrap.style.opacity = '0';
    heartWrap.style.transform = 'scale(0.6)';
    heartWrap.style.pointerEvents = 'none';
  }, 800);

  // Stelle appaiono brevemente
  stars.classList.add('visible');

  // Sfondo alba
  setTimeout(() => {
    bg.classList.add('dawn');
    stars.classList.remove('visible');
    sun.classList.add('rise');
    horizon.classList.add('visible');
    spawnFloaties();
  }, 1800);

  // Nuvole
  setTimeout(() => {
    clouds.forEach((c, i) => {
      setTimeout(() => c.classList.add('visible'), i * 500);
    });
  }, 3000);

  // Uccellini
  setTimeout(() => {
    birds.forEach((b, i) => {
      setTimeout(() => b.classList.add('visible'), i * 800);
    });
  }, 4000);

  // Petali
  setTimeout(() => {
    petals.forEach((p, i) => {
      setTimeout(() => p.classList.add('active'), i * 300);
    });
  }, 3500);

  // Messaggi uno dopo l'altro
  const delays = [3200, 4800, 6200, 8000];
  msgs.forEach((m, i) => {
    setTimeout(() => m.classList.add('visible'), delays[i]);
  });

  // Cuoricini ripetuti
  setInterval(spawnFloaties, 8000);
}

heart.addEventListener('click', openHeart);
heart.addEventListener('touchstart', e => { e.preventDefault(); openHeart(); });