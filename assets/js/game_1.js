function setupImages() {
    let img = getRandomElements(images, 13);
    let firstRandAnswer = getRandomInt(13);

    const etalonContext = etalon.getContext("2d");
    _drawImage(etalonContext, img[firstRandAnswer].etalon);
    state.drawEtalon(0, etalon.parentElement.style);

    let ra = img[firstRandAnswer].etalon.src
    img.push(img[firstRandAnswer])
    img.push(img[firstRandAnswer])
    shuffle(img)
    state.rightAnswer = []

    for (let i = 0; i < 15; i++) {
        if (ra == img[i].etalon.src) {
            state.rightAnswer.push(i)
        }
    }

    forEach(variantsList, (element, i) => {
        _setupElement(element, img[i].etalon);
        _setEventListeners(element, i);
    });
}

function _setupElement(element, image) {
    let cns = element.getElementsByTagName("canvas");
    let context = cns[0].getContext("2d");
    context.filter = 'blur(1px)';
    context.lineCap = "round";
    _drawImage(context, image);
    _setupImage(context);
}

function _drawImage(ctx, img) {
    ctx.fillStyle = getRandomColor();
    ctx.fillRect(0, 0, 200, 200);
    ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
}

function _setupImage(context) {
    context.fillStyle = getRandomColor();

    context.arc(getRandomInt(canvasSize), getRandomInt(canvasSize), getRandomInt(20), 0, (Math.PI*4)/2, true);
    context.arc(getRandomInt(canvasSize), getRandomInt(canvasSize), getRandomInt(20), 0, (Math.PI*4)/2, true);
    context.arc(getRandomInt(canvasSize), getRandomInt(canvasSize), getRandomInt(20), 0, (Math.PI*4)/2, true);
    context.arc(getRandomInt(canvasSize), getRandomInt(canvasSize), getRandomInt(20), 0, (Math.PI*4)/2, true);
    context.fill();
}