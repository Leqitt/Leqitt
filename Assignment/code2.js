const container = document.querySelector('#container');
const solidButton = document.querySelector('#solid');
const liquidButton = document.querySelector('#liquid');
const gasButton = document.querySelector('#gas');
const temperatureSlider = document.querySelector('#temperature');
const temperatureValue = document.querySelector('#temperature-value');
const toggleInfoButton = document.querySelector('#toggle-info');
const infoSection = document.querySelector('#info');

let state = 'solid';
let temperature = 0;

const particles = [];

for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      container.appendChild(particle);
      particles.push({
          element :particle ,
          x :Math.random() *480 ,
          y :Math.random() *480 ,
          vx :(Math.random() -0.5) *temperature /10 ,
          vy :(Math.random() -0.5) *temperature /10
      });
}

solidButton.addEventListener('click', () => {
      state ='solid' ;
      temperature =0 ;
      temperatureSlider.value =temperature ;
      temperatureValue.textContent =temperature ;

      // update particle positions
      for (let i =0 ; i<particles.length ; i++) {
          const particle =particles[i] ;
          particle.x =(i %10) *30 +100 ;
          particle.y =Math.floor(i /10) *30 +100 ;
          particle.vx =0 ;
          particle.vy =0 ;
      }
});

liquidButton.addEventListener('click', () => {
      state ='liquid' ;
      temperature =0 ;
      temperatureSlider.value =temperature ;
      temperatureValue.textContent =temperature ;

      // update particle positions
      for (let i =0 ; i<particles.length ; i++) {
          const particle =particles[i] ;
          particle.x =Math.random() *300 +100 ;
          particle.y =Math.random() *300 +100 ;
          particle.vx =(Math.random() -0.5) *temperature /10 ;
          particle.vy =(Math.random() -0.5) *temperature /10 ;
      }
});

gasButton.addEventListener('click', () => {
      state ='gas' ;
      temperature =0 ;
      temperatureSlider.value =temperature ;
      temperatureValue.textContent =temperature ;

      // update particle positions
      for (let i =0 ; i<particles.length ; i++) {
          const particle =particles[i] ;
          particle.x =Math.random() *480 ;
          particle.y =Math.random() *480 ;
          particle.vx =(Math.random() -0.5) *temperature /10 ;
          particle.vy =(Math.random() -0.5) *temperature /10 ;
      }
});

temperatureSlider.addEventListener('input', (event) => {
      temperature =event.target.value ;

      for (const particle of particles) {
          particle.vx =(Math.random() -0.5) *temperature /10 ;
          particle.vy =(Math.random() -0.5) *temperature /10 ;
      }

      temperatureValue.textContent =temperature ;
});

toggleInfoButton.addEventListener('click', () => {
     if (infoSection.style.display ==='none') {
         infoSection.style.display ='block';
         toggleInfoButton.textContent ='Hide Info';
     } else {
         infoSection.style.display ='none';
         toggleInfoButton.textContent ='Show Info';
     }
});

function update() {
     container.classList.remove('solid', 'liquid', 'gas');
     container.classList.add(state);

     for (const particle of particles) {
         // update particle position
         particle.x +=particle.vx;
         particle.y +=particle.vy;

         // check for collision with walls
         if (particle.x <0) {
             particle.x =0;
             particle.vx *= -1;
         } else if (particle.x >480) {
             particle.x =480;
             particle.vx *= -1;
         }

         if (particle.y <0) {
             particle.y =0;
             particle.vy *= -1;
         } else if (particle.y >480) {
             particle.y =480;
             particle.vy *= -1;
         }

         // check for collision with other particles
         for (const otherParticle of particles) {
             if (particle ===otherParticle ) continue;

             const dx =otherParticle.x -particle.x;
             const dy =otherParticle.y -particle.y;
             const distance =Math.sqrt(dx *dx +dy *dy);

             if (distance <20) {
                 // particles are colliding
                 const angle =Math.atan2(dy, dx);
                 const sin =Math.sin(angle);
                 const cos =Math.cos(angle);

                 // rotate velocities
                 const vx1 =cos *particle.vx +sin *particle.vy;
                 const vy1 =cos *particle.vy -sin *particle.vx;
                 const vx2 =cos *otherParticle.vx +sin *otherParticle.vy;
                 const vy2 =cos *otherParticle.vy -sin *otherParticle.vx;

                 // update velocities
                 particle.vx=vx2;
                 particle.vy=vy2;
                 otherParticle.vx=vx1;
                 otherParticle.vy=vy1;
             }
         }

         // update particle position
         particle.element.style.left=particle.x +'px';
         particle.element.style.top=particle.y +'px';
     }

     requestAnimationFrame(update);
}

update();
