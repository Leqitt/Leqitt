// Ball properties
var ball = {
  x: 200,
  y: 0,
  radius: 20,
  color: "red",
  velocity: 0,
};

// Canvas properties
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gravityInput = document.getElementById("gravity");

// Update ball position based on gravity and bouncing
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update ball position
  ball.y += ball.velocity;
  ball.velocity += parseFloat(gravityInput.value) / 100;

  // Check for bouncing
  if (ball.y + ball.radius >= canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.velocity *= -0.8; // Reduce the velocity on bouncing
  }

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  // Request animation frame
  requestAnimationFrame(update);
}

// Start the simulation
update();
