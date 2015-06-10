/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesQueue').inherits(Widget)({

    ELEMENT_CLASS : 'from-sources-content-right',

    HTML : '\
        <div class="-rel">\
            <div class="from-sources-queue-onboarding -color-grey-light -text-center">\
                <p>Add here the posts you want to include in this voice.<br/>You’ll be able to edit their title and description.</p>\
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

