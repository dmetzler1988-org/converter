//import hexConverter from 'color-converter/hex-converter';
//import rgbConverter from './color-converter/rgb-converter';

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

hexField.addEventListener('keyup', (event) => {
    colorOnKeyPress(event);
});

btnConvertColors.addEventListener('click', (event) => {
    convertColors();
});

btnCleanColors.addEventListener('click', (event) => {
    cleanColors();
});

// Display the input color while input. Hide if color is wrong.
function colorOnKeyPress(event) {
    const $el = event.currentTarget;
    const value = $el.value;

    if (value.length >= 4 && value.length <= 7) {
        typedColorOutput.style.backgroundColor = value;
    } else {
        typedColorOutput.style.backgroundColor = 'transparent';
    }
}

function convertColors() {
    // HEX to RGB
    if (hexField.value !== '') {
        // RGB converter
        let R = hexConverter.hex2R(hexField.value);
        let G = hexConverter.hex2G(hexField.value);
        let B = hexConverter.hex2B(hexField.value);

        rgbColor = [R, G, B];
        colorRgbOutputField.innerText = 'R: ' + rgbColor[0] + ', G: ' + rgbColor[1] + ', B: ' + rgbColor[2];

        // CMYK converter
        cmykColor = hexConverter.hex2cmyk(hexField.value);
        colorCmykOutputField.innerText = 'C: ' + cmykColor[0] + ', M: ' + cmykColor[1] + ', Y: ' + cmykColor[2] + ', K: ' + cmykColor[3];
    }

    // RGB to HEX and CMYK
    if (rgbField1.value !== '' && rgbField2.value !== '' && rgbField3.value !== '') {
        // HEX converter
        hexColor = rgbConverter.rgb2Hex(rgbField1.value, rgbField2.value, rgbField3.value);
        colorHexOutputField.innerText = '#' + hexColor;

        // CMYK converter
        cmykColor = rgbConverter.rgb2cmyk(rgbField1.value, rgbField2.value, rgbField3.value);
        colorCmykOutputField.innerText = 'C: ' + cmykColor[0] + ', M: ' + cmykColor[1] + ', Y: ' + cmykColor[2] + ', K: ' + cmykColor[3];

        // HSV converter
        hsvColor = rgbConverter.rgb2hsv(rgbField1.value, rgbField2.value, rgbField3.value);
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
