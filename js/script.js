document.addEventListener('DOMContentLoaded', function() {
    const walls = [
        {
          x: 85,
          y: 0,
          width: 20,
          height: 100,
        },
        {
          x: 79,
          y: 0,
          width: 20, // droite
          height: 75,
        },
        {
          x: 75,
          y: 0,
          width: 20,
          height: 44,
        },
        {
          x: 18,
          y: 91,
          width: 67,
          height: 25,
        },
        {
          x: 35,
          y: 84, // bas
          width: 25,
          height: 25,
        },
        {
          x: 0,
          y: 93,
          width: 30,
          height: 25,
        },
        {
          x: 0,
          y: 0,
          width: 12,
          height: 100,
        },
        {
          x: 0,
          y: 0,
          width: 16,
          height: 75,
        },
        {
          x: 0,
          y: 0, // gauche
          width: 20,
          height: 45,
        },
        {
          x: 0,
          y: 0,
          width: 24,
          height: 31,
        },
        {
          x: 20,
          y: 0,
          width: 70,
          height: 11,
        },
        {
          x: 60,
          y: 0,
          width: 30,
          height: 18,
        },
        {
          x: 68,
          y: 0,
          width: 30,
          height: 22,
        },
        {
          x: 71,
          y: 0,
          width: 32,
          height: 30, //haut
        },
        {
          x: 20,
          y: 0,
          width: 30,
          height: 17,
        },
        {
          x: 20,
          y: 0,
          width: 12,
          height: 23,
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

