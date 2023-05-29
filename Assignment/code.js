function changeState(state) {
  // Hides all states
  const states = document.getElementsByClassName('state');
  for (let i = 0; i < states.length; i++) {
    states[i].style.display = 'none';
    states[i].innerHTML = ''; // Clears existing particles
  }

  // Deactivates all buttons
  const buttons = document.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  // Shows the selected state
  const selectedState = document.getElementById(state);
  selectedState.style.display = 'block';

  // Activates the corresponding button
  document.getElementById(state + 'Btn').classList.add('active');

  // Creates particles based on the selected state
  if (state === 'solid') {
    createSolidParticles(selectedState);
  } else if (state === 'liquid') {
    createLiquidParticles(selectedState);
  } else if (state === 'gas') {
    createGasParticles(selectedState);
  }
}

// Collision Code
function Particle(x, y, dx, dy, size, container) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.size = size;
  this.containerWidth = container.offsetWidth;
  this.containerHeight = container.offsetHeight;
  
  this.element = document.createElement('div');
  this.element.classList.add('particle');
  this.element.style.width = `${this.size}px`;
  this.element.style.height = `${this.size}px`;
  container.appendChild(this.element);
  
  this.updatePosition = function() {
    this.x += this.dx;
    this.y += this.dy;
    
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
  
  this.checkCollision = function(particles) {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
  
      if (particle !== this) {
        const dx = this.x - particle.x;
        const dy = this.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + particle.size) {
          const angle = Math.atan2(dy, dx);
          const targetAngle = angle + Math.PI;
          const sin = Math.sin(targetAngle);
          const cos = Math.cos(targetAngle);
  
          const overlap = this.size + particle.size - distance;
  
          this.x += overlap * cos * 0.5;
          this.y += overlap * sin * 0.5;
  
          particle.x -= overlap * cos * 0.5;
          particle.y -= overlap * sin * 0.5;
  
          const relativeVelocityX = this.dx - particle.dx;
          const relativeVelocityY = this.dy - particle.dy;
          const dotProduct = dx * relativeVelocityX + dy * relativeVelocityY;
  
          if (dotProduct > 0) {
            const totalMass = this.size + particle.size;
            const impulseX = (2 * dotProduct * dx) / (distance * totalMass);
            const impulseY = (2 * dotProduct * dy) / (distance * totalMass);
  
            this.dx -= impulseX / this.size;
            this.dy -= impulseY / this.size;
  
            particle.dx += impulseX / particle.size;
            particle.dy += impulseY / particle.size;
          }
        }
      }
    }
  }

  this.checkContainerCollision = function() {
    if (this.x - this.size <= 0 || this.x + this.size >= this.containerWidth) {
      this.dx = -this.dx;
    }
    
    if (this.y - this.size <= 0 || this.y + this.size >= this.containerHeight) {
      this.dy = -this.dy;
    }
  }
}

// Creates the Particles for each state
function createSolidParticles(container) {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const particleSize = 5;
  const particleSpacing = 5;
  const particlesPerRow = 10;
  const particlesPerColumn = 10;

  const startX = (containerWidth - particlesPerRow * (particleSize + particleSpacing) + particleSpacing) / 2;
  const startY = (containerHeight - particlesPerColumn * (particleSize + particleSpacing) + particleSpacing) / 2;

  const particles = [];

  for (let i = 0; i < particlesPerColumn; i++) {
    for (let j = 0; j < particlesPerRow; j++) {
      const x = startX + j * (particleSize + particleSpacing);
      const y = startY + i * (particleSize + particleSpacing);

      const particle = new Particle(x, y, 0, 0, particleSize, container);
      particles.push(particle);
    }
  }

  setInterval(updateSolidParticles, 10, particles, containerWidth, containerHeight);
}

function updateSolidParticles(particles, containerWidth, containerHeight) {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    
    particle.checkContainerCollision();
    particle.checkCollision(particles);
    
    particle.updatePosition();
  }
}

function createLiquidParticles(container) {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const particleCount = 50;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * (containerWidth - 10);
    const y = Math.random() * (containerHeight - 10);
    const dx = Math.random() * 2 - 1;
    const dy = Math.random() * 2 - 1;
    const size = 5;
    
    const particle = new Particle(x, y, dx, dy, size, container);
    particles.push(particle);
  }
  
  setInterval(updateLiquidParticles, 10, particles, containerWidth, containerHeight);
}

function updateLiquidParticles(particles, containerWidth, containerHeight) {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    
    particle.checkContainerCollision();
    particle.checkCollision(particles);
    
    particle.updatePosition();
  }
}

function createGasParticles(container) {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const particleCount = 20;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * (containerWidth - 10);
    const y = Math.random() * (containerHeight - 10);
    const dx = Math.random() * 4 - 2;
    const dy = Math.random() * 4 - 2;
    const size = 5;
    
    const particle = new Particle(x, y, dx, dy, size, container);
    particles.push(particle);
  }
  
  setInterval(updateGasParticles, 10, particles, containerWidth, containerHeight);
}

function updateGasParticles(particles, containerWidth, containerHeight) {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    
    particle.checkContainerCollision();
    particle.checkCollision(particles);
    
    particle.updatePosition();
  }
}