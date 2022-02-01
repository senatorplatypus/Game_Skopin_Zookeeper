const INITIAL = 0;
const IN_GAME = 1;
const WIN = 2;
const LOSE = 3;
const TIME_END = 4;


class GameState {
    constructor() {
        this.rightAnswer = null;
        this.level = 1;
        this.score = 0;
        this.clickedElement = null;
        this.maxTime = 40;
        this.curNumRightClick = 0
        this.checkfirst = true
        this.checksecond = true
        this.checkthird = true
    }

    addEvent(event) {
        switch (event) {
            case INITIAL:
                this.onInitial();
                break;
            case IN_GAME:
                break;
            case WIN:
                this.onWin();
                break;
            case LOSE:
                this.onWrongAnswer();
                break;
            case TIME_END:
                this._clearWindow();
                this.onLose();

        }
    }

    onClick(index) {
        this.clickedElement = index;
        if (index === this.rightAnswer[0] || index === this.rightAnswer[1] || index === this.rightAnswer[2]) {
            if (this.checkfirst && index === this.rightAnswer[0]) {
                this.checkfirst = false
                this.curNumRightClick++;
                let element = variantsList[this.clickedElement];
                element.classList.add("correct");
            } else if
                (this.checksecond && index === this.rightAnswer[1]) {
                this.checksecond = false
                this.curNumRightClick++;
                let element = variantsList[this.clickedElement];
                element.classList.add("correct");
            } else if (this.checkthird && index === this.rightAnswer[2]) {
                this.checkthird = false
                this.curNumRightClick++;
                let element = variantsList[this.clickedElement];
                element.classList.add("correct");
            }

            if (this.curNumRightClick == 3) {
                this.checkfirst = true
                this.checksecond = true
                this.checkthird = true
                this.curNumRightClick = 0;
                state.addEvent(WIN);
            }
        } else {
            state.addEvent(LOSE);
        }
    }

    onInitial() {
        resizeCanvas();
        this._clearWindow();
        setupLabels(this.level, this.score);
        setupImages();


        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;

            if (timePassed >= 1000) {
                clearInterval(timer);
                setOnHoverVisibility(true);
                startGame(this.level);
                return;
            }

            let timeFraction = Math.pow(Math.min(timePassed / 900, 1), 10);
            this.drawEtalon(timeFraction, etalon.parentElement.style);
        }, 20);
    }

    drawEtalon(timeFraction, style) {
        style.opacity = `${timeFraction}`;
    }

    _clearWindow() {
        stopGame();
        setOnHoverVisibility(false);
        clearShadows();
        disableEventListeners();
        changeGameOverButtonsVisibility(false);
    }

    onWin() {
        this._clearWindow();
        for (let i = 0; i < 3; i++) {
            let element = variantsList[this.rightAnswer[i]];
            element.classList.add("correct");
        }
        this.score += this._calculateScore();
        this.level++;
        this._updateMaxTime();
        setupLabels(this.level, this.score);
        setTimeout(() => this.addEvent(INITIAL), 1000);
    }

    _calculateScore() {
        return 4 * (getRandomInt(4) + 1) * 20 + (this.maxTime - currentTick + 1);
    }

    _updateMaxTime() {
        if (this.level % 10 === 0 || this.level % 10 === 5) {
            this.maxTime = Math.max(this.maxTime - 10, 10);
        }
    }

    onWrongAnswer() {
        this._clearWindow();
        let element = variantsList[this.clickedElement];
        element.classList.add("error");
        this._animateLose(element.parentElement.style);
    }

    _animateLose(style) {
        let start = Date.now();

        let timer = setInterval(() => {
            let timePassed = Date.now() - start;

            if (timePassed >= 750) {
                clearInterval(timer);
                this.onLose();
                return;
            }

            if (timePassed <= 125) {
                let timeFraction = Math.min(timePassed / 125, 1);
                style.paddingLeft = `${1 - timeFraction}vh`;
                style.paddingRight = `${1 + timeFraction}vh`;
            } else if (timePassed <= 375) {
                let timeFraction = Math.min((timePassed - 125) / 250, 1);
                style.paddingLeft = `${2 * timeFraction}vh`;
                style.paddingRight = `${2 * (1 - timeFraction)}vh`;
            } else if (timePassed <= 625) {
                let timeFraction = Math.min((timePassed - 375) / 250, 1);
                style.paddingLeft = `${2 * (1 - timeFraction)}vh`;
                style.paddingRight = `${2 * timeFraction}vh`;
            } else if (timePassed < 750) {
                let timeFraction = Math.min((timePassed - 625) / 125, 1);
                style.paddingLeft = `${timeFraction}vh`;
                style.paddingRight = `${2 - timeFraction}vh`;
            }
        }, 20);
    }

    onLose() {
        changeGameOverButtonsVisibility(true);
        this._saveResults();
    }

    _saveResults() {
        let user = getCurrentUser();
        user.saveResult(this.score);
    }

    getTimePercents() {
        return Math.floor(currentTick * 100 / this.maxTime);
    }

    isTimeOver() {
        return currentTick === this.maxTime;
    }
}