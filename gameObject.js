function initGameObject() {
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');

    return {
        startScreen,
        gameScreen,
        createWizard(initialState){
            let wizardElement = document.createElement('div');
            wizardElement.classList.add("wizard");

            wizardElement.style.height = initialState.height + "px";
            wizardElement.style.width = initialState.width + "px";

            wizardElement.style.left = initialState.startX + "px";
            wizardElement.style.top = initialState.startY + "px";
 
            this.wizardElement = wizardElement;
            gameScreen.appendChild(wizardElement);

            return wizardElement;

        },
        createFireball(wizard, fireball){
            let fireballElement = document.createElement('div');
            fireballElement.classList.add('fireball');
            fireballElement.style.left = wizard.posX + wizard.width + "px";
            fireballElement.style.top = wizard.posY + wizard.height  / 3 + 4 + "px";
            fireballElement.style.width = fireball.width + "px";
            fireballElement.style.height = fireball.height + "px";
            


            gameScreen.appendChild(fireballElement);
        },
        createBug(stats) {
            let bugElement = document.createElement("div");
            bugElement.classList.add("bug");
            bugElement.style.width = stats.width + 'px';
            bugElement.style.height = stats.height  + 'px';
            bugElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';
            bugElement.style.left = gameScreen.offsetWidth - stats.width + 'px';

            gameScreen.appendChild(bugElement)

        },

        createCloud(stats) {
            let cloudElement = document.createElement('div');
            cloudElement.classList.add('cloud');
            cloudElement.style.width = stats.width + "px";
            cloudElement.style.height = stats.height + "px";
            cloudElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + "px";
            cloudElement.style.left = gameScreen.offsetWidth - stats.width + "px";

            gameScreen.appendChild(cloudElement)
        }

    };
}