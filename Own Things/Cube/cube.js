var cube = document.getElementById('cube');
var currentRotationX = 0;
var currentRotationY = 0;

cube.addEventListener('click', function() {
    currentRotationX += 90;
    currentRotationY += 90;
    cube.style.transform = 'rotateX(' + currentRotationX + 'deg) rotateY(' + currentRotationY + 'deg)';
});
