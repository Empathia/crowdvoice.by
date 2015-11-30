window.WebFontConfig = {
    google: { families: [ 'Open+Sans:400,300,600,700,800:latin' ] }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

// JS » deps
window.jQuery = window.$ = require('jquery');

// JS » Our stack, namespace, lib
require('neon');
require('neon/stdlib');
window.CV = {UI: {}};
require('./lib/widget-utils');
require('./lib/Widget');