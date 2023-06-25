// Particle class
class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = {
        x: (Math.random() - 0.5) * 2, // Random initial velocity
        y: (Math.random() - 0.5) * 2 // Random initial velocity
      };
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  
      // Bounce off the container
      if (this.x + this.radius > containerWidth || this.x - this.radius < 0) {
        this.velocity.x *= -1;
      }
      if (this.y + this.radius > containerHeight || this.y - this.radius < 0) {
        this.velocity.y *= -1;
      }
  
      // Bounce off other particles
      particles.forEach(particle => {
        if (particle === this) return;
  
        const dx = this.x - particle.x;
        const dy = this.y - particle.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
  
        if (distance < this.radius + particle.radius) {
          // Collision occurred
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);
  
          // Rotate particle positions
          const pos1 = { x: 0, y: 0 };
          const pos2 = rotate(dx, dy, sin, cos, true);
  
          // Rotate particle velocities
          const vel1 = rotate(this.velocity.x, this.velocity.y, sin, cos, true);
          const vel2 = rotate(particle.velocity.x, particle.velocity.y, sin, cos, true);
  
          // Perform collision resolution
          const vxTotal = vel1.x - vel2.x;
          vel1.x = ((this.radius - particle.radius) * vel1.x + 2 * particle.radius * vel2.x) / (this.radius + particle.radius);
          vel2.x = vxTotal + vel1.x;
  
          // Update positions
          pos1.x += vel1.x;
          pos2.x += vel2.x;
  
          // Rotate positions back
          const finalPos1 = rotate(pos1.x, pos1.y, sin, cos, false);
          const finalPos2 = rotate(pos2.x, pos2.y, sin, cos, false);
  
          // Adjust particle positions
          particle.x = this.x + finalPos2.x;
          particle.y = this.y + finalPos2.y;
          this.x = this.x + finalPos1.x;
          this.y = this.y + finalPos1.y;
  
          // Rotate velocities back
          const finalVel1 = rotate(vel1.x, vel1.y, sin, cos, false);
          const finalVel2 = rotate(vel2.x, vel2.y, sin, cos, false);
  
          // Update particle velocities
          this.velocity.x = finalVel1.x;
          this.velocity.y = finalVel1.y;
          particle.velocity.x = finalVel2.x;
          particle.velocity.y = finalVel2.y;
        }
      });
  
      this.draw();
    }
  }
  
  // Utility function to rotate positions and velocities
  function rotate(x, y, sin, cos, reverse) {
    return {
      x: (reverse ? x * cos + y * sin : x * cos - y * sin),
      y: (reverse ? y * cos - x * sin : y * cos + x * sin)
    };
  }
  
  // Canvas setup
  const canvas = document.getElementById('container');
  const ctx = canvas.getContext('2d');
  let containerWidth, containerHeight;
  
  // Set the container size
  function setContainerSize() {
    containerWidth = canvas.offsetWidth;
    containerHeight = canvas.offsetHeight;
    canvas.width = containerWidth;
    canvas.height = containerHeight;
  }
  
  // Particle simulation variables
  let particles = [];
  
  // Add particles to the simulation
  function addParticles(numParticles) {
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * (containerWidth - radius * 2) + radius;
      const y = Math.random() * (containerHeight - radius * 2) + radius;
      const radius = 10;
  
      particles.push(new Particle(x, y, radius, 'rgba(255, 255, 255, 0.7)'));
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, containerWidth, containerHeight);
  
    particles.forEach(particle => {
      particle.update();
    });
  
    requestAnimationFrame(animate);
  }
  
  // Event listeners for buttons
  document.getElementById('solid').addEventListener('click', () => {
    particles = [];
    addParticles(100); // Amount of particles for solids
    
    particles.forEach(particle => {
      particle.draw();
    });
  });
  
  document.getElementById('liquid').addEventListener('click', () => {
    particles = [];
    addParticles(50); // Amount of particles for solids
    
    particles.forEach(particle => {
      particle.draw();
    });
  });
  
  document.getElementById('gas').addEventListener('click', () => {
    particles = [];
    addParticles(20); // Amount of particles for solids
    
    particles.forEach(particle => {
      particle.draw();
    });
  });
  
  // Initialize the simulation
  setContainerSize();
  addParticles(100);
  animate();