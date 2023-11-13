const width= 28;
const grid= document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
let score= 0;
const squares=[];

var BallDirs = {
	NONE : 0,
	LEFT : 1,
	RIGHT : 2,
	UP : 4,
	DOWN : 8
};
function Ball(x, y, radius, dir, speed) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dir = BallDirs.NONE;
	this.speed = speed;
}
var BALL_RADIUS = 6;
	var BALL_DEFAULT_SPEED = 4;
	var BALL_MAX_SPEED = 5;


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
    let pacmanCurrentIndex=163;
    squares[pacmanCurrentIndex].classList.add("pacman");
    

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

movePacman();

gameLoop();
    
    document.addEventListener("keyup", control);
    
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('amarillo')) {
            score++;
            scoreDisplay.textContent = score;
            squares[pacmanCurrentIndex].classList.remove('amarillo');
        }
    }