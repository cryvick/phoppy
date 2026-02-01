import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import anime from 'https://cdn.skypack.dev/animejs';

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const imageDisplay = document.getElementById('imageDisplay');
const valentineQuestion = document.getElementById('valentineQuestion');
const responseButtons = document.getElementById('responseButtons');

let noClickCount = 0;
let buttonHeight = 48;
let buttonWidth = 80;
let fontSize = 20;
const imagePaths = ['./images/image1.gif','./images/image2.gif','./images/image3.gif','./images/image4.gif','./images/image5.gif','./images/image6.gif','./images/image7.gif'];

function playSound(soundPath) {const audio = new Audio(soundPath); audio.play();}

// --- TIMER A 4 SECONDI ---
setTimeout(() => {
    noButton.style.transition = "none";
    noButton.style.position = 'fixed';
    noButton.style.top = '-100px';
    noButton.style.left = '-100px';

    setInterval(() => {
         const top = Math.random() * (window.innerHeight - noButton.offsetHeight);
         const left = Math.random() * (window.innerWidth - noButton.offsetWidth);
         noButton.style.top = top + "px";
         noButton.style.left = left + "px";
    }, 1100); // Velocità: 1.1 secondi
}, 2500);     // Timer: 2.5 secondi

const getRandomNumber = (num) => {return Math.floor(Math.random() * (num + 1));};
  
  const runawayButtonLogic = (button) => {
    const moveButton = function () {
      if (this.textContent.trim() === "Dì di sì o...") {
        const top = getRandomNumber(window.innerHeight - this.offsetHeight);
        const left = getRandomNumber(window.innerWidth - this.offsetWidth);
  
        animateMove(this, "top", top).play();
        animateMove(this, "left", left).play();
      }
    };
    button.addEventListener("mouseover", moveButton);
    button.addEventListener("click", moveButton);};
  
  const animateMove = (element, prop, pixels) =>
    anime({
      targets: element,
      [prop]: `${pixels}px`,
      easing: "easeOutCirc",
      duration: 500,
    });
  
  noButton.addEventListener("click", () => {
    playSound('./sounds/click.mp3');
    if (noClickCount < 4) {
      noClickCount++;
      imageDisplay.src = imagePaths[noClickCount] || "./images/image1.gif";
  
      buttonHeight += 35; buttonWidth += 35; fontSize += 25;
      yesButton.style.height = `${buttonHeight}px`;
      yesButton.style.width = `${buttonWidth}px`;
      yesButton.style.fontSize = `${fontSize}px`;
  
      const messages = ["No","Sei sicura?","Poppy per favore...","Non farmi questo 😢","Dì di sì o...",];
  
      if (noClickCount === 4) {
        const newButton = document.createElement("button");
        newButton.id = "runawayButton";
        newButton.textContent = "Dì di sì o...";
        newButton.style.position = "absolute";
        const yesButtonRect = yesButton.getBoundingClientRect();
        newButton.style.top = `${yesButtonRect.bottom + 10}px`;
        newButton.style.left = `${yesButtonRect.left + yesButtonRect.width / 2 + 24}px`;

        newButton.style.backgroundColor = "#ff5a5f";
        newButton.style.color = "white";
        newButton.style.padding = "12px 20px";
        newButton.style.borderRadius = "8px";
        newButton.style.cursor = "pointer";
        newButton.style.fontSize = "20px";
        newButton.style.fontWeight = "bold";
  
        noButton.replaceWith(newButton);
        runawayButtonLogic(newButton);
      } else {
        noButton.textContent = messages[noClickCount];
      }
    }
  });
  
  yesButton.addEventListener("click", () => {
    playSound('./sounds/click.mp3');
    imageDisplay.remove(); 
    responseButtons.style.display = "none"; 
  
    // --- TESTO FINALE MODIFICATO ---
    valentineQuestion.innerHTML = `
      <img src="./images/image7.gif" alt="Celebration duckie" style="display: block; margin: 0 auto; width: 200px; height: auto;"/>
      Congratulazioni, hai rinnovato per l'eternità l'amore che ci lega!!<br>
      <span style="font-size: 20px; color: #bd1e59; white-space: nowrap;">Il mio cuore è, adesso, al posto giusto. ❤️</span>
    `;
    valentineQuestion.style.textAlign = "center"; 
  
    const bounceImage = document.createElement("img");
    bounceImage.src = "./images/baddie.jpg";
    bounceImage.alt = "Baddie";
    bounceImage.style.position = "absolute";
    bounceImage.style.width = "300px";
    bounceImage.style.height = "325px";
    bounceImage.style.borderRadius = "50%";
    document.body.appendChild(bounceImage);
  
    startBouncing(bounceImage);
  
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#FF5A5F", "#3DCC91", "#FFD1DC"],
    });
  });
  
  function startBouncing(element) {
    let x = Math.random() * (window.innerWidth - element.offsetWidth);
    let y = Math.random() * (window.innerHeight - element.offsetHeight);
    let dx = 2; let dy = 2; let rotation = 0;
  
    function move() {
      const viewportWidth = window.innerWidth - element.offsetWidth;
      const viewportHeight = window.innerHeight - element.offsetHeight;
  
      if (x <= 0 || x >= viewportWidth) {dx *= -1; rotation += 15;
        anime({
          targets: element,
          translateX: dx > 0 ? x + 20 : x - 20, 
          duration: 300,
          easing: "easeOutElastic(1, .6)", 
      });
  }

      if (y <= 0 || y >= viewportHeight) {dy *= -1; rotation += 15;
        anime({
          targets: element,
          translateY: dy > 0 ? y + 20 : y - 20, 
          duration: 300,
          easing: "easeOutElastic(1, .6)", 
      });
  }
        
      x += dx; y += dy;
  
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.transform = `rotate(${rotation}deg)`;
  
      requestAnimationFrame(move); 
    }
  
    move();
  }



