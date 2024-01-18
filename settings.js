import { generatePastelColor } from './helper'; 

document.addEventListener('DOMContentLoaded', () => {

  const heading = document.getElementById('main-heading');

  heading.addEventListener('mouseenter', () => {
    let interval = setInterval(() => {
      heading.style.color = generatePastelColor(); 
    }, 1000);
    
    heading.addEventListener('mouseleave', () => {
      clearInterval(interval);
    });
  });

});