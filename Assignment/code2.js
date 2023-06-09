var container = document.getElementById('container');
var particles = [];

function createParticle() {
  var particle = document.createElement('div');
  particle.className = 'particle';
  container.appendChild(particle);

  var containerRect = container.getBoundingClientRect();
  var particleSize = 20;
  var left = Math.random() * (containerRect.width - particleSize);
  var top = Math.random() * (containerRect.height - particleSize);
  var speedX = (Math.random() - 0.5) * 2; // Random speed along X-axis
  var speedY = (Math.random() - 0.5) * 2; // Random speed along Y-axis

  particle.style.left = left + 'px';
  particle.style.top = top + 'px';
  particle.speedX = speedX;
  particle.speedY = speedY;

  particles.push(particle);
}

function updateParticles() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var particleSize = particle.offsetWidth;

    // Update position
    particle.style.left = particle.offsetLeft + particle.speedX + 'px';
    particle.style.top = particle.offsetTop + particle.speedY + 'px';

    var containerRect = container.getBoundingClientRect();
    var containerWidth = containerRect.width;
    var containerHeight = containerRect.height;

    // Check collision with container boundaries
    if (
      particle.offsetLeft <= 0 ||
      particle.offsetLeft + particleSize >= containerWidth
    ) {
      particle.speedX = -particle.speedX;
    }
    if (
      particle.offsetTop <= 0 ||
      particle.offsetTop + particleSize >= containerHeight
    ) {
      particle.speedY = -particle.speedY;
    }

    // Check collision with other particles
    for (var j = i + 1; j < particles.length; j++) {
      var otherParticle = particles[j];
      if (checkCollision(particle, otherParticle)) {
        // Calculate new speeds after collision
        var tempSpeedX = particle.speedX;
        var tempSpeedY = particle.speedY;
        particle.speedX = otherParticle.speedX;
        particle.speedY = otherParticle.speedY;
        otherParticle.speedX = tempSpeedX;
        otherParticle.speedY = tempSpeedY;
      }
    }
  }

  requestAnimationFrame(updateParticles);
}

function checkCollision(particle1, particle2) {
  var rect1 = particle1.getBoundingClientRect();
  var rect2 = particle2.getBoundingClientRect();

  return (
    rect1.left < rect2.left + rect2.width &&
    rect1.left + rect1.width > rect2.left &&
    rect1.top < rect2.top + rect2.height &&
    rect1.top + rect1.height > rect2.top
  );
}

function changeState(state) {
  container.innerHTML = '';
  particles = [];

  var particleCount = 30;
  if (state === 'liquid') {
    particleCount = 20;
  } else if (state === 'gas') {
    particleCount = 10;
  }

  for (var i = 0; i < particleCount; i++) {
    createParticle();
  }

  var particleElements = document.getElementsByClassName('particle');
  for (var i = 0; i < particleElements.length; i++) {
    particleElements[i].classList.add('state-' + state);
  }

  updateParticles();
}
