/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ColorConverter = __webpack_require__(/*! ./components/converter-colors */ \"./src/js/components/converter-colors.js\"); //ColorConverter.init();\n\n\nwindow.ColorConverter = ColorConverter;\n\nvar ScreenSizesConverter = __webpack_require__(/*! ./components/converter-screen-sizes */ \"./src/js/components/converter-screen-sizes.js\"); //ScreenSizesConverter.init();\n\n\nwindow.ScreenSizesConverter = ScreenSizesConverter;\n\nvar HtmlCssSplitter = __webpack_require__(/*! ./components/splitter-html-css */ \"./src/js/components/splitter-html-css.js\"); //HtmlCssSplitter.init();\n\n\nwindow.HtmlCssSplitter = HtmlCssSplitter;\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/components/converter-colors.js":
/*!***********************************************!*\
  !*** ./src/js/components/converter-colors.js ***!
  \***********************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n//import hexConverter from 'color-converter/hex-converter';\n//import rgbConverter from './color-converter/rgb-converter';\nvar init = function init() {\n  var typedColorOutput = document.getElementById('typed-color-output');\n  var hexField = document.getElementById('colorHex');\n  var rgbField1 = document.getElementById('colorRgb1');\n  var rgbField2 = document.getElementById('colorRgb2');\n  var rgbField3 = document.getElementById('colorRgb3');\n  var colorHexOutputField = document.getElementById('colorHex-output');\n  var colorRgbOutputField = document.getElementById('colorRgb-output');\n  var colorCmykOutputField = document.getElementById('colorCmyk-output');\n  var colorHsvOutputField = document.getElementById('colorHsv-output');\n  var btnConvertColors = document.getElementById('button-convert-colors');\n  var btnCleanColors = document.getElementById('button-clean-colors');\n  var hexColor = '';\n  var rgbColor = '';\n  var cmykColor = '';\n  var hsvColor = ''; // Add key press event listeners.\n\n  document.addEventListener('keyup', function (event) {\n    if (event.key === 'Enter') {\n      convertColors();\n    } else if (event.key === 'Escape') {\n      cleanColors();\n    }\n  });\n  hexField.addEventListener('keyup', function (event) {\n    colorOnKeyPressHex(event);\n  });\n  btnConvertColors.addEventListener('click', function (event) {\n    convertColors();\n  });\n  btnCleanColors.addEventListener('click', function (event) {\n    cleanColors();\n  }); // Display the input color while input. Hide if color is wrong.\n\n  function colorOnKeyPressHex(event) {\n    var $el = event.currentTarget;\n    var value = $el.value;\n\n    if (value.length >= 4 && value.length <= 7) {\n      typedColorOutput.style.backgroundColor = value;\n    } else {\n      typedColorOutput.style.backgroundColor = 'transparent';\n    }\n  }\n\n  function convertColors() {\n    if (hexField.value !== '' && rgbField1.value !== '' && rgbField2.value !== '' && rgbField3.value !== '') {\n      alert('Only set values for HEX or RGB. Not both!\\nElse the last (RGB) will be converted.');\n      return;\n    } // HEX to RGB\n\n\n    if (hexField.value !== '') {\n      // RGB converter\n      var R = hex2R(hexField.value);\n      var G = hex2G(hexField.value);\n      var B = hex2B(hexField.value); // HEX output\n\n      colorHexOutputField.innerText = hexField.value.toUpperCase(); // RGB converter\n\n      rgbColor = [R, G, B];\n      colorRgbOutputField.innerText = 'R: ' + rgbColor[0] + ', G: ' + rgbColor[1] + ', B: ' + rgbColor[2]; // CMYK converter\n\n      cmykColor = hex2cmyk(hexField.value);\n      colorCmykOutputField.innerText = 'C: ' + cmykColor[0] + ', M: ' + cmykColor[1] + ', Y: ' + cmykColor[2] + ', K: ' + cmykColor[3]; // HSV converter - needs timout to make sure, that RGB converter is finished before.\n\n      setTimeout(function () {\n        hsvColor = rgb2hsv(rgbColor[0], rgbColor[1], rgbColor[2]);\n        colorHsvOutputField.innerText = 'H: ' + hsvColor[0] + ', S: ' + hsvColor[1] + ', V: ' + hsvColor[2];\n      }, 50);\n    } // RGB to HEX, RGB, CMYK, HSV\n\n\n    if (rgbField1.value !== '' && rgbField2.value !== '' && rgbField3.value !== '') {\n      // HEX converter\n      hexColor = rgb2Hex(rgbField1.value, rgbField2.value, rgbField3.value);\n      colorHexOutputField.innerText = '#' + hexColor; // RGB output\n\n      colorRgbOutputField.innerText = 'R: ' + rgbField1.value + ', G: ' + rgbField2.value + ', B: ' + rgbField3.value; // CMYK converter\n\n      cmykColor = rgb2cmyk(rgbField1.value, rgbField2.value, rgbField3.value);\n      colorCmykOutputField.innerText = 'C: ' + cmykColor[0] + ', M: ' + cmykColor[1] + ', Y: ' + cmykColor[2] + ', K: ' + cmykColor[3]; // HSV converter\n\n      hsvColor = rgb2hsv(rgbField1.value, rgbField2.value, rgbField3.value);\n      colorHsvOutputField.innerText = 'H: ' + hsvColor[0] + ', S: ' + hsvColor[1] + ', V: ' + hsvColor[2];\n    }\n  }\n\n  function cleanColors() {\n    rgbField1.value = '';\n    rgbField2.value = '';\n    rgbField3.value = '';\n    hexField.value = '';\n    colorRgbOutputField.innerText = '';\n    colorHexOutputField.innerText = '';\n    colorCmykOutputField.innerText = '';\n    colorHsvOutputField.innerText = '';\n  } // Converter HEX to RGB.\n\n\n  function hex2R(h) {\n    return parseInt(cutHex(h).substring(0, 2), 16);\n  }\n\n  function hex2G(h) {\n    return parseInt(cutHex(h).substring(2, 4), 16);\n  }\n\n  function hex2B(h) {\n    return parseInt(cutHex(h).substring(4, 6), 16);\n  }\n\n  function cutHex(h) {\n    return h.charAt(0) == '#' ? h.substring(1, 7) : h;\n  } // Converter HEX to CMYK.\n\n\n  function hex2cmyk(hex) {\n    var computedC = 0;\n    var computedM = 0;\n    var computedY = 0;\n    var computedK = 0;\n    hex = hex.charAt(0) == '#' ? hex.substring(1, 7) : hex;\n\n    if (hex.length != 6) {\n      alert('Invalid length of the input hex value!');\n      return;\n    }\n\n    if (/[0-9a-f]{6}/i.test(hex) != true) {\n      alert('Invalid digits in the input hex value!');\n      return;\n    }\n\n    var r = parseInt(hex.substring(0, 2), 16);\n    var g = parseInt(hex.substring(2, 4), 16);\n    var b = parseInt(hex.substring(4, 6), 16); // BLACK\n\n    if (r == 0 && g == 0 && b == 0) {\n      computedK = 1;\n      return [0, 0, 0, 1];\n    }\n\n    computedC = 1 - r / 255;\n    computedM = 1 - g / 255;\n    computedY = 1 - b / 255;\n    var minCMY = Math.min(computedC, Math.min(computedM, computedY));\n    computedC = (computedC - minCMY) / (1 - minCMY);\n    computedM = (computedM - minCMY) / (1 - minCMY);\n    computedY = (computedY - minCMY) / (1 - minCMY);\n    computedK = minCMY;\n    return [computedC, computedM, computedY, computedK];\n  } // Converter RGB to HEX.\n\n\n  function rgb2Hex(R, G, B) {\n    return toHex(R) + toHex(G) + toHex(B);\n  }\n\n  function toHex(n) {\n    n = parseInt(n, 10);\n    if (isNaN(n)) return '00';\n    n = Math.max(0, Math.min(n, 255));\n    return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);\n  } // Converter RGB to CMYK.\n\n\n  function rgb2cmyk(red, green, blue) {\n    var computedC = 0;\n    var computedM = 0;\n    var computedY = 0;\n    var computedK = 0; //remove spaces from input RGB values, convert to int\n\n    var r = parseInt(('' + red).replace(/\\s/g, ''), 10);\n    var g = parseInt(('' + green).replace(/\\s/g, ''), 10);\n    var b = parseInt(('' + blue).replace(/\\s/g, ''), 10);\n\n    if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {\n      alert('Please enter numeric RGB values!');\n      return;\n    }\n\n    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {\n      alert('RGB values must be in the range 0 to 255.');\n      return;\n    } // BLACK\n\n\n    if (r == 0 && g == 0 && b == 0) {\n      computedK = 1;\n      return [0, 0, 0, 1];\n    }\n\n    computedC = 1 - r / 255;\n    computedM = 1 - g / 255;\n    computedY = 1 - b / 255;\n    var minCMY = Math.min(computedC, Math.min(computedM, computedY));\n    computedC = (computedC - minCMY) / (1 - minCMY);\n    computedM = (computedM - minCMY) / (1 - minCMY);\n    computedY = (computedY - minCMY) / (1 - minCMY);\n    computedK = minCMY;\n    return [computedC, computedM, computedY, computedK];\n  } // Converter RGB to HSV.\n\n\n  function rgb2hsv(red, green, blue) {\n    var computedH = 0;\n    var computedS = 0;\n    var computedV = 0; //remove spaces from input RGB values, convert to int\n\n    var r = parseInt(('' + red).replace(/\\s/g, ''), 10);\n    var g = parseInt(('' + green).replace(/\\s/g, ''), 10);\n    var b = parseInt(('' + blue).replace(/\\s/g, ''), 10);\n\n    if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {\n      alert('Please enter numeric RGB values!');\n      return;\n    }\n\n    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {\n      alert('RGB values must be in the range 0 to 255.');\n      return;\n    }\n\n    r = r / 255;\n    g = g / 255;\n    b = b / 255;\n    var minRGB = Math.min(r, Math.min(g, b));\n    var maxRGB = Math.max(r, Math.max(g, b)); // Black-gray-white\n\n    if (minRGB == maxRGB) {\n      computedV = minRGB;\n      return [0, 0, computedV];\n    } // Colors other than black-gray-white:\n\n\n    var d = r == minRGB ? g - b : b == minRGB ? r - g : b - r;\n    var h = r == minRGB ? 3 : b == minRGB ? 1 : 5;\n    computedH = 60 * (h - d / (maxRGB - minRGB));\n    computedS = (maxRGB - minRGB) / maxRGB;\n    computedV = maxRGB;\n    return [computedH, computedS, computedV];\n  }\n};\n\n//# sourceURL=webpack:///./src/js/components/converter-colors.js?");

/***/ }),

/***/ "./src/js/components/converter-screen-sizes.js":
/*!*****************************************************!*\
  !*** ./src/js/components/converter-screen-sizes.js ***!
  \*****************************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\nvar init = function init() {\n  var sizesBase = document.getElementById('sizes-base');\n  var sizesPx = document.getElementById('sizesPx'); // https://www.ninjaunits.com/converters/pixels/pixels-rem/\n\n  var sizesRem = document.getElementById('sizesRem'); // https://www.ninjaunits.com/converters/pixels/pixels-ems/\n\n  var sizesEm = document.getElementById('sizesEm'); // https://www.ninjaunits.com/converters/pixels/pixels-points/\n\n  var ptBase = 0.75;\n  var sizesPt = document.getElementById('sizesPt'); //\n\n  var sizesPercent = document.getElementById('sizesPercent');\n  var sizePxOutputField = document.getElementById('sizesPx-output');\n  var sizeRemOutputField = document.getElementById('sizesRem-output');\n  var sizeEmOutputField = document.getElementById('sizesEm-output');\n  var sizePtOutputField = document.getElementById('sizesPt-output');\n  var sizePercentOutputField = document.getElementById('sizesPercent-output');\n  var btnConvertSizes = document.getElementById('button-convert-screen-sizes');\n  var btnCleanSizes = document.getElementById('button-clean-screen-sizes');\n  var sizeBase;\n  var sizePxValue; // Add key press event listeners.\n\n  document.addEventListener('keyup', function (event) {\n    if (event.key === 'Enter') {\n      convertSizes();\n    } else if (event.key === 'Escape') {\n      cleanSizes();\n    }\n  });\n  btnConvertSizes.addEventListener('click', function (event) {\n    convertSizes();\n  });\n  btnCleanSizes.addEventListener('click', function (event) {\n    cleanSizes();\n  });\n\n  function cleanSizes() {\n    sizesBase.value = 16;\n    sizesPx.value = '';\n    sizesRem.value = '';\n    sizesEm.value = '';\n    sizesPt.value = '';\n    sizePxOutputField.innerText = '';\n    sizeRemOutputField.innerText = '';\n    sizeEmOutputField.innerText = '';\n    sizePtOutputField.innerText = '';\n  }\n\n  function convertSizes() {\n    sizeBase = sizesBase.value;\n\n    if (sizeBase === '') {\n      alert('Please fill in a base size!');\n      return;\n    }\n\n    if (sizesPx.value !== '') {\n      sizePxValue = sizesPx.value;\n      convertPxToRem(sizePxValue);\n      convertPxToEm(sizePxValue);\n      convertPxToPt(sizePxValue);\n      convertPxToPercent(sizePxValue);\n    }\n\n    if (sizesRem.value !== '') {\n      sizePxValue = convertRemToPx();\n      convertPxToEm(sizePxValue);\n      convertPxToPt(sizePxValue);\n      convertPxToPercent(sizePxValue);\n      sizeRemOutputField.innerText = sizesRem.value;\n    }\n\n    if (sizesEm.value !== '') {\n      sizePxValue = convertEmToPx();\n      convertPxToRem(sizePxValue);\n      convertPxToPt(sizePxValue);\n      convertPxToPercent(sizePxValue);\n      sizeEmOutputField.innerText = sizesEm.value;\n    }\n\n    if (sizesPt.value !== '') {\n      sizePxValue = convertPtToPx();\n      convertPxToRem(sizePxValue);\n      convertPxToEm(sizePxValue);\n      convertPxToPercent(sizePxValue);\n      sizePtOutputField.innerText = sizesPt.value;\n    }\n\n    if (sizesPercent.value !== '') {\n      sizePxValue = convertPercentToPx();\n      convertPxToRem(sizePxValue);\n      convertPxToEm(sizePxValue);\n      convertPxToPt(sizePxValue);\n      sizePercentOutputField.innerText = sizesPercent.value;\n    }\n\n    sizePxOutputField.innerText = sizePxValue;\n  }\n\n  function convertPxToRem(pxValue) {\n    sizeRemOutputField.innerText = pxValue / sizeBase;\n  }\n\n  function convertRemToPx() {\n    return sizesRem.value * sizeBase;\n  }\n\n  function convertPxToEm(pxValue) {\n    sizeEmOutputField.innerText = pxValue / sizeBase;\n  }\n\n  function convertEmToPx() {\n    return sizesEm.value * sizeBase;\n  }\n\n  function convertPxToPt(pxValue) {\n    sizePtOutputField.innerText = pxValue * ptBase;\n  }\n\n  function convertPtToPx() {\n    return sizesPt.value / ptBase;\n  }\n\n  function convertPxToPercent(pxValue) {\n    var ratio = 100 / sizeBase;\n    sizePercentOutputField.innerText = pxValue * ratio;\n  }\n\n  function convertPercentToPx() {\n    var ratio = 100 / sizeBase;\n    return sizesPercent.value / ratio;\n  }\n};\n\n//# sourceURL=webpack:///./src/js/components/converter-screen-sizes.js?");

/***/ }),

/***/ "./src/js/components/splitter-html-css.js":
/*!************************************************!*\
  !*** ./src/js/components/splitter-html-css.js ***!
  \************************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n// TODO: Fix CodeMirror that it works also on the two output textarea.\n// TODO: Modify code to work with regex instead of loops.\n// (class=\"[a-zA_Z 0-9-_]*\")|(id=\"[a-zA_Z 0-9-_]*\")|(\\<[a-zA_Z] )|(style=\"[a-zA_Z 0-9-_]*\")\n// (\\<([a-zA-Z]*) )|((style|class|id)=\"([^\"']*)\")\n// TODO: Test it with complex code.\n// TODO: Modify documentations.\nvar init = function init() {\n  $(document).ready(function () {\n    var findTagLength = 10;\n    var $input = $('#input');\n    var $outputHtml = $('#outputHtml');\n    var $outputCss = $('#outputCss');\n    var $button = $('#convert');\n    var regexHtml = new RegExp(/(?= style=\").+?(?=\").(?<=style=\").+?(?<=\")/g); // Get the content from style=\" to the next \" with the space before.\n\n    var regexCss = new RegExp(/(?<=style=\").+?(?=\")/g); // Get only the content between style=\" and the next \".\n\n    var regexCssId = new RegExp(/(?<=id=\").+?(?=\")/g); // Get only the content between style=\" and the next \".\n\n    var regexCssClass = new RegExp(/(?<=class=\").+?(?=\")/g); // Get the content from style=\" to the next \" with the space before.\n\n    var cmStyles = {\n      lineNumbers: true,\n      mode: \"htmlmixed\",\n      theme: \"monokai\",\n      styleActiveLine: true\n    }; //let inputCodeMirror = CodeMirror.fromTextArea($input[0], cmStyles);\n    //let outputHtmlCodeMirror = CodeMirror.fromTextArea($outputHtml[0], cmStyles);\n    //let outputCssCodeMirror = CodeMirror.fromTextArea($outputCss[0], cmStyles);\n\n    $button.on('click', function (event) {\n      var inputValue = $input.val();\n\n      if (inputValue) {\n        var cssItems = inputValue.match(regexCss);\n        var outputHtmlString = inputValue.replace(regexHtml, \"\");\n        var tagName = '';\n        var newCssOutput = []; // Write the HTML without the inline style attributes to the output textarea.\n\n        $outputHtml.val(outputHtmlString); // Check each style attribute which was found in the HTML and do some stuff.\n\n        for (var a = 0; cssItems.length > a; a++) {\n          var cssItem = cssItems[a];\n          var currentItemIndex = inputValue.indexOf(cssItem) - 1; // -1 is needed to get the correct start item.\n\n          var tagStart = 0;\n          var tagEnd = 0;\n          var fullTagString = '';\n          var cssIds = {};\n          var cssClasses = {};\n          var cssId = '';\n          var cssClass = '';\n          var cssSelector = ''; // Find the < sign in front of the style attribute to get the tag.\n\n          for (var _a = currentItemIndex; _a >= 0; _a--) {\n            var newItemIndex = _a; // Returns the char on this index position.\n\n            var charAtIndex = inputValue.charAt(newItemIndex);\n\n            if (charAtIndex === '<') {\n              // Create a string with the length of findTagLength after the < sign.\n              var stringRange = inputValue.substr(newItemIndex + 1, newItemIndex + findTagLength); // Split the string for each whitespace to a array.\n\n              var splittetStringRange = stringRange.split(' '); // The first item after the < sign till to the whitespace includes the tag.\n\n              tagName = splittetStringRange[0];\n              tagStart = newItemIndex + 1; // Exit the for loop.\n\n              break;\n            }\n          } // Find the > sign after the style attribute.\n\n\n          for (var _a2 = currentItemIndex; _a2 <= inputValue.length; _a2++) {\n            var _newItemIndex = _a2;\n\n            var _charAtIndex = inputValue.charAt(_newItemIndex);\n\n            if (_charAtIndex === '>') {\n              tagEnd = _newItemIndex; // Exit the for loop.\n\n              break;\n            }\n          } // Get the content between the tag with a style attribute.\n\n\n          fullTagString = inputValue.substring(tagStart, tagEnd); // Get the string inside of the id attribute.\n\n          cssIds = fullTagString.match(regexCssId); // Convert the object as string and get the string inside of the id attribute.\n\n          cssId = cssIds ? cssIds.toString().split(' ') : null; // Get the string inside of the class attribute.\n\n          cssClasses = fullTagString.match(regexCssClass); // Convert the object as string and get the string inside of the id attribute.\n\n          cssClass = cssClasses ? cssClasses.toString().split(' ') : null; // Generate the css selector. First use class if available, then use id, else use the tag itself.\n\n          cssSelector = cssClass ? '.' + cssClass[0] : cssId ? '#' + cssId[0] : tagName; // Create array with css attributes.\n\n          newCssOutput.push(cssSelector + ' {' + cssItem + ' }');\n        } // Sort the array for a better view.\n\n\n        newCssOutput.sort(); // Split array to a string without comma and with a line break.\n\n        $outputCss.val(newCssOutput.join(\"\\n\"));\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/js/components/splitter-html-css.js?");

/***/ })

/******/ });