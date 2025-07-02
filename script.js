// Typewriter Effect
const texts = [
    "developer",
    "designer",
    "builder"
]
let speed  =75;
const textElements = document.querySelector(".typewriter-type");
let textIndex = 0;
let charcterIndex = 0;
function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000)
    }
}
function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}
window.onload = typeWriter

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      const targetId = this.getAttribute('href'); // Get the target section ID
      const targetElement = document.querySelector(targetId); // Find the target element
      if (targetElement) {
        // Smooth scroll to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  document.querySelector('.social-icon').addEventListener('click', (e) => {
    e.preventDefault(); //stop default `mailto:` behavior
  });

  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('show');
  }
  
  
  