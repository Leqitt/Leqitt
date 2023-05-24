// Set up canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY = -this.speedY;
    }

    this.draw();
  }
}

// Temperature control
let temperature = 50; // Initial temperature

const temperatureRange = document.getElementById('temperatureRange');
const temperatureValue = document.getElementById('temperatureValue');

temperatureRange.addEventListener('input', () => {
  temperature = temperatureRange.value;
  temperatureValue.textContent = temperature;
});

// State of Matter control
let state = 'solid'; // Initial state of matter

const stateSelect = document.getElementById('stateSelect');

stateSelect.addEventListener('change', () => {
  state = stateSelect.value;
  createParticles();
});

// Create particles
let particles = [];
let numParticles = 100;
const particleSize = 5;
const colors = ['#FF0000', '#00FF00', '#0000FF'];

function createParticles() {
  particles = [];

  const particleSpeed = temperature / 10;

  if (state === 'solid') {
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = particleSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = 0;
      const speedY = 0;

      particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
  } else if (state === 'liquid') {
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = particleSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() - 0.5) * particleSpeed;
      const speedY = (Math.random() - 0.5) * particleSpeed;

      particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
  } else if (state === 'gas') {
    for (let i = 0; i < numParticles; i++) {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const size = particleSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const speedX = Math.cos(angle) * particleSpeed;
      const speedY = Math.sin(angle) * particleSpeed;

      particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

createParticles();
animate();
