document.addEventListener('DOMContentLoaded', function() {
    const walls = [
        
        {
          x: 81,
          y: 0,
          width: 20, // droite
          height: 100,
        },
        {
          x: 77,
          y: 0,
          width: 20,
          height: 60,
        },
        {
          x: 21,
          y: 73,
          width: 67,
          height: 40,
        },
        {
          x: 37,
          y: 67, // bas
          width: 22,
          height: 25,
        },
        {
          x: 0,
          y: 80,
          width: 30,
          height: 25,
        },
        {
          x: 0,
          y: 0,
          width: 13,
          height: 100,
        },
        {
          x: 0,
          y: 0,
          width: 14,
          height: 72,
        },
        {
          x: 0,
          y: 0, // gauche
          width: 19,
          height: 57,
        },
        {
          x: 0,
          y: 0,
          width: 22,
          height: 27,
        },
        {
          x: 20,
          y: 0,
          width: 70,
          height: 1,
        },
        {
          x: 60,
          y: 0,
          width: 30,
          height: 7,
        },
        {
          x: 67,
          y: 0,
          width: 30,
          height: 13,
        },
        {
          x: 74,
          y: 0,
          width: 32,
          height: 30, //haut
        },
        {
          x: 20,
          y: 0,
          width: 28,
          height: 8,
        },
        {
          x: 20,
          y: 0,
          width: 12,
          height: 14,
        },
    ];
    const gameContainer = document.getElementById('game-container');
    
    // Définir le personnage
    const character = document.getElementById('character');
    let characterX = 50;
    let characterY = 50;
    let dx = 0; 
    let dy = 0;
    let isColliding = false;

    // Fonction de mise à jour de la position du personnage
    function updateCharacterPosition() {
        characterX += dx;
        characterY += dy;
        character.style.left = `${characterX}%`;
        character.style.top = `${characterY}%`;
    }
    
    // Fonction de détection de collision
    function checkCollision() {
        for (const wall of walls) {
            if (
                characterX + dx >= wall.x &&
                characterX + dx <= wall.x + wall.width &&
                characterY + dy >= wall.y &&
                characterY + dy <= wall.y + wall.height
            ) {
                isColliding = true; 
                return;
            }
        }
        isColliding = false; 
    }
    
    // Fonction de mouvement du personnage
    function moveCharacter() {
        if (!isColliding) {
            updateCharacterPosition();
        }
        else {
            // Si une collision est détectée, réinitialisez la position du personnage
            characterX -= dx;
            characterY -= dy;
        }
        checkCollision();
        requestAnimationFrame(moveCharacter);
    }

    
    // Détecter les touches pressées
    document.addEventListener('keydown', function(event) {
        const key = event.key;
    
        switch(key) {
            case 'ArrowUp':
                if (!isColliding) {
                    dy = -0.5; 
                }
                break;
            case 'ArrowDown':
                if (!isColliding) {
                    dy = 0.5; 
                }
                break;
            case 'ArrowLeft':
                if (!isColliding) {
                    dx = -0.5; 
                }
                break;
            case 'ArrowRight':
                if (!isColliding) {
                    dx = 0.5; 
                }
                break;
            default:
                break;
        }
    });
    
    // Détecter les touches relâchées
    document.addEventListener('keyup', function(event) {
        const key = event.key;
    
        switch(key) {
            case 'ArrowUp':
            case 'ArrowDown':
                dy = 0; 
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                dx = 0; 
                break;
            default:
                break;
        }
    });
    
    moveCharacter();
});

