let canvas;
let canvasContext;

let ballX = 50;
let ballY = 50;
let ballSpeedX = 5;
let ballSpeedY = 5;

let paddle1Y = 250;
let paddle2Y = 250;
const paddleWidth = 15;
const paddleHeight = 100;

let showWinScreen = false;

let player1Score = 0;
let player2Score = 0;
const winningScore = 3;


window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    
    let framesPerSecond = 30;
    setInterval(function () {
        movement();
        draw();
    }, 1000 / framesPerSecond);
    
    canvas.addEventListener("mousedown", handleMouseClick);
    
    // Listens for player 1 mouse movement
    canvas.addEventListener("mousemove", function (event) {
        let mousePosition = calculateMousePosition(event);
        paddle1Y = mousePosition.y - paddleHeight / 2;
    });
};

function calculateMousePosition(event) {
  // Getting the bounds of the playing field
  let rect = canvas.getBoundingClientRect();
  // Getting a handle on the document
  let root = document.documentElement;
  // Takes the position of mouse x and y, to the learn where the mouse is on the playing field
  let mouseX = event.clientX - rect.left - root.scrollLeft;
  let mouseY = event.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY,
  };
}

function handleMouseClick() {
  if (showWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showWinScreen = false;
  }
}

function movement() {
  if (showWinScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;

  // Player 1
  if (ballX - 25 < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      // Ball control
      let deltaY = ballY - (paddle1Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } 
    else {
      player2Score++;
      ballReact();
    }
  }

  // Player 2
  if (ballX + 25 > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      // Ball control
      let deltaY = ballY - (paddle2Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } 
    else {
      player1Score++;
      ballReact();
    }
  }

  ballY += ballSpeedY;

  if (ballY + 27 > canvas.height || ballY - 7 < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function computerMovement() {
  let paddle2YCenter = paddle2Y + paddleHeight / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 5;
  } 
  else if (paddle2YCenter < ballY + 35) {
    paddle2Y -= 5;
  }
}

function ballReact() {
    if (player1Score >= winningScore || player2Score >= winningScore) {
      showWinScreen = true;
    }
  
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}

function draw() {
  // canvasContext.fillRect(from_left, from_top, how_wide_the_shape_is, how_tall_the_shape_is)

  // Playing field
  colorRect(0, 0, canvas.width, canvas.height, "#000000");

  if (showWinScreen) {
    canvasContext.fillStyle = "white";
    canvasContext.fillText(`${player1Score >= winningScore 
        ? "Player 1 Wins!!!" : "Player 2 Wins!!!"}`, 350, 100);
    canvasContext.fillText("Click to play again", 350, 150);
    return;
  }

  drawNet();

  // Left player
  colorRect(0, paddle1Y, paddleWidth, paddleHeight, "white");

  // Right player
  colorRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, "white");
  
  canvasContext.fillText("Player 1 Score:", 100, 100);
  canvasContext.fillText(player1Score, 131, 120);

  canvasContext.fillText("Player 2 Score:", canvas.width - paddleWidth - 150, 100);
  canvasContext.fillText(player2Score, canvas.width - paddleWidth - 119, 120);
  // Ball (X position, Y position, radius, pi*2 is a circle, clockwise or counter clockwise)
  colorCircle(ballX, ballY+10, 10, "#e7f241");

}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}



