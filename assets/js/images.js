function createImage(name) {
    let image = new Image();
    image.src = `assets/images/animals/${name}.png`;
    return image;
}

const images = [
    { etalon: createImage('antilopa'), image: createImage('antilopa_pixelate') },
    { etalon: createImage('bear'), image: createImage('bear_pixelate') },
    { etalon: createImage('bobr'), image: createImage('bobr_pixelate') },
    { etalon: createImage('camel'), image: createImage('camel_pixelate') },
    { etalon: createImage('croc'), image: createImage('croc_pixelate') },
    { etalon: createImage('giraffe'), image: createImage('giraffe_pixelate') },
    { etalon: createImage('gorilla'), image: createImage('gorilla_pixelate') },
    { etalon: createImage('hippo'), image: createImage('hippo_pixelate') },
    { etalon: createImage('horse'), image: createImage('horse_pixelate') },
    { etalon: createImage('lion'), image: createImage('lion_pixelate') },
    { etalon: createImage('olen'), image: createImage('olen_pixelate') },
    { etalon: createImage('rhino'), image: createImage('rhino_pixelate') },
    { etalon: createImage('slon'), image: createImage('slon_pixelate') },
    { etalon: createImage('snake'), image: createImage('snake_pixelate') },
    { etalon: createImage('straus'), image: createImage('straus_pixelate') },
];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }