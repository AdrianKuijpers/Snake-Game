//console test
console.log("Snake")

//  HTML queryselectors
const grid = document.querySelector(".grid");
const imgSelect = document.querySelector("IMG");
const score = document.querySelector(".score");
const highScoreText = document.querySelector(".highScore");

// The game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let fruit = generateFruit();
let direction = "right";
let gameInterval;
let gameStarted = false;
let gameSpeedDelay = 200;
let highScore = 0;

//tests key inputs  
//document.addEventListener("keydown", (event)=> {
//  console.log(event.key);
//  console.log(event.code);
//});

// Draws the game map, snake and the fruit
function draw() {
  grid.innerHTML = "";
  drawSnake();
  drawFruit();
  updateScore();
}

// Draws the snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    grid.appendChild(snakeElement);
  });
}

//draw test
//draw();

// Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of snake or fruit
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Draw fruit function
function drawFruit() {
  const fruitElement = createGameElement("div", "fruit");
  setPosition(fruitElement, fruit);
  grid.appendChild(fruitElement);
}

// Generate fruit
function generateFruit() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

/// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  //snake unshift command removes a part of the snake
  snake.unshift(head);

  if (head.x === fruit.x && head.y === fruit.y) {
    fruit = generateFruit();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop(); // Removes the last element of a array
  }
}

// Test moving
//setInterval(() => {
//  move();
//  draw();
//}, 200);


// Start game function
function startGame() {
  gameStarted = true; // Keep track of a running game
  imgSelect.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Keypress event listener for movement
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      //ARROW KEYS
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      //WASD KEYS
      case "w":
        direction = "up";
        break;
      case "s":
        direction = "down";
        break;
      case "a":
        direction = "left";
        break;
      case "d":
        direction = "right";
        break;
      //CAPSLOCK WASD KEYS
      case "W":
        direction = "up";
        break;
      case "S":
        direction = "down";
        break;
      case "A":
        direction = "left";
        break;
      case "D":
        direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
  //console log to test the game speed
  //console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  fruit = generateFruit();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = "Score: " + currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  imgSelect.style.display = "initial";
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = "Highscore: " + highScore.toString().padStart(3, '0');
  }
}
