const width= 28;
const grid= document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
let score= 0;
const squares=[];
/* //0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty */
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
//Array del tablero del juego
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
        //añadiendo las clases según el layout
        if (layout[i]=== 0) {
            square.classList.add("rojo");
            //ladrillo
        } else if (layout[i]=== 1) {
            //pared
            square.classList.add("wall");
        } else if (layout[i]=== 3) {
            //ladrillo
            square.classList.add("amarillo");
        } else if (layout[i]===4) {
            //fondo
            square.classList.add("selector");
        } else if(layout[i]===5){
            //ladrillo
            square.classList.add("violeta")
        }
    }}
    createPacBoard();
    //posición que habilita movimiento
    let pacmanCurrentIndex=211;
    squares[pacmanCurrentIndex].classList.add("pacman");
    //función control, permite el movimiento
    function control(e) {
        squares[pacmanCurrentIndex].classList.remove("pacman");
    /* 
    if(e.keyCode(52)){
        switch (e.keyCode) {
            case 37: // izquierda
            if (pacmanCurrentIndex % width == 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall'))
                pacmanCurrentIndex -= 1;
            break;
        case 39: // derecha
            if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall'))
                pacmanCurrentIndex += 1;
            break;
        
        }
        pacmanCurrentIndex.classList.contains()
    }
    else{ */
    switch (e.keyCode) {
        case 37: // izquierda
            if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
                pacmanCurrentIndex -= 1;
                
                if (pacmanCurrentIndex === 272) {
                    pacmanCurrentIndex = 296;
                }
            }
            break;
        case 39: //Derecha
            if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall')) {
                pacmanCurrentIndex += 1;
                if (pacmanCurrentIndex === 296) {
                    pacmanCurrentIndex = 272;
                }
            }
            break;
    }
    

    
        squares[pacmanCurrentIndex].classList.add("pacman");
    
        pacDotEaten();}

    
    document.addEventListener("keyup", control);
    
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('amarillo')) {
            score++;
            scoreDisplay.textContent = score;
            squares[pacmanCurrentIndex].classList.remove('amarillo');
        }
    }