function initState() {
    let startX = Math.floor(Math.random() * 1000);
    let startY = Math.floor(Math.random() * 500);

    const state = {
        player: "Pesho",
        gameover: false,
        score: 0,
        killBugPoints: 50,
        wizard: {
            width: 82,
            height: 100,
            posX: startX,
            posY: startY,
            speed: 10,
        },
        cloudsStats: {
            width: 200,
            height: 200,
            nextSpownTimestamp: 0,
            maxSpownInterval: 5000,
            speed: 4,
        },
        bugStats: {
            width: 50,
            height: 50,
            nextSpownTimestamp: 0,
            maxSpownInterval: 1500,
            speed: 8,
        },
        fireball: {
            width: 20,
            height: 20,
            speed: 10,
        },
        keys: {
            KeyA: false,
            KeyS: false,
            KeyD: false,
            KeyW: false,
            Space: false,
        },

    }   
    return state;
}