const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stopButton = document.getElementById("stopButton");
const startButton = document.getElementById("startButton");
let animationId;
let offsetY = 0; // Her frame'de çizimlerin kaç birim aşağı indirileceğini belirtir
let leftArrowY = 0;
let upArrowY = 0;
let rightArrowY = 0;
let bottomArrowY = 0;
let skor = 0;
let eskiSkor = 0;
let fail = 0;

let musicPlayers = {
  ahmetKaya: {
    element: document.getElementById("ahmetKaya"),
    isPlaying: false,
  },
  bunnyGirl: {
    element: document.getElementById("bunnyGirl"),
    isPlaying: false,
  },
  tarkanYolla: {
    element: document.getElementById("tarkanYolla"),
    isPlaying: false,
  },
  serdarOrtac: {
    element: document.getElementById("serdarOrtac"),
    isPlaying: false,
  },
  aleynaTilki: {
    element: document.getElementById("aleynaTilki"),
    isPlaying: false,
  },
  kaderdeGulecekmis: {
    element: document.getElementById("kaderdeGulecekmis"),
    isPlaying: false,
  },
};

function drawCanvasUI() {
  //canvas çizgileri
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(200, 600);
  ctx.lineTo(200, 0);
  ctx.stroke();

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(400, 600);
  ctx.lineTo(400, 0);
  ctx.stroke();

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(600, 600);
  ctx.lineTo(600, 0);
  ctx.stroke();

  // Sabit arrowlar
  let arrowLeft = new Path2D();
  arrowLeft.moveTo(50, 500);
  arrowLeft.lineTo(100, 450);
  arrowLeft.lineTo(100, 550);
  arrowLeft.lineTo(50, 500);
  ctx.fillStyle = "black";
  ctx.fill(arrowLeft, "evenodd");
  ctx.fillRect(100, 475, 50, 50);

  let arrowUp = new Path2D();
  arrowUp.moveTo(300, 450);
  arrowUp.lineTo(250, 500);
  arrowUp.lineTo(350, 500);
  arrowUp.lineTo(300, 450);
  ctx.fill(arrowUp, "evenodd");
  ctx.fillRect(275, 500, 50, 50);

  let arrowRight = new Path2D();
  arrowRight.moveTo(550, 500);
  arrowRight.lineTo(500, 450);
  arrowRight.lineTo(500, 550);
  arrowRight.lineTo(550, 500);
  ctx.fill(arrowRight, "evenodd");
  ctx.fillRect(450, 475, 50, 50);

  let arrowBottom = new Path2D();
  arrowBottom.moveTo(700, 550);
  arrowBottom.lineTo(650, 500);
  arrowBottom.lineTo(750, 500);
  arrowBottom.lineTo(700, 550);
  ctx.fill(arrowBottom, "evenodd");
  ctx.fillRect(675, 450, 50, 50);
}
function drawArrowLeft(x, y) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 50, y - 50);
  ctx.lineTo(x + 50, y + 50);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeRect(x + 50, y - 25, 50, 50); // Dikdörtgeni çiz
}
function drawArrowUp(x, y) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 50, y + 50);
  ctx.lineTo(x + 50, y + 50);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeRect(x - 25, y + 50, 50, 50); // Dikdörtgeni çiz
}

function drawArrowRight(x, y) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 50, y - 50);
  ctx.lineTo(x - 50, y + 50);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeRect(x - 100, y - 25, 50, 50); // Dikdörtgeni çiz
}
function drawArrowBottom(x, y) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 50, y - 50);
  ctx.lineTo(x - 50, y - 50);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeRect(x - 25, y - 100, 50, 50); // Dikdörtgeni çiz
}

function dropLeftArrow(velocity, callback) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvasUI();
  leftArrowY = -50 + offsetY;
  drawArrowLeft(50, leftArrowY);
  offsetY += velocity;

  // Düşme tamamlandığında callback fonksiyonunu çağır
  if (offsetY >= 560) {
    callback();
  } else {
    animationId = requestAnimationFrame(() =>
      dropLeftArrow(velocity, callback)
    );
  }
}

function dropUpArrow(velocity, callback) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvasUI();
  upArrowY = -100 + offsetY;
  drawArrowUp(300, upArrowY);
  offsetY += velocity;

  // Düşme tamamlandığında callback fonksiyonunu çağır
  if (offsetY >= 560) {
    callback();
  } else {
    animationId = requestAnimationFrame(() => dropUpArrow(velocity, callback));
  }
}

function dropRightArrow(velocity, callback) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvasUI();
  rightArrowY = -50 + offsetY;
  drawArrowRight(550, rightArrowY);
  offsetY += velocity;
  // Düşme tamamlandığında callback fonksiyonunu çağır
  if (offsetY >= 560) {
    callback();
  } else {
    animationId = requestAnimationFrame(() =>
      dropRightArrow(velocity, callback)
    );
  }
}

function dropBottomArrow(velocity, callback) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvasUI();
  bottomArrowY = offsetY;
  drawArrowBottom(700, bottomArrowY);
  offsetY += velocity;

  // Düşme tamamlandığında callback fonksiyonunu çağır
  if (offsetY >= 560) {
    callback();
  } else {
    animationId = requestAnimationFrame(() =>
      dropBottomArrow(velocity, callback)
    );
  }
}
function handleKeyDown(event) {
  const key = event.key;
  // Tuşa basıldığında durumu belirle
  switch (key) {
    case "w":
    case "ArrowUp":
      if (upArrowY < 520 && upArrowY >= 360) {
        console.log("orta tuşa basıldı");
        skor += 10;
        playSuccessSound();
      } else {
        console.log("yanlış tuşa basıldı");
        fail++;
      }
      break;
    case "d":
    case "ArrowRight":
      if (rightArrowY < 520 && rightArrowY >= 460) {
        console.log("sağ tışa basıldı");
        skor += 10;
        playSuccessSound();
      } else {
        console.log("yanlış tuşa basıldı");
        fail++;
      }
      break;
    case "a":
    case "ArrowLeft":
      if (leftArrowY < 520 && leftArrowY >= 460) {
        console.log("sol tuşa basıldı");
        skor += 10;
        playSuccessSound();
      } else {
        console.log("yanlış tuşa basıldı");
        fail++;
      }
      break;
    case "s":
    case "ArrowDown":
      if (bottomArrowY < 570 && bottomArrowY >= 510) {
        console.log("alt tuşa basıldı");
        skor += 10;
        playSuccessSound();
      } else {
        console.log("yanlış tuşa basıldı");
        fail++;
      }
      break;
    default:
      break;
  }
  document.getElementById("skor").innerHTML = "Skor: " + skor;
  document.getElementById("hata").innerHTML = "Hata:" + fail;

  if (fail >= 5) {
    startButton.style.display = "inline";
    stopAnimation();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("eskiSkor").innerHTML = "Önceki Skor: " + eskiSkor;
    skor = 0;
    document.getElementById("skor").innerHTML = "Skor: " + skor;
    hata = 0;
    document.getElementById("hata").innerHTML = "Hata:" + fail;
  }
}

// Başlatma düğmesine basıldığında event listener'ı etkinleştir
startButton.addEventListener("click", () => {
  startButton.style.display = "none";

  // Bitir butonunu göster
  stopButton.style.display = "inline";
  startGame(10, 400);
  // Klavye olaylarını dinlemeye başla
  document.addEventListener("keydown", handleKeyDown);
});

stopButton.addEventListener("click", () => {
  // Başlat butonunu göster
  startButton.style.display = "inline";
  stopAnimation();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eskiSkor = skor; // Oyun bittiğinde eski skoru güncelle
  document.getElementById("eskiSkor").innerHTML = "Önceki Skor: " + eskiSkor;
  skor = 0;
  document.getElementById("skor").innerHTML = "Skor: " + skor;
  hata = 0;
  document.getElementById("hata").innerHTML = "Hata:" + fail;
});

function startGame(velocity, delay) {
  setTimeout(() => {
    offsetY = 0;
    leftArrowY = 0;
    upArrowY = 0;
    rightArrowY = 0;
    bottomArrowY = 0;
    const position = Math.floor(Math.random() * 4) + 1;
    // Seçilen pozisyona göre ilgili düşme fonksiyonunu çağır
    switch (position) {
      case 1:
        dropLeftArrow(velocity, () => startGame(velocity, delay));
        break;
      case 2:
        dropUpArrow(velocity, () => startGame(velocity, delay));
        break;
      case 3:
        dropRightArrow(velocity, () => startGame(velocity, delay));
        break;
      case 4:
        dropBottomArrow(velocity, () => startGame(velocity, delay));
        break;
      default:
    }
  }, delay);
  if (skor >= 100 && skor < 200) {
    if (skor == 100) {
      fail--;
    }
    velocity = 15; // Yeni bir hız değeri belirle
    delay = 400;
  } else if (skor >= 200 && skor < 300) {
    if (skor == 200) {
      fail--;
    }
    velocity = 19;
    delay = 400;
  } else if (skor >= 300 && skor < 400) {
    if (skor == 300) {
      fail--;
    }
    velocity = 25;
    delay = 400;
  } else if (skor >= 400 && skor < 500) {
    if (skor == 400) {
      fail--;
    }
    velocity = 29;
    delay = 400;
  }
}

function stopAnimation() {
  cancelAnimationFrame(animationId);
  document.removeEventListener("keydown", handleKeyDown);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eskiSkor = skor; // Oyun bittiğinde eski skoru güncelle
  document.getElementById("eskiSkor").innerHTML = "Önceki Skor: " + eskiSkor;
  skor = 0;
  document.getElementById("skor").innerHTML = "Skor: " + skor;
  fail = 0;
  document.getElementById("hata").innerHTML = "Hata:" + fail;
}

function playSuccessSound() {
  var audio = document.getElementById("sound");
  audio.play();
}

function adjustVolume() {
  var volumeSlider = document.getElementById("volume");
  var volume = volumeSlider.value / 100; // 0 ile 1 arasında bir değer elde etmek için 100'e bölünür

  var musikis = document.getElementsByClassName("musiki");
  for (var i = 0; i < musikis.length; i++) {
    musikis[i].volume = volume;
  }
}

function playMusic(musicName) {
  // İlgili müzik çalınıyorsa, durdur ve başa al
  if (musicPlayers[musicName].isPlaying) {
    musicPlayers[musicName].element.pause();
    musicPlayers[musicName].element.currentTime = 0;
    musicPlayers[musicName].isPlaying = false;
  } else {
    // Diğer müzikler çalınıyorsa, durdur
    for (let music in musicPlayers) {
      if (music !== musicName && musicPlayers[music].isPlaying) {
        musicPlayers[music].element.pause();
        musicPlayers[music].isPlaying = false;
      }
    }
    // İlgili müziği çal
    musicPlayers[musicName].element.play();
    musicPlayers[musicName].isPlaying = true;
  }
}
