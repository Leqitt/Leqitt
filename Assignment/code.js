var container = document.getElementById('container');
var particles = [];
var particleCount = 0;
var particleSize = 10; // Particle size in pixels
var currentState = 'solid';
var isSimulationRunning = false;

// Function to create particles
function createParticles() {
  var rows = Math.floor(Math.sqrt(particleCount)); // Number of rows
  var cols = Math.ceil(particleCount / rows); // Number of columns
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;
  var padding = 5; // Padding between particles

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (particles.length >= particleCount) {
        break;
      }

      var particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = (j * (particleSize + padding)) + 'px';
      particle.style.top = (i * (particleSize + padding)) + 'px';

      // Check for overlapping particles
      var overlap = particles.some(function(existingParticle) {
        var existingX = parseInt(existingParticle.style.left, 10);
        var existingY = parseInt(existingParticle.style.top, 10);
        var dx = Math.abs(existingX - parseInt(particle.style.left, 10));
        var dy = Math.abs(existingY - parseInt(particle.style.top, 10));

        return (dx < particleSize && dy < particleSize);
      });

      if (!overlap) {
        container.appendChild(particle);
        particles.push(particle);
      }
    }
  }
}

// Function to update particle positions
function updateParticles() {
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  particles.forEach(function(particle) {
    var x = Math.random() * (containerWidth - particleSize);
    var y = Math.random() * (containerHeight - particleSize);

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
  });

  // Stop the simulation
  stopSimulation();
}

// Function to start the simulation
function startSimulation() {
  if (!isSimulationRunning) {
    isSimulationRunning = true;
    updateParticles();
  }
}

// Function to stop the simulation
function stopSimulation() {
  isSimulationRunning = false;
}

// Function to change the state of matter
function changeState(state) {
  currentState = state;

  // Remove existing particles
  particles.forEach(function(particle) {
    container.removeChild(particle);
  });
  particles = [];

  // Set particle count based on the state
  switch (currentState) {
    case 'solid':
      particleCount = 50;
      break;
    case 'liquid':
      particleCount = 30;
      break;
    case 'gas':
      particleCount = 15;
      break;
  }

  createParticles();
  startSimulation();
}

// Initialize the simulation
createParticles();

// Event listeners for state buttons
document.getElementById('solid').addEventListener('click', function() {
  changeState('solid');
});

document.getElementById('liquid').addEventListener('click', function() {
  changeState('liquid');
});

document.getElementById('gas').addEventListener('click', function() {
  changeState('gas');
});
