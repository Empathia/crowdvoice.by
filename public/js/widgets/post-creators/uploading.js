/* jshint multistr: true */
Class(CV, 'PostCreatorUploadingTemplate').inherits(Widget)({
    HTML : '\
        <div class="cv-post-creator__uploading-template -rel -br1">\
            <div class="cv-loader -abs">\
                <div class="ball-spin-fade-loader">\
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
