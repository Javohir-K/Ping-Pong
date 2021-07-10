const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");
const welcomebtn = document.getElementById("enterGame");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const welscr = document.getElementById("welcomeScreen");

welcomebtn.addEventListener("click", () => {
  welscr.style.display = "none";
  welscr.classList.add("ingame");
});

const user = {
  x: 0,
  y: cvs.height / 2 - 60,
  width: 10,
  height: 120,
  color: "#fcb404",
  score: 0,
};
const com = {
  x: cvs.width - 10,
  y: cvs.height / 2 - 60,
  width: 10,
  height: 120,
  color: "white",
  score: 0,
};
const ball = {
  x: cvs.width / 2,
  y: cvs.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "white",
};
const net = {
  x: cvs.width / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "white",
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawNet() {
  for (let i = 0; i <= cvs.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px fantasy";
  ctx.fillText(text, x, y);
}

function render() {
  drawRect(0, 0, cvs.width, cvs.height, "#46A07E");

  drawNet();

  drawText(user.score, cvs.width / 4, cvs.height / 5, "white");
  drawText(com.score, (3 * cvs.width) / 4, cvs.height / 5, "white");

  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(com.x, com.y, com.width, com.height, com.color);

  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

cvs.addEventListener("mousemove", movePaddle);
function movePaddle(evt) {
  let rect = cvs.getBoundingClientRect();
  user.y = evt.clientY - rect.top - user.height / 2;
}

function collision(b, p) {
  b.top = b.y - b.radius;
  b.bottom = b.y - b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
  );
}

function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = cvs.height / 2;
  user.height = 120;
  com.height = 120;
  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
}

function resetScore() {
  user.score = 0;
  com.score = 0;
}

var computerLevel = 0.1;

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;

  if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  let player = ball.x < cvs.width / 2 ? user : com;

  if (collision(ball, player)) {
    let collidePoint = ball.y - (player.y + player.height / 2);

    collidePoint = collidePoint / (player.height / 2);
    let angleRad = (collidePoint * Math.PI) / 4;
    let direction = ball.x < cvs.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    ball.speed += 0.2;
    player.height -= 5;
  }

  if (ball.x - ball.radius < 0) {
    com.score++;
    resetBall();
  } else if (ball.x + ball.radius > cvs.width) {
    user.score++;
    resetBall();
  }
}

const fps = 90;

function game() {
  update();
  render();
}

game();

const gameStartedInfo = document.getElementById("gameStarted");

document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;

    if (welscr.classList.contains("ingame") && keyName === "Enter") {
      setInterval(game, 1000 / fps);
      welscr.classList.remove("ingame");
    } else if (keyName === "Enter") {
      alert("Game is Paused: Press enter to continue the game");
    } else if (keyName === "r") {
        location.reload();
    }
  },
  false
);

startBtn.addEventListener("click", function () {
  if (welscr.classList.contains("ingame")) {
    setInterval(game, 1000 / fps);
    welscr.classList.remove("ingame");
  }
});

pauseBtn.addEventListener("click", function () {
  clearInterval(game);
  alert("Game is Paused: Press enter to continue the game");
});

resetBtn.addEventListener("click", function () {
  //   alert("Press Enter to start a new game");
  //   clearInterval(game());
  //   resetBall();
  //   resetScore();
  location.reload();
});

const leftSec = document.getElementById("left-sec");

document.getElementById("leftBtn").addEventListener("click", () => {
  if (leftSec.classList.contains("hidden")) {
    leftSec.style.left = "10px";
    leftSec.style.opacity = "1";
    leftSec.classList.remove("hidden");
  } else {
    leftSec.style.left = "-250px";
    leftSec.style.opacity = "0";
    leftSec.classList.add("hidden");
  }
});

// All code written by Javohir-K
