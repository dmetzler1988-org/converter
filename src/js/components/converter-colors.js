//import hexConverter from 'color-converter/hex-converter';
//import rgbConverter from './color-converter/rgb-converter';
export const init = () => {
    const typedColorOutput = document.getElementById('typed-color-output');

    const hexField = document.getElementById('colorHex');
    const rgbField1 = document.getElementById('colorRgb1');
    const rgbField2 = document.getElementById('colorRgb2');
    const rgbField3 = document.getElementById('colorRgb3');

    const colorHexOutputField = document.getElementById('colorHex-output');
    const colorRgbOutputField = document.getElementById('colorRgb-output');
    const colorCmykOutputField = document.getElementById('colorCmyk-output');
    const colorHsvOutputField = document.getElementById('colorHsv-output');

    const btnConvertColors = document.getElementById('button-convert-colors');
    const btnCleanColors = document.getElementById('button-clean-colors');

    let hexColor = '';
    let rgbColor = '';
    let cmykColor = '';
    let hsvColor = '';

// Add key press event listeners.
    document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            convertColors();
        } else if (event.key === 'Escape') {
            cleanColors();
        }
    });

    hexField.addEventListener('keyup', (event) => {
        colorOnKeyPressHex(event);
    });

    btnConvertColors.addEventListener('click', (event) => {
        convertColors();
    });

    btnCleanColors.addEventListener('click', (event) => {
        cleanColors();
    });

// Display the input color while input. Hide if color is wrong.
    function colorOnKeyPressHex(event) {
        const $el = event.currentTarget;
        const value = $el.value;

        if (value.length >= 4 && value.length <= 7) {
            typedColorOutput.style.backgroundColor = value;
        } else {
            typedColorOutput.style.backgroundColor = 'transparent';
        }
    }

    function convertColors() {
        if (hexField.value !== '' && rgbField1.value !== '' && rgbField2.value !== '' && rgbField3.value !== '') {
            alert('Only set values for HEX or RGB. Not both!\nElse the last (RGB) will be converted.');

            return;
        }

        // HEX to RGB
        if (hexField.value !== '') {
            // RGB converter
            let R = hex2R(hexField.value);
            let G = hex2G(hexField.value);
            let B = hex2B(hexField.value);

            // HEX output
            colorHexOutputField.innerText = hexField.value.toUpperCase();

            // RGB converter
            rgbColor = [R, G, B];
            colorRgbOutputField.innerText = 'R: ' + rgbColor[0] + ', G: ' + rgbColor[1] + ', B: ' + rgbColor[2];

            // CMYK converter
            cmykColor = hex2cmyk(hexField.value);
            colorCmykOutputField.innerText = 'C: ' + cmykColor[0] + ', M: ' + cmykColor[1] + ', Y: ' + cmykColor[2] + ', K: ' + cmykColor[3];

            // HSV converter - needs timout to make sure, that RGB converter is finished before.
            setTimeout(() => {
                hsvColor = rgb2hsv(rgbColor[0], rgbColor[1], rgbColor[2]);
                colorHsvOutputField.innerText = 'H: ' + hsvColor[0] + ', S: ' + hsvColor[1] + ', V: ' + hsvColor[2];
            }, 50);
        }

        // RGB to HEX, RGB, CMYK, HSV
        if (rgbField1.value !== '' && rgbField2.value !== '' && rgbField3.value !== '') {
            // HEX converter
            hexColor = rgb2Hex(rgbField1.value, rgbField2.value, rgbField3.value);
            colorHexOutputField.innerText = '#' + hexColor;

            // RGB output
            colorRgbOutputField.innerText = 'R: ' + rgbField1.value + ', G: ' + rgbField2.value + ', B: ' + rgbField3.value;

            // CMYK converter
            cmykColor = rgb2cmyk(rgbField1.value, rgbField2.value, rgbField3.value);
            colorCmykOutputField.innerText = 'C: ' + cmykColor[0] + ', M: ' + cmykColor[1] + ', Y: ' + cmykColor[2] + ', K: ' + cmykColor[3];

            // HSV converter
            hsvColor = rgb2hsv(rgbField1.value, rgbField2.value, rgbField3.value);
            colorHsvOutputField.innerText = 'H: ' + hsvColor[0] + ', S: ' + hsvColor[1] + ', V: ' + hsvColor[2];
        }
    }

    function cleanColors() {
        rgbField1.value = '';
        rgbField2.value = '';
        rgbField3.value = '';
        hexField.value = '';
        colorRgbOutputField.innerText = '';
        colorHexOutputField.innerText = '';
        colorCmykOutputField.innerText = '';
        colorHsvOutputField.innerText = '';
    }

// Converter HEX to RGB.
    function hex2R(h) {
        return parseInt((cutHex(h)).substring(0, 2), 16)
    }

    function hex2G(h) {
        return parseInt((cutHex(h)).substring(2, 4), 16)
    }

    function hex2B(h) {
        return parseInt((cutHex(h)).substring(4, 6), 16)
    }

    function cutHex(h) {
        return (h.charAt(0) == '#') ? h.substring(1, 7) : h
    }

// Converter HEX to CMYK.
    function hex2cmyk(hex) {
        let computedC = 0;
        let computedM = 0;
        let computedY = 0;
        let computedK = 0;

        hex = (hex.charAt(0) == '#') ? hex.substring(1, 7) : hex;

        if (hex.length != 6) {
            alert('Invalid length of the input hex value!');
            return;
        }
        if (/[0-9a-f]{6}/i.test(hex) != true) {
            alert('Invalid digits in the input hex value!');
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

        computedC = (computedC - minCMY) / (1 - minCMY);
        computedM = (computedM - minCMY) / (1 - minCMY);
        computedY = (computedY - minCMY) / (1 - minCMY);
        computedK = minCMY;

        return [computedC, computedM, computedY, computedK];
    }

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
};
