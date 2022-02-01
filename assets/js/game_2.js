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
    context.fillStyle = getRandomColor();
    context.fillRect(0, 0, 200, 200);
    let filt = getRandomInt(3);
    if (filt > 0) {
        context.filter = 'blur(2px)';
    }

    if (filt > 1) {
        context.filter = 'invert(1)';
    }
    context.lineWidth = 10;
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
    context.strokeStyle = getRandomColor();
    context.beginPath();
    context.moveTo(getRandomInt(canvasSize),getRandomInt(canvasSize));
    context.quadraticCurveTo(200,getRandomInt(canvasSize),getRandomInt(canvasSize),getRandomInt(canvasSize));
    context.quadraticCurveTo(getRandomInt(canvasSize),0,getRandomInt(canvasSize),0);
    context.quadraticCurveTo(getRandomInt(canvasSize),getRandomInt(canvasSize),200,getRandomInt(canvasSize));
    context.quadraticCurveTo(0,getRandomInt(canvasSize),0,getRandomInt(canvasSize));
    context.quadraticCurveTo(getRandomInt(canvasSize),200,getRandomInt(canvasSize),getRandomInt(canvasSize));
    context.stroke();
}