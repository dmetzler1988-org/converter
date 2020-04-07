// Converter RGB to HEX.
function rgb2Hex(R, G, B) {
    return toHex(R) + toHex(G) + toHex(B)
}

function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return '00';
    n = Math.max(0, Math.min(n, 255));

    return '0123456789ABCDEF'.charAt((n - n % 16) / 16)
        + '0123456789ABCDEF'.charAt(n % 16);
}

// Converter RGB to CMYK.
function rgb2cmyk(red, green, blue) {
    let computedC = 0;
    let computedM = 0;
    let computedY = 0;
    let computedK = 0;

    //remove spaces from input RGB values, convert to int
    let r = parseInt(('' + red).replace(/\s/g, ''), 10);
    let g = parseInt(('' + green).replace(/\s/g, ''), 10);
    let b = parseInt(('' + blue).replace(/\s/g, ''), 10);


    if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {
        alert('Please enter numeric RGB values!');
        return;
    }

    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
        alert('RGB values must be in the range 0 to 255.');
        return;
    }

    // BLACK
    if (r == 0 && g == 0 && b == 0) {
        computedK = 1;
        return [0, 0, 0, 1];
    }

    computedC = 1 - (r / 255);
    computedM = 1 - (g / 255);
    computedY = 1 - (b / 255);

    let minCMY = Math.min(computedC,
        Math.min(computedM, computedY));
    computedC = (computedC - minCMY) / (1 - minCMY);
    computedM = (computedM - minCMY) / (1 - minCMY);
    computedY = (computedY - minCMY) / (1 - minCMY);
    computedK = minCMY;

    return [computedC, computedM, computedY, computedK];
}

// Converter RGB to HSV.
function rgb2hsv(red, green, blue) {
    let computedH = 0;
    let computedS = 0;
    let computedV = 0;

    //remove spaces from input RGB values, convert to int
    let r = parseInt(('' + red).replace(/\s/g, ''), 10);
    let g = parseInt(('' + green).replace(/\s/g, ''), 10);
    let b = parseInt(('' + blue).replace(/\s/g, ''), 10);

    if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {
        alert('Please enter numeric RGB values!');
        return;
    }

    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
        alert('RGB values must be in the range 0 to 255.');
        return;
    }

    r = r / 255;
    g = g / 255;
    b = b / 255;

    let minRGB = Math.min(r, Math.min(g, b));
    let maxRGB = Math.max(r, Math.max(g, b));

    // Black-gray-white
    if (minRGB == maxRGB) {
        computedV = minRGB;

        return [0, 0, computedV];
    }

    // Colors other than black-gray-white:
    let d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
    let h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);

    computedH = 60 * (h - d / (maxRGB - minRGB));
    computedS = (maxRGB - minRGB) / maxRGB;
    computedV = maxRGB;

    return [computedH, computedS, computedV];
}
