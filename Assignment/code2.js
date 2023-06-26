// Get the elements from the HTML document
const container = document.getElementById("container");
const solidBtn = document.getElementById("solid");
const liquidBtn = document.getElementById("liquid");
const gasBtn = document.getElementById("gas");
const tempSlider = document.getElementById("temp");
const tempValue = document.getElementById("temp-value");

// Define some constants and variables
const NUM_PARTICLES = 100; // The number of particles to create
const GRAVITY = -0.1; // The gravity force acting on the particles
const FRICTION = -0.9; // The friction coefficient for collisions
const BOUNCE = -0.8; // The bounce coefficient for collisions
let particles = []; // An array to store the particle objects
let state = "solid"; // The current state of matter
let temp = tempSlider.value; // The current temperature

// A function to create a particle object with some properties and methods
function Particle(x, y, radius, color) {
  
  // Initialize the particle properties
  this.x = Math.random() * (container.offsetWidth - 2 * radius) + radius; // The x-coordinate of the particle
  this.y = Math.random() * (container.offsetHeight - 2 * radius) + radius; // The y-coordinate of the particle
  this.radius = radius; // The radius of the particle
  this.color = color; // The color of the particle
  this.vx = Math.random() * temp / (radius * radius); // The x-velocity of the particle
  this.vy = Math.random() * temp / (radius * radius); // The y-velocity of the particle
  
  
// A method to draw the particle on the container element
this.draw = function() {
  
    // Create a div element for the particle
    this.element = document.createElement("div");
    
    // Set the style attributes of the element
    this.element.className = "particle " + state; // Add the particle and state classes
    this.element.style.width = this.radius * 2 + "px"; // Set the width based on the radius
    this.element.style.height = this.radius * 2 + "px"; // Set the height based on the radius
    this.element.style.backgroundColor = this.color; // Set the background color
    
    // Append the element to the container element
    container.appendChild(this.element);
  };
  
  // A method to update the position and velocity of the particle
  this.update = function() {
    
    // Check for collisions with the container boundaries
    if (this.x + this.radius > container.offsetWidth || this.x - this.radius < 0) {
      // Reverse the x-velocity and apply some friction
      this.vx = this.vx * FRICTION;
    }
    
    if (this.y + this.radius > container.offsetHeight || this.y - this.radius < 0) {
      // Reverse the y-velocity and apply some friction and bounce
      this.vy = this.vy * FRICTION * BOUNCE;
    }
    
    // Check for collisions with other particles
    for (let i = 0; i < particles.length; i++) {
      // Get the other particle
      let other = particles[i];
      
      // Skip if it is the same particle
      if (this === other) continue;
      
      // Calculate the distance and angle between the particles
      let dx = other.x - this.x;
      let dy = other.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let angle = Math.atan2(dy, dx);
      
      // Check if the distance is less than the sum of the radii
      if (distance < this.radius + other.radius) {
        // Calculate the new velocities after collision
        let newVx1 = this.vx * Math.cos(angle) - this.vy * Math.sin(angle);
        let newVy1 = this.vx * Math.sin(angle) + this.vy * Math.cos(angle);
        let newVx2 = other.vx * Math.cos(angle) - other.vy * Math.sin(angle);
        let newVy2 = other.vx * Math.sin(angle) + other.vy * Math.cos(angle);
        
        // Swap the x-velocities and apply some bounce
        let tempVx1 = newVx1;
        newVx1 = newVx2 * BOUNCE;
        newVx2 = tempVx1 * BOUNCE;
        
        // Rotate back to the original coordinate system
        this.vx = newVx1 * Math.cos(angle) + newVy1 * Math.sin(angle);
        this.vy = newVy1 * Math.cos(angle) - newVx1 * Math.sin(angle);
        other.vx = newVx2 * Math.cos(angle) + newVy2 * Math.sin(angle);
        other.vy = newVy2 * Math.cos(angle) - newVx2 * Math.sin(angle);
        
        // Move the particles apart to avoid overlapping
        let overlap = (this.radius + other.radius) - distance;
        let offsetX = overlap * Math.cos(angle) / 2;
        let offsetY = overlap * Math.sin(angle) / 2;
        this.x -= offsetX;
        this.y -= offsetY;
        other.x += offsetX;
        other.y += offsetY;
      }
    }
    
    // Update the position based on the velocity
    this.x += this.vx;
    this.y += this.vy;
    
    // Apply some gravity to the y-velocity
    this.vy += GRAVITY;
    
    // Set the style attributes of the element to match the position
    this.element.style.left = this.x - this.radius + "px";
    this.element.style.top = this.y - this.radius + "px";
  };
}

// A function to create and draw the particles based on the state of matter
function createParticles() {
  
  // Clear the container element
  container.innerHTML = "";
  
  // Clear the particles array
  particles = [];
  
  // Loop for each particle
  for (let i = 0; i < NUM_PARTICLES; i++) {
    
    // Generate a random position inside the container
    let x = Math.random() * (container.offsetWidth - 20) + 10;
    let y = Math.random() * (container.offsetHeight - 20) + 10;
    
    // Create a new particle object with different properties based on the state
    switch (state) {
      case "solid":
      var particle = new Particle(x, y, 10, "blue");
      break;
      case "liquid":
      var particle = new Particle(x, y, 7.5, "green");
      break;
      case "gas":
      var particle = new Particle(x, y, 5, "red");
      break;
    }
    
    // Draw the particle on the container element
    particle.draw();
    
    // Add the particle to the particles array
    particles.push(particle);
  }
}

// A function to update and animate the particles
function animateParticles() {
  
  // Loop for each particle
  for (let i = 0; i < particles.length; i++) {
    
    // Get the particle from the array
    let particle = particles[i];
    
    // Update the particle position and velocity
    particle.update();
  }
  
  // Request the next animation frame
  requestAnimationFrame(animateParticles);
}

// A function to change the state of matter and create new particles
function changeState(newState) {
  
  // Set the state variable to the new state
  state = newState;
  
  // Create new particles based on the new state
  createParticles();
}

// A function to change the temperature and update the velocities of the particles
function changeTemp(newTemp) {
  
  // Set the temp variable to the new temperature
  temp = newTemp;
  
  // Update the temp value display
  tempValue.textContent = temp;
  
  // Loop for each particle
  for (let i = 0; i < particles.length; i++) {
    
    // Get the particle from the array
    let particle = particles[i];
    
    // Update the x-velocity and y-velocity based on the temperature and radius
    particle.vx = Math.random() * temp / (particle.radius * particle.radius);
    particle.vy = Math.random() * temp / (particle.radius * particle.radius);
  }
}

// Call the createParticles function to start the simulation
createParticles();

// Call the animateParticles function to start the animation loop
animateParticles();
