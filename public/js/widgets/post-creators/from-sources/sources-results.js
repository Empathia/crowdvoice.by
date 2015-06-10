/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesResults').inherits(Widget)({

    ELEMENT_CLASS : 'from-sources-content-left',

    HTML : '\
       <div class="-rel">\
            <div class="from-sources-no-results -color-grey-light -text-center">\
                <p>We found no results for ‘{{TERM}}’.<br/>Please refine your search and try again.</p>\
            </div>\
            <div class="cv-loader -abs">\
                <div class="ball-spin-fade-loader">\
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
        },
    }
});

