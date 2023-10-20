const width= 29;
const grid= document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
let score= 0;
const squares=[];
/* //0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty */
const layout=[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,
    1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,
    1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
    1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,
    1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4

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
            square.classList.add("pac-dot");
        } else if (layout[i]=== 1) {
            square.classList.add("wall");
        } else if (layout[i]=== 3) {
            square.classList.add("power-pellet");
        } else if (layout[i]===4) {
            square.classList.add("selector");
        }
    }}
    createPacBoard();
    let pacmanCurrentIndex=377;
    squares[pacmanCurrentIndex].classList.add("pacman");
    function control(e) {
        squares[pacmanCurrentIndex].classList.remove("pacman");
    if(e.keyCode(52)){
        switch (e.keyCode) {
            case 37: //izquierda
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall'))
                    pacmanCurrentIndex -= 1;
                break;
            case 38: //arriba
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall'))
                    pacmanCurrentIndex -= width;
                break;
            case 39: //derecha
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall'))
                    pacmanCurrentIndex += 1;
                break;
            case 40: //abajo
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall'))
                    pacmanCurrentIndex += width;
                break;
        }
        pacmanCurrentIndex.classList.contains()
    }
    else{
        switch (e.keyCode) {
            case 37: //izquierda
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall'))
                    pacmanCurrentIndex -= 1;
                break;
            case 38: //arriba
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall'))
                    pacmanCurrentIndex -= width;
                break;
            case 39: //derecha
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall'))
                    pacmanCurrentIndex += 1;
                break;
            case 40: //abajo
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall'))
                    pacmanCurrentIndex += width;
                break;
        }
    }

    
        squares[pacmanCurrentIndex].classList.add("pacman");
    
        pacDotEaten();
    }
    
    document.addEventListener("keyup", control);
    
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++;
            scoreDisplay.textContent = score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
        }
    }