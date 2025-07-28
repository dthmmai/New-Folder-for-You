// Common Elements
const folders = document.querySelectorAll(".folder");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const contentBox = document.getElementById("content-box");
const contentText = document.getElementById("content-text");

// Folder 1 & 2
const box = document.querySelector(".box");
const noteFolder2 = document.querySelector(".note-folder-2");
const noteText = document.querySelector(".note-text");
const pie = document.querySelector(".pie");
const pieCaught = document.querySelector(".pie-caught");
const gift = document.querySelector(".gift");
const flower = document.querySelector(".flower");

// Shadows
const shadowFolder1 = document.querySelector(".shadow-folder-1");
const shadowFolder2 = document.querySelector(".shadow-folder-2");
const shadowFolder3 = document.querySelector(".shadow-folder-3");
const shadowFolder4 = document.querySelector(".shadow-folder-4");

// Folder 3
const folder3Container = document.querySelector(".folder-3-container");
const frameNote3 = document.querySelector(".frame-note-3");
const note3 = document.querySelector(".note-3");
const calendar1_3 = document.querySelector(".calendar-1-3");
const calendar2_3 = document.querySelector(".calendar-2-3");

// Folder 4
const folder4Container = document.querySelector(".folder-4-container");
const pathFolder4 = document.querySelector(".path-folder-4");
const text1 = document.querySelector("#text1 textPath");
const text2 = document.querySelector("#text2");
const text2Path = document.querySelector("#text2 textPath");
const flowerFolder4 = document.querySelector(".flower-folder-4");
const wordsFolder4 = document.querySelectorAll(".flower-folder-4 .circle-text");

// Folder 5
const folder5Container = document.querySelector(".folder-5-container");
const shadowFolder5 = document.querySelector(".shadow-folder-5");
const flowerFolder5 = document.querySelector(".flower-folder-5");
const notiFolder5 = document.querySelector(".noti-folder-5");
const wordsFolder5 = document.querySelectorAll(".flower-folder-5 .circle-text");

// Folder 6
const folder6Container = document.querySelector(".folder-6-container");
const shadowFolder6A = document.querySelector(".shadow-a");
const shadowFolder6B = document.querySelector(".shadow-b");
const arm1 = document.querySelector(".arm1");
const arm2 = document.querySelector(".arm2");
const arm1b = document.querySelector(".arm1b");
const arm2b = document.querySelector(".arm2b");
const holdText = document.querySelector("#holdText");
const mapText = document.querySelector("#mapText");
const textFolder6 = document.querySelector(".text-folder-6");

// Folder 7
const folder7Container = document.querySelector(".folder-7-container");
const shadowFolder7 = document.querySelector(".shadow-folder-7");
const musicFolder7 = document.querySelector(".music-folder-7");
const noteText7 = musicFolder7.querySelector(".note-text");

// Folder 8
const folder8Container = document.querySelector(".folder-8-container");
const shadowFolder8 = document.querySelector(".shadow-folder-8");
const endFolder8 = document.querySelector(".end-folder-8");

// Global Variables
let angle = 0;
const total = folders.length;
const radius = 250;
let activeIndex = 0;
let clickCount = 0;

// Timers
let pieTimeout = null;
let pieMoveTimeout = null;
let giftTimeout = null;
let folder3Timers = [];
let folder4Timers = [];

const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");


// Arrange Folders in Circle
function updatePositions() {
  for (let i = 0; i < total; i++) {
    const theta = ((2 * Math.PI) / total) * i + angle;
    const x = Math.cos(theta) * radius + 350;
    const y = Math.sin(theta) * radius + 400;

    folders[i].style.left = `${x}px`;
    folders[i].style.top = `${y}px`;

    if (Math.abs(y - 150) < 50) {
      folders[i].classList.add("active");
      activeIndex = i;
    } else {
      folders[i].classList.remove("active");
    }
  }
}

// Close All Contents
function closeAllContent() {
  contentBox.classList.add("hidden");

  // Folder 1
  box.classList.remove("show");
  shadowFolder1.classList.remove("show");

  // Folder 2
  noteFolder2.classList.remove("show");
  shadowFolder2.classList.remove("show");
  noteText?.classList.remove("typing-active");
  void noteText?.offsetWidth;
  pie.classList.remove("show", "move-left");
  pieCaught.classList.remove("show");
  clearTimeout(pieTimeout);
  clearTimeout(pieMoveTimeout);
  gift.classList.remove("show");
  flower.classList.remove("show");
  clearTimeout(giftTimeout);

  // Folder 3
  folder3Container.classList.remove("show");
  shadowFolder3.classList.remove("show");
  frameNote3.classList.remove("show");
  note3.classList.remove("show");
  calendar1_3.classList.remove("show");
  calendar2_3.classList.remove("show");
  folder3Timers.forEach(clearTimeout);

  // Folder 4
  folder4Container.classList.remove("show");
  shadowFolder4.classList.remove("show");
  pathFolder4.classList.remove("show");
  text2.style.opacity = 0;
  text1.setAttribute("startOffset", "0%");
  text2Path.setAttribute("startOffset", "20%");
  flowerFolder4.classList.remove("show");
  wordsFolder4.forEach(word => word.classList.remove("white"));
  folder4Timers.forEach(clearTimeout);

  //  Folder 5
  folder5Container.classList.remove("show");
  shadowFolder5.classList.remove("show");
  flowerFolder5.classList.remove("show", "clicked");
  notiFolder5.classList.remove("show", "hide");
  wordsFolder5.forEach(word => {
    word.textContent = word.dataset.original || word.textContent;
    word.classList.remove("drop");
    word.style.position = "";
    word.style.left = "";
    word.style.top = "";
  });

  // Folder 6
  folder6Container.classList.remove("show");
  shadowFolder6A.classList.remove("show");
  shadowFolder6B.classList.remove("show");
  arm1.style.transform = "translateX(0)";
  arm2.style.transform = "translateX(0)";
  arm1b.classList.remove("show");
  arm2b.classList.remove("show");
  textFolder6.classList.remove("show"); // ✅ Reset text visibility
  holdText.setAttribute("startOffset", "5%");
  mapText.setAttribute("startOffset", "75%");

    // Folder 7
  folder7Container.classList.remove("show");
  shadowFolder7.classList.remove("show");
  musicFolder7.classList.remove("show");
  noteText7.classList.remove("typing-active");

    // Folder 8
  folder8Container.classList.remove("show");
  shadowFolder8.classList.remove("show");
  endFolder8.classList.remove("show");

}



// Rotate Circle
function rotate(dir) {
  closeAllContent();
  clickCount = 0;
  angle += dir * ((2 * Math.PI) / total);
  updatePositions();
}

// Folder 4 Animation
function animateFolder4() {
  shadowFolder4.classList.add("show");
  pathFolder4.classList.add("show");

  let offset1 = 0;
  function animateText1() {
    offset1 += 0.05;
    if (offset1 <= 10) {
      text1.setAttribute("startOffset", offset1 + "%");
      requestAnimationFrame(animateText1);
    } else {
      showText2();
    }
  }

  function showText2() {
    text2.style.opacity = 1;
    let offset2 = 20;
    function animateText2() {
      offset2 += 0.08;
      if (offset2 <= 68) {
        text2Path.setAttribute("startOffset", offset2 + "%");
        requestAnimationFrame(animateText2);
      } else {
        showFlowerFolder4();
      }
    }
    setTimeout(() => animateText2(), 1000);
  }

  function showFlowerFolder4() {
    flowerFolder4.classList.add("show");
    const order = ["word-youre", "word-the", "word-one", "word-i", "word-want", "word-beside"];
    let currentIndex = 0;
    let flowerInterval = setInterval(() => {
      wordsFolder4.forEach(word => word.classList.remove("white"));
      const nextWord = document.querySelector(`.${order[currentIndex]}`);
      if (nextWord) nextWord.classList.add("white");
      currentIndex = (currentIndex + 1) % order.length;
    }, 1000);

    // Stop interval when clicked
    flowerFolder4.addEventListener("click", () => {
      clearInterval(flowerInterval);
      wordsFolder4.forEach(word => word.classList.remove("white"));
    }, { once: true });
  }

  animateText1();
}

// Folder 5 Flower Click
function showNotiFolder5() {
  notiFolder5.classList.add("show");
  notiFolder5.style.pointerEvents = "auto";
}
notiFolder5.addEventListener("click", () => {
  notiFolder5.classList.add("hide");
  setTimeout(() => {
    notiFolder5.classList.remove("show", "hide");
  }, 800);
});

flowerFolder5.addEventListener("mouseenter", () => {
  if (!flowerFolder5.classList.contains("clicked")) {
    flowerFolder5.style.transform = "scale(1.2)";
  }
});
flowerFolder5.addEventListener("mouseleave", () => {
  if (!flowerFolder5.classList.contains("clicked")) {
    flowerFolder5.style.transform = "scale(1)";
  }
});
flowerFolder5.addEventListener("click", () => {
  if (flowerFolder5.classList.contains("clicked")) return;
  flowerFolder5.classList.add("clicked");
  flowerFolder5.style.animation = "none";
  flowerFolder5.style.transform = "scale(1)";

  const wordMap = {
    "You’re": "Not",
    "the": "just",
    "one": "sparks",
    "I": "high",
    "want": "or",
    "beside": "fleeting"
  };
  const flowerRect = flowerFolder5.getBoundingClientRect();
  const reversedWords = Array.from(wordsFolder5).reverse();
  reversedWords.forEach((word, i) => {
    word.dataset.original = word.textContent;
    if (wordMap[word.textContent]) word.textContent = wordMap[word.textContent];
    word.style.position = "fixed";
    word.style.left = (flowerRect.left - 70) + "px";
    word.style.top = (flowerRect.bottom - 10 + i * 35) + "px";
    word.style.transform = "rotate(0deg)";
  });

  setTimeout(() => {
    wordsFolder5.forEach(word => word.classList.add("drop"));
    showNotiFolder5();
  }, 700);
});

// Folder 6 Animation
function animateFolder6() {
  folder6Container.classList.add("show");
  shadowFolder6A.classList.add("show");

  // Animate arms first
  arm1.style.transform = "translateX(700px)";
  arm2.style.transform = "translateX(-500px)";

  // Delay text animation until arms finish
  setTimeout(() => {
    let offset1 = 0, offset2 = 75;
    function animateHold() {
      offset1 += 0.3;
      if (offset1 <= 75) {
        holdText.setAttribute("startOffset", offset1 + "%");
        requestAnimationFrame(animateHold);
      }
    }
    function animateMap() {
      offset2 -= 0.3;
      if (offset2 >= 5) {
        mapText.setAttribute("startOffset", offset2 + "%");
        requestAnimationFrame(animateMap);
      }
    }
    animateHold();
    animateMap();
  }, 1500); // 1.5s delay for arms to finish moving

  folder6Container.addEventListener("click", () => {
    let offset1 = 75, offset2 = 5;
    function reverseHold() {
      offset1 -= 1;
      if (offset1 >= 0) {
        holdText.setAttribute("startOffset", offset1 + "%");
        requestAnimationFrame(reverseHold);
      } else holdText.parentNode.style.opacity = 0;
    }
    function forwardMap() {
      offset2 += 1;
      if (offset2 <= 75) {
        mapText.setAttribute("startOffset", offset2 + "%");
        requestAnimationFrame(forwardMap);
      } else mapText.parentNode.style.opacity = 0;
    }

// Remove shadow A, show shadow B after 500ms
shadowFolder6A.classList.remove("show");

setTimeout(() => {
  shadowFolder6B.classList.add("show");

  // Move arms after showing shadow B
  setTimeout(() => {
    arm1.style.transform = "translateX(800px)";
    arm2.style.transform = "translateX(-650px)";

    // Show arms b after arms finish moving
    setTimeout(() => {
      arm1b.classList.add("show");
      arm2b.classList.add("show");

      // Finally, show text folder 6 with smooth delay
      setTimeout(() => {
        textFolder6.classList.add("show");
      }, 500);

    }, 1500); // arms movement duration
  }, 500); // start arm move 0.5s after shadow B appears

}, 500); // shadow B appears 0.5s after shadow A disappears

// Reverse text animation (unchanged)
reverseHold();
forwardMap();



  }, { once: true });
  
}

function animateFolder8() {
  folder8Container.classList.add("show");
  setTimeout(() => {
    shadowFolder8.classList.add("show");
    setTimeout(() => {
      endFolder8.classList.add("show");
    }, 500);
  }, 100);
}

// Folder Click Events
folders.forEach(folder => {
  folder.addEventListener("click", () => {
    if (parseInt(folder.dataset.index) === activeIndex) {
      clickCount++;
      if (clickCount % 2 === 1) {
        contentText.textContent = `You opened: ${folder.textContent}`;
        contentBox.classList.remove("hidden");
        const idx = parseInt(folder.dataset.index);
        switch (idx) {
          case 6: box.classList.add("show"); shadowFolder1.classList.add("show"); break;
          case 7: noteFolder2.classList.add("show"); shadowFolder2.classList.add("show"); noteText.classList.add("typing-active");
            pieTimeout = setTimeout(() => pie.classList.add("show"), 3600);
            pieMoveTimeout = setTimeout(() => pie.classList.add("move-left"), 9300);
            giftTimeout = setTimeout(() => gift.classList.add("show"), 8500); break;
          case 0: folder3Container.classList.add("show"); shadowFolder3.classList.add("show"); frameNote3.classList.add("show");
            folder3Timers.push(setTimeout(() => note3.classList.add("show"), 800));
            folder3Timers.push(setTimeout(() => calendar1_3.classList.add("show"), 1600));
            folder3Timers.push(setTimeout(() => calendar2_3.classList.add("show"), 2200)); break;
          case 1: folder4Container.classList.add("show"); animateFolder4(); break;
          case 2: folder5Container.classList.add("show"); shadowFolder5.classList.add("show"); flowerFolder5.classList.add("show"); break;
          case 3: animateFolder6(); break;
          case 4: folder7Container.classList.add("show"); shadowFolder7.classList.add("show"); musicFolder7.classList.add("show"); noteText7.classList.add("typing-active"); break;
          case 5: animateFolder8(); break;
          default: closeAllContent();
        }
      } else closeAllContent();
    } else closeAllContent();
  });
});

// Pie Click → "Caught"
pie.addEventListener("click", () => {
  pieCaught.classList.add("show");
  setTimeout(() => pieCaught.classList.remove("show"), 600);
});

// Gift Click → Flower
gift.addEventListener("click", () => flower.classList.add("show"));

// Navigation Buttons
leftBtn.addEventListener("click", () => rotate(1));
rightBtn.addEventListener("click", () => rotate(-1));

// Initialize Positions
updatePositions();

// Background Music & Click Sound
window.addEventListener("load", () => {
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => console.log("Autoplay blocked, will start on click"));
});
document.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
  clickSound.currentTime = 0;
  clickSound.play();
});