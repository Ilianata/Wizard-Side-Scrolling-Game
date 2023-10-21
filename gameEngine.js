const { firebrick } = require("color-name");

function start(state, game){
    game.createWizard(state.wizard);
    game.createBug(state.bugStats);
    game.createCloud(state.cloudsStats);

    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));
};


function gameLoop(state, game, timestamp) {
    const {wizard} = state;
    const {wizardElement} = game;

    modifyWizardPosition(state, game);

    if(state.keys.Space) {
        game.wizardElement.style.backgroundImage = 'url("images/wizard-fire.png")';
        game.createFireball(wizard, state.fireball)
    } else {
        game.wizardElement.style.backgroundImage = 'url("images/wizard.png")'
    };

    //Spawn bugs
    if(timestamp > state.bugStats.nextSpownTimestamp){
       game.createBug(state.bugStats);
        state.bugStats.nextSpownTimestamp = timestamp + Math.random() * state.bugStats.maxSpownInterval;
    };

    //Spawn clouds
    if(timestamp > state.cloudsStats.nextSpownTimestamp){
        game.createCloud(state.cloudsStats);
        state.cloudsStats.nextSpownTimestamp = timestamp + Math.random() * state.cloudsStats.maxSpownInterval
    };

    

    //Render bugs
    let bugElements = document.querySelectorAll('.bug')

    bugElements.forEach(bug => {
        let posX = parseInt(bug.style.left);

        if(detectColllision(wizardElement, bug)){
            state.gameover = true
        }

        if(posX > 0){
            
            bug.style.left = posX - state.bugStats.speed + "px"
        } else {
            bug.remove();
        }
    });

    let cloudEl = document.querySelectorAll('.cloud')


    cloudEl.forEach(cloud => {
        let posX = parseInt(cloud.style.left);
        if(posX > -200 ){
            
            cloud.style.left = posX - state.cloudsStats.speed + "px"
        } else {
            cloud.remove();
        }

    }) 

    //Move fireballs

    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);

        //Detect collision

        bugElements.forEach(bug => {
            if(detectColllision(bug, fireball)){
                bug.remove();
                fireball.remove();
                state.score += state.killBugPoints;
                document.querySelector(".score").textContent = ` Score: ${state.score} points`
            }
        });

        if(posX > game.gameScreen.offsetWidth){
            fireball.remove();
        } else {
            
            fireball.style.left = posX + state.fireball.speed + "px";
        }
            
       
    });



    
    // Render wizard
    wizardElement.style.left = wizard.posX + "px";
    wizardElement.style.top = wizard.posY + "px";
    
    
    if(state.gameover){
        alert(`Game Over! You have ${state.score} pts.`)
    } else {
        window.requestAnimationFrame(gameLoop.bind(null, state, game));
    }

    
}

function modifyWizardPosition(state, game) {
    const {wizard} = state;
    
    if(state.keys.KeyD){
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width);
    }
    if(state.keys.KeyA){
        wizard.posX = Math.max(wizard.posX - wizard.speed, 0);
    }
    if(state.keys.KeyW && wizard.posY > 0){
        wizard.posY = Math.max(wizard.posY - wizard.speed, 0);
    }
    if(state.keys.KeyS ){
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height);
    }
}

function detectColllision(objectA, objectB){
      let first = objectA.getBoundingClientRect();
      let second = objectB.getBoundingClientRect();

      let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right);

      return hasCollision
}