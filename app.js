/* ============================================================
   SLEEK MODERN LUXURY BIRTHDAY CARD - APP LOGIC
   Featuring Chandu's Life Stages, Future Chapters, & Happy Birthday Melody
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Photo Catalog: Chandu's 4 Life Stages + 1 Couple Photo
  const photosData = [
    {
      id: 0,
      src: "assests/chandu 1.jpeg",
      title: "Chapter I: The Little Adventurer",
      caption: "A playful boy in oversized shoes, full of pure innocence, laughter, and curiosity about the big world.",
      tag: "CHILDHOOD"
    },
    {
      id: 1,
      src: "assests/chandu 2.png",
      title: "Chapter II: The Bright Dreamer",
      caption: "In his school uniform with quiet confidence, discovering his passions, learning values, and dreaming big.",
      tag: "SCHOOL DAYS"
    },
    {
      id: 2,
      src: "assests/chandu 3.jpeg",
      title: "Chapter III: Campus Life & Energy",
      caption: "Stepping into university life with passion, faculty sports, camaraderie, and expanding horizons.",
      tag: "UNIVERSITY"
    },
    {
      id: 3,
      src: "assests/chandu 4.jpeg",
      title: "Chapter IV: Chasing The Dream",
      caption: "The handsome, hardworking student today — focused on his studies, dedicated to his future, with his greatest chapters still ahead.",
      tag: "PRESENT"
    },
    {
      id: 4,
      src: "assests/us.jpeg",
      title: "My Favorite Chapter: You & Me",
      caption: "Through study sessions, busy days, and quiet laughs, walking beside you is my favorite miracle. Happy Birthday, my love!",
      tag: "US FOREVER"
    }
  ];

  // 2. Lightbox Functionality
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxText = document.getElementById('lightbox-text');
  const lightboxIndex = document.getElementById('lightbox-index');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = photosData[currentPhotoIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxText.textContent = item.caption;
    lightboxIndex.textContent = `${item.title} (${currentPhotoIndex + 1} of ${photosData.length})`;
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
    updateLightboxContent();
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
    updateLightboxContent();
  }

  // Hook up stage cards click
  const stageCards = document.querySelectorAll('.stage-card');
  stageCards.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
  });

  // Hook up couple photo click
  const coupleCard = document.querySelector('.couple-spotlight-card');
  if (coupleCard) {
    coupleCard.addEventListener('click', () => openLightbox(4));
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextPhoto();
  });
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevPhoto();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });

  // 3. Ambient Stardust Canvas Background
  const starCanvas = document.getElementById('starfield-canvas');
  const starCtx = starCanvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 70;

  function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  }
  resizeStarCanvas();
  window.addEventListener('resize', resizeStarCanvas);

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * starCanvas.width;
      this.y = Math.random() * starCanvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseVal = Math.random() * Math.PI;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.pulseVal += this.pulseSpeed;
      if (this.y < 0) {
        this.y = starCanvas.height;
        this.x = Math.random() * starCanvas.width;
      }
    }
    draw() {
      const alpha = Math.abs(Math.sin(this.pulseVal)) * this.opacity;
      starCtx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
      starCtx.beginPath();
      starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      starCtx.fill();
    }
  }

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star());
  }

  function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();

  // 4. Champagne Sparks & Confetti Engine
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiParticles = [];

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeConfettiCanvas();
  window.addEventListener('resize', resizeConfettiCanvas);

  const luxuryColors = [
    '#f6e8c3', '#ecd599', '#d4af37', '#aa8529', '#ffffff', '#ffd700'
  ];

  class ConfettiParticle {
    constructor(x, y) {
      this.x = x || Math.random() * confettiCanvas.width;
      this.y = y || confettiCanvas.height * 0.35;
      this.size = Math.random() * 8 + 4;
      this.color = luxuryColors[Math.floor(Math.random() * luxuryColors.length)];
      this.speedX = (Math.random() - 0.5) * 12;
      this.speedY = Math.random() * -10 - 4;
      this.gravity = 0.28;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
      this.opacity = 1;
      this.decay = Math.random() * 0.012 + 0.008;
      this.isSparkle = Math.random() > 0.6;
    }
    update() {
      this.speedY += this.gravity;
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;
      this.opacity -= this.decay;
    }
    draw() {
      if (this.opacity <= 0) return;
      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, this.opacity);
      confettiCtx.fillStyle = this.color;
      
      if (this.isSparkle) {
        // Draw 4-point star sparkle
        confettiCtx.beginPath();
        confettiCtx.moveTo(0, -this.size);
        confettiCtx.lineTo(this.size * 0.3, -this.size * 0.3);
        confettiCtx.lineTo(this.size, 0);
        confettiCtx.lineTo(this.size * 0.3, this.size * 0.3);
        confettiCtx.lineTo(0, this.size);
        confettiCtx.lineTo(-this.size * 0.3, this.size * 0.3);
        confettiCtx.lineTo(-this.size, 0);
        confettiCtx.lineTo(-this.size * 0.3, -this.size * 0.3);
        confettiCtx.closePath();
        confettiCtx.fill();
      } else {
        // Draw golden confetti rectangle
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      }
      confettiCtx.restore();
    }
  }

  function triggerCelebration(originX, originY) {
    const burstCount = 85;
    const x = originX || window.innerWidth / 2;
    const y = originY || window.innerHeight / 2;

    for (let i = 0; i < burstCount; i++) {
      confettiParticles.push(new ConfettiParticle(x, y));
    }
  }

  function renderConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.update();
      p.draw();
      if (p.opacity <= 0 || p.y > confettiCanvas.height + 50) {
        confettiParticles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderConfetti);
  }
  renderConfetti();

  const celebrateBtn = document.getElementById('celebrate-btn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', (e) => {
      triggerCelebration(e.clientX, e.clientY);
    });
  }

  const toastBtn = document.getElementById('toast-btn');
  if (toastBtn) {
    toastBtn.addEventListener('click', (e) => {
      triggerCelebration(e.clientX, e.clientY);
    });
  }

  // 5. Interactive Candle Blowout
  const candleFlame = document.getElementById('candle-flame');
  const candleStatus = document.getElementById('candle-status');
  const candleTrigger = document.getElementById('candle-trigger');

  if (candleTrigger) {
    candleTrigger.addEventListener('click', (e) => {
      if (!candleFlame.classList.contains('blown-out')) {
        candleFlame.classList.add('blown-out');
        candleStatus.textContent = '✨ Happy Birthday Chandu! May all your dreams come true! ✨';
        candleStatus.style.color = '#fae3a6';
        triggerCelebration(e.clientX, e.clientY);
      } else {
        candleFlame.classList.remove('blown-out');
        candleStatus.textContent = 'Click the flame to blow it out & lock in your wish!';
        candleStatus.style.color = '';
      }
    });
  }

  // 6. Iconic "Happy Birthday To You" Melody Synthesizer via Web Audio API
  let audioCtx = null;
  let isPlaying = false;
  let songTimeout = null;
  const musicBtn = document.getElementById('music-toggle-btn');
  const musicBtnText = document.getElementById('music-btn-text');
  const soundWave = musicBtn.querySelector('.sound-wave');

  // Exact Note Frequencies (Hz)
  const NOTES = {
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
    C4: 261.63,
    E4: 329.63,
    F4: 349.23,
    G3: 196.00
  };

  // Full "Happy Birthday" score [note, duration in seconds, bassChordFreq]
  const birthdayScore = [
    // Line 1: Hap-py Birth-day to you
    { note: NOTES.G4, dur: 0.35, chord: NOTES.C4 },
    { note: NOTES.G4, dur: 0.25 },
    { note: NOTES.A4, dur: 0.60 },
    { note: NOTES.G4, dur: 0.60 },
    { note: NOTES.C5, dur: 0.60, chord: NOTES.E4 },
    { note: NOTES.B4, dur: 1.10, chord: NOTES.G4 },

    // Line 2: Hap-py Birth-day to you
    { note: NOTES.G4, dur: 0.35, chord: NOTES.G3 },
    { note: NOTES.G4, dur: 0.25 },
    { note: NOTES.A4, dur: 0.60 },
    { note: NOTES.G4, dur: 0.60 },
    { note: NOTES.D5, dur: 0.60, chord: NOTES.B4 },
    { note: NOTES.C5, dur: 1.10, chord: NOTES.C4 },

    // Line 3: Hap-py Birth-day dear Chan-du
    { note: NOTES.G4, dur: 0.35, chord: NOTES.C4 },
    { note: NOTES.G4, dur: 0.25 },
    { note: NOTES.G5, dur: 0.60, chord: NOTES.E4 },
    { note: NOTES.E5, dur: 0.60 },
    { note: NOTES.C5, dur: 0.60, chord: NOTES.F4 },
    { note: NOTES.B4, dur: 0.60 },
    { note: NOTES.A4, dur: 1.10, chord: NOTES.F5 },

    // Line 4: Hap-py Birth-day to you!
    { note: NOTES.F5, dur: 0.35, chord: NOTES.F4 },
    { note: NOTES.F5, dur: 0.25 },
    { note: NOTES.E5, dur: 0.60, chord: NOTES.C4 },
    { note: NOTES.C5, dur: 0.60, chord: NOTES.E4 },
    { note: NOTES.D5, dur: 0.60, chord: NOTES.G4 },
    { note: NOTES.C5, dur: 1.40, chord: NOTES.C4 }
  ];

  function playTone(freq, startTime, duration, isChord = false) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = isChord ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    const volume = isChord ? 0.03 : 0.08;
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  let noteIndex = 0;

  function playNextBirthdayNote() {
    if (!isPlaying) return;

    const item = birthdayScore[noteIndex];
    const now = audioCtx.currentTime;

    playTone(item.note, now, item.dur * 1.3);

    if (item.chord) {
      playTone(item.chord, now, item.dur * 2.0, true);
    }

    noteIndex = (noteIndex + 1) % birthdayScore.length;
    const delay = (noteIndex === 0) ? (item.dur * 1000 + 1200) : (item.dur * 1000);
    songTimeout = setTimeout(playNextBirthdayNote, delay);
  }

  function toggleMusic() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isPlaying) {
      isPlaying = true;
      noteIndex = 0;
      soundWave.classList.add('playing');
      musicBtnText.textContent = '🔊 Pause Song';
      playNextBirthdayNote();
    } else {
      isPlaying = false;
      soundWave.classList.remove('playing');
      musicBtnText.textContent = '🎵 Play Birthday Song';
      if (songTimeout) clearTimeout(songTimeout);
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // 7. Scroll To Top Button
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
