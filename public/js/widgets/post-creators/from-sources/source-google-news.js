Class(CV, 'PostCreatorFromSourcesGoogleNews').inherits(Widget)({
    ELEMENT_CLASS : 'post-creator-from-sources__google-news',

    prototype : {
        title : '',
        description : '',
        date : '',
        sourceUrl : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
