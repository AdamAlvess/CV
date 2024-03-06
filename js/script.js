document.addEventListener('DOMContentLoaded', function() {
    const walls = [
        {
          x: 0,
          y: 0,
          width: 30,
          height: 30,
        },
        {
          x: 75,
          y: 0,
          width: 25,
          height: 100,
        },
        {
          x: 25,
          y: 0,
          width: 50,
          height: 25,
        },
        {
          x: 25,
          y: 75,
          width: 50,
          height: 25,
        },
    ];
    
    // Définir le personnage
    const character = document.getElementById('character');
    let characterX = 50;
    let characterY = 50;
    let dx = 0; // Changement horizontal de la position du personnage
    let dy = 0; // Changement vertical de la position du personnage
    let isColliding = false; // Variable pour vérifier si une collision est en cours
    
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
                isColliding = true; // Collision détectée
                return;
            }
        }
        isColliding = false; // Pas de collision
    }
    
    // Fonction de mouvement du personnage
    function moveCharacter() {
        if (!isColliding) {
            updateCharacterPosition();
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
                    dy = -0.5; // Changer la vitesse verticale
                }
                break;
            case 'ArrowDown':
                if (!isColliding) {
                    dy = 0.5; // Changer la vitesse verticale
                }
                break;
            case 'ArrowLeft':
                if (!isColliding) {
                    dx = -0.5; // Changer la vitesse horizontale
                }
                break;
            case 'ArrowRight':
                if (!isColliding) {
                    dx = 0.5; // Changer la vitesse horizontale
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
                dy = 0; // Arrêter le mouvement vertical
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                dx = 0; // Arrêter le mouvement horizontal
                break;
            default:
                break;
        }
    });
    
    // Début du mouvement du personnage
    moveCharacter();
});

