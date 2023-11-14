const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
let score = 0;
const squares = [];

var BallDirs = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 4,
  DOWN: 8
};

function Ball(x, y, radius, dir, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dir = dir;
  this.speed = speed;
}

var BALL_RADIUS = 6;
var BALL_DEFAULT_SPEED = 4;

const layout=[
    1,1,1,1,1,1,1,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,0,5,3,0,5,3,1,
    1,5,3,0,5,3,0,1,
    1,3,0,5,3,0,5,1,
    1,0,5,3,0,5,3,1,
    1,5,3,0,5,3,0,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,4,4,4,4,4,4,1,
    1,1,1,1,1,1,1,1
];

function createPacBoard(){
    if (!grid) {
        console.error('El elemento grid no existe');
        return;
    }
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);

        if (layout[i]=== 0) {
            square.classList.add("rojo");
        } else if (layout[i]=== 1) {
            square.classList.add("wall");
        } else if (layout[i]=== 3) {
            square.classList.add("amarillo");
        } else if (layout[i]===4) {
            square.classList.add("selector");
        } else if(layout[i]===5){
            square.classList.add("violeta")
        }
    }}
    createPacBoard();
    let pacmanCurrentIndex=211;
    squares[pacmanCurrentIndex].classList.add("pacman");

    const ball = new Ball(160, 300, BALL_RADIUS, BallDirs.RIGHT | BallDirs.DOWN, BALL_DEFAULT_SPEED);

    function drawBall() {
        const ballElement = document.createElement("div");
        ballElement.classList.add("ball");
        ballElement.style.width = ball.radius * 2 + "px";
        ballElement.style.height = ball.radius * 2 + "px";
        ballElement.style.borderRadius = "50%";
        ballElement.style.backgroundColor = "white";
        ballElement.style.position = "absolute";
        ballElement.style.left = ball.x + "px";
        ballElement.style.top = ball.y + "px";
        grid.appendChild(ballElement);
      }

      function moveBall() {
        if (ball.dir & BallDirs.LEFT) {
          ball.x -= ball.speed;
        } else if (ball.dir & BallDirs.RIGHT) {
          ball.x += ball.speed;
        }
      
        if (ball.dir & BallDirs.UP) {
          ball.y -= ball.speed;
        } else if (ball.dir & BallDirs.DOWN) {
          ball.y += ball.speed;
        }

    // Verificar colisiones con las paredes
    if (ball.x - ball.radius <= 0 && ball.dir & BallDirs.LEFT) {
        ball.dir ^= BallDirs.LEFT;
    } else if (ball.x + ball.radius >= grid.offsetWidth && ball.dir & BallDirs.RIGHT) {
        ball.dir ^= BallDirs.RIGHT;
    }

    if (ball.y - ball.radius <= 0 && ball.dir & BallDirs.UP) {
        ball.dir ^= BallDirs.UP; 
    } else if (ball.y + ball.radius >= grid.offsetHeight && ball.dir & BallDirs.DOWN) {
        ball.dir ^= BallDirs.DOWN; 
    }

    // Verificar colisiones con el jugador (pacman)
    if (
        ball.x + ball.radius >= squares[pacmanCurrentIndex].offsetLeft &&
        ball.x - ball.radius <= squares[pacmanCurrentIndex].offsetLeft + squares[pacmanCurrentIndex].offsetWidth &&
        ball.y + ball.radius >= squares[pacmanCurrentIndex].offsetTop &&
        ball.y - ball.radius <= squares[pacmanCurrentIndex].offsetTop + squares[pacmanCurrentIndex].offsetHeight
    ) {
        ball.dir ^= BallDirs.UP; // Invertir el bit UP
    }


    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains("wall")) {
            if (
                ball.x + ball.radius >= squares[i].offsetLeft &&
                ball.x - ball.radius <= squares[i].offsetLeft + squares[i].offsetWidth &&
                ball.y + ball.radius >= squares[i].offsetTop &&
                ball.y - ball.radius <= squares[i].offsetTop + squares[i].offsetHeight
            ) {
                
                squares[i].classList.remove('0','5','3');
                score++;
                scoreDisplay.textContent = score;
               
                if (ball.dir & BallDirs.UP) ball.dir ^= BallDirs.UP;
                if (ball.dir & BallDirs.DOWN) ball.dir ^= BallDirs.DOWN;
                if (ball.dir & BallDirs.LEFT) ball.dir ^= BallDirs.LEFT;
                if (ball.dir & BallDirs.RIGHT) ball.dir ^= BallDirs.RIGHT;
            }
        }
    }

    // Mover la bola en la pantalla
    const ballElement = document.querySelector(".ball");
    ballElement.style.left = ball.x + "px";
    ballElement.style.top = ball.y + "px";

    
    requestAnimationFrame(moveBall);
}

drawBall();
moveBall();


let leftKeyPressed = false;
let rightKeyPressed = false;


document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: // izquierda
            leftKeyPressed = true;
            break;
        case 39: // derecha
            rightKeyPressed = true;
            break;
    }
});


document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37: // izquierda
            leftKeyPressed = false;
            break;
        case 39: // derecha
            rightKeyPressed = false;
            break;
    }
});

const velocidad = 100;


function movePacman() {
    if (leftKeyPressed && pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
        pacmanCurrentIndex -= 1;
        if (pacmanCurrentIndex === 272) {
            pacmanCurrentIndex = 296;
        }
    } else if (rightKeyPressed && pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall')) {
        pacmanCurrentIndex += 1;
        if (pacmanCurrentIndex === 296) {
            pacmanCurrentIndex = 272;
        }
    }
    squares.forEach(square => square.classList.remove('pacman'));

    squares[pacmanCurrentIndex].classList.add('pacman');

    pacDotEaten();

    setTimeout(movePacman, velocidad);
}

function gameLoop() {
    movePacman();
    moveBall();
    
    requestAnimationFrame(gameLoop);
        
    document.addEventListener("keyup", control);
    
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('amarillo')) {
            score++;
            scoreDisplay.textContent = score;
            squares[pacmanCurrentIndex].classList.remove('amarillo');
        }
        movePacman();
    }
  }

gameLoop();