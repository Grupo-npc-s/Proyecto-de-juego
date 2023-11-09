function control(e) {
    squares[pacmanCurrentIndex].classList.remove("pacman");

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