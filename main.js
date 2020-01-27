const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 5,
    trafic: 3
}

function getQuantityElements(heightsElement) {
    return document.documentElement.clientHeight / heightsElement + 1;
}

function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.score = 0;
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.style.top = (i * 100) + 'px';
        line.classList.add('line');
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.trafic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.trafic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth -50 )) + 'px';
        enemy.style.background = 'transparent url(/image/enemy2.png) center / cover no-repeat';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);

    }
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    if (setting.start) {
        setting.score += setting.speed;
        score.innerHTML = 'SCORE: </br>' + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }

        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }

        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }


        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (enemy) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false;
                start.classList.remove('hide');
                start.style.top = score.offsetHeight + 'px';
        }

        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y > document.documentElement.clientHeight) {
            enemy.y = -100 * setting.trafic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth -50 )) + 'px';

        }
    })
}