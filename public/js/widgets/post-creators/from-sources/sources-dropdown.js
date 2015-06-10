/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesDropdown').inherits(Widget)({

    ELEMENT_CLASS : 'from-sources-dropdown',

    HTML : '\
        <div>\
            <svg class="-s18">\
                <use xlink:href="#svg-twitter-bird"></use>\
            </svg>\
            <svg class="arrow -s8 -color-grey">\
                <use xlink:href="#svg-arrow-down-1"></use>\
            </svg>\
        </div>\
    ',

    prototype : {
        init : function init(config)  {
            Widget.prototype.init.call(this, config);
        }
    }
});
