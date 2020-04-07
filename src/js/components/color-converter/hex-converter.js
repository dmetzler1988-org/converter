// Converter HEX to RGB.
function hex2R(h) {return parseInt((cutHex(h)).substring(0, 2), 16)}
function hex2G(h) {return parseInt((cutHex(h)).substring(2, 4), 16)}
function hex2B(h) {return parseInt((cutHex(h)).substring(4, 6), 16)}
function cutHex(h) {return (h.charAt(0) == '#') ? h.substring(1, 7) : h}

// Converter HEX to CMYK.
function hex2cmyk (hex) {
    let computedC = 0;
    let computedM = 0;
    let computedY = 0;
    let computedK = 0;

    hex = (hex.charAt(0) == '#') ? hex.substring(1, 7) : hex;

    if (hex.length != 6) {
        alert ('Invalid length of the input hex value!');
        return;
    }
    if (/[0-9a-f]{6}/i.test(hex) != true) {
        alert ('Invalid digits in the input hex value!');
        return;
    }

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // BLACK
    if (r == 0 && g == 0 && b == 0) {
        computedK = 1;

        return [0, 0, 0, 1];
    }

    computedC = 1 - (r / 255);
    computedM = 1 - (g / 255);
    computedY = 1 - (b / 255);

    let minCMY = Math.min(computedC, Math.min(computedM, computedY));

    computedC = (computedC - minCMY) / (1 - minCMY) ;
    computedM = (computedM - minCMY) / (1 - minCMY) ;
    computedY = (computedY - minCMY) / (1 - minCMY) ;
    computedK = minCMY;

    return [computedC, computedM, computedY, computedK];
}
