//import hexConverter from 'color-converter/hex-converter';
//import rgbConverter from './color-converter/rgb-converter';

const sizesBase = document.getElementById('sizes-base');

const sizesPx = document.getElementById('sizesPx');
// https://www.ninjaunits.com/converters/pixels/pixels-rem/
const sizesRem = document.getElementById('sizesRem');
// https://www.ninjaunits.com/converters/pixels/pixels-ems/
const sizesEm = document.getElementById('sizesEm');
// https://www.ninjaunits.com/converters/pixels/pixels-points/
const ptBase = 0.75;
const sizesPt = document.getElementById('sizesPt');

const sizePxOutputField = document.getElementById('sizesPx-output');
const sizeRemOutputField = document.getElementById('sizesRem-output');
const sizeEmOutputField = document.getElementById('sizesEm-output');
const sizePtOutputField = document.getElementById('sizesPt-output');

const btnConvertSizes = document.getElementById('button-convert-screen-sizes');
const btnCleanSizes = document.getElementById('button-clean-screen-sizes');

let sizeBase;
let sizePxValue;

btnConvertSizes.addEventListener('click', (event) => {
    convertSizes();
});

btnCleanSizes.addEventListener('click', (event) => {
    cleanSizes();
});

function cleanSizes() {
    sizesBase.value = 16;
    sizesPx.value = '';
    sizesRem.value = '';
    sizesEm.value = '';
    sizesPt.value = '';

    sizePxOutputField.innerText = '';
    sizeRemOutputField.innerText = '';
    sizeEmOutputField.innerText = '';
    sizePtOutputField.innerText = '';
}

function convertSizes() {
    sizeBase = sizesBase.value;

    if (sizeBase === '') {
        alert('Please fill in a base size!');

        return;
    }

    if (sizesPx.value !== '') {
        sizePxValue = sizesPx.value;
        convertPxToRem(sizePxValue);
        convertPxToEm(sizePxValue);
        convertPxToPt(sizePxValue);
    }

    if (sizesRem.value !== '') {
        sizePxValue = convertRemToPx();
        convertPxToEm(sizePxValue);
        convertPxToPt(sizePxValue);

        sizeRemOutputField.innerText = sizesRem.value;
    }

    if (sizesEm.value !== '') {
        sizePxValue = convertEmToPx();
        convertPxToRem(sizePxValue);
        convertPxToPt(sizePxValue);

        sizeEmOutputField.innerText = sizesEm.value;
    }

    if (sizesPt.value !== '') {
        sizePxValue = convertPtToPx();
        convertPxToRem(sizePxValue);
        convertPxToEm(sizePxValue);

        sizePtOutputField.innerText = sizesPt.value;
    }

    sizePxOutputField.innerText = sizePxValue;
}

function convertPxToRem(pxValue) {
    sizeRemOutputField.innerText = pxValue / sizeBase;
}

function convertRemToPx() {
    return sizesRem.value * sizeBase;
}

function convertPxToEm(pxValue) {
    sizeEmOutputField.innerText = pxValue / sizeBase;
}

function convertEmToPx() {
    return sizesEm.value * sizeBase;
}

function convertPxToPt(pxValue) {
    sizePtOutputField.innerText = pxValue * ptBase;
}

function convertPtToPx() {
    return sizesPt.value / ptBase;
}
