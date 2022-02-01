const canvasSize = document.documentElement.clientHeight * 0.202;

var state = new GameState();
var variantsList;
var timerHandler;
var currentTick;

window.onload = function() {

    variantsList = document.getElementsByClassName('variant');
    state.addEvent(INITIAL);
};

reload.onclick = function() {
    state = new GameState();
    state.addEvent(INITIAL);
}

menu.onclick = function() {
    location.replace("menu.html");
}

function setupLabels(level, score) {
    timer.style.width = `0%`;
    levelLabel.innerHTML = `Задание: ${level}`;
    scoreLabel.innerHTML = `Очков: ${score}`;
}

function resizeCanvas() {
    const canvas = document.querySelectorAll("canvas");
    canvas.forEach((c) => {
        c.width = canvasSize;
        c.height = canvasSize;
    });
}

function _setEventListeners(element, index) {
    element.onclick = () => state.onClick(index);
}

function disableEventListeners() {
    forEach(variantsList, (e) => e.onclick = null);
}

function setOnHoverVisibility(isVisible) {
    forEach(variantsList, (element) => {
        if (isVisible) {
            element.onmouseenter = () => {
                element.classList.add("hovered");
            }

            element.onmouseleave = () => {
                element.classList.remove("hovered");
            }
        } else {
            element.onmouseenter = null;
            element.onmouseleave = null;
        }
    });
}

function clearShadows() {
    forEach(variantsList, (element) => {
        if (element.classList.contains("hovered")) {
            element.classList.remove("hovered");
        }

        if (element.classList.contains("correct")) {
            element.classList.remove("correct");
        }

        if (element.classList.contains("error")) {
            element.classList.remove("error");
        }
    });
}

function onTick() {
    currentTick += 1;
    timer.style.width = `${state.getTimePercents()}%`;
    if (state.isTimeOver()) {
        state.addEvent(TIME_END);
    }
}

function changeGameOverButtonsVisibility(isVisible) {
    gameOverButtons.style.display = isVisible ? 'block' : 'none';
    gameOverLabel.style.display = isVisible ? 'block' : 'none';
}

function startGame(level) {
    timerHandler = setInterval(onTick, 250-level*5);
}

function stopGame() {
    clearInterval(timerHandler);
    currentTick = 0;
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function getRandomInt(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

function forEach(array, block) {
    for (var i = 0; i < array.length; i++) {
        block(array[i], i);
    }
}

function getRandomElements(array, number) {
    return shuffle(Array.from(array)).slice(0, number);
}