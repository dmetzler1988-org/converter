window.Materialize = require("materialize-css/dist/js/materialize.min");

const ColorConverter = require('./components/converter-colors');
//ColorConverter.init();
window.ColorConverter = ColorConverter;

const ScreenSizesConverter = require('./components/converter-screen-sizes');
//ScreenSizesConverter.init();
window.ScreenSizesConverter = ScreenSizesConverter;

const HtmlCssSplitter = require('./components/splitter-html-css');
//HtmlCssSplitter.init();
window.HtmlCssSplitter = HtmlCssSplitter;

const ReadingTimesTool = require('./components/tool-reading-times');
//HtmlCssSplitter.init();
window.ReadingTimesTool = ReadingTimesTool;

// Core functionalities.
document.addEventListener('DOMContentLoaded', function() {
    let sidenav = document.querySelectorAll('.sidenav');
    let collapsible = document.querySelectorAll('.collapsible');

    window.Materialize.Sidenav.init(sidenav);
    window.Materialize.Collapsible.init(collapsible);
});
