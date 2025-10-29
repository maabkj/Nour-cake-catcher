const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let nourImg = new Image();
nourImg.src = "nour.png"; // upload your Nour image and name it "nour.png"

let cakeImg = new Image();
cakeImg.src = "cake.png"; // upload a cake image and name it "cake.png"

let nour = { x: 180, y: 520, width: 60, height: 60, speed: 5 };
let cakes = [];
let score = 0;
let gameOver = false;

const messages = [
  "I'm so proud of you!",
  "Good girl 💗",
  "Come on girl!",
  "You're doing amazing, birthday girl!",
  "Keep it up, Nour!",
  "Yaaas queen 🎂"
];

document.addEventListener("keydown", moveNour);

function moveNour(e) {
  if (e.key === "ArrowLeft" && nour.x > 0) nour.x -= nour.speed * 10;
  if (e.key === "ArrowRight" && nour.x < canvas.width - nour.width)
    nour.x += nour.speed * 10;
}

function createCake() {
  const x = Math.random() * (canvas.width - 40);
  cakes.push({ x, y: 0, width: 40, height: 40 });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(nourImg, nour.x, nour.y, nour.width, nour.height);

  cakes.forEach((cake, i) => {
    cake.y += 2;
    ctx.drawImage(cakeImg, cake.x, cake.y, cake.width, cake.height);

    // Check for catch
    if (
      cake.y + cake.height >= nour.y &&
      cake.x < nour.x + nour.width &&
      cake.x + cake.width > nour.x
    ) {
      cakes.splice(i, 1);
      score++;
      showMessage(messages[Math.floor(Math.random() * messages.length)]);
      if (score >= 10) endGame();
    }

    // Remove missed cakes
    if (cake.y > canvas.height) cakes.splice(i, 1);
  });

  if (!gameOver) requestAnimationFrame(draw);
}

function showMessage(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  setTimeout(() => (msg.textContent = ""), 1200);
}

function endGame() {
  gameOver = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px Comic Sans MS";
  ctx.fillStyle = "#ff6fa9";
  ctx.textAlign = "center";
  ctx.fillText("🎉 HAPPY BIRTHDAY BIG GIRL 🎉", canvas.width / 2, 200);
  ctx.fillText("I'm so proud of who you’ve become...", canvas.width / 2, 230);
  ctx.fillText("Whatever you are, I’ll always cheer you up 💗", canvas.width / 2, 260);
  ctx.fillText("Even if we grow apart, I’ll always welcome you back 💞", canvas.width / 2, 290);
  ctx.fillText("I love you girl 💗", canvas.width / 2, 320);
  confetti();
}

function confetti() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 70%)`;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

setInterval(createCake, 1000);
draw();
