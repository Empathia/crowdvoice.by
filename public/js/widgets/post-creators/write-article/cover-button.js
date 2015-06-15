/* jshint multistr: true */
Class(CV, 'PostCreatorWriteArticleEditorCoverButton').inherits(Widget)({

    HTML : '<button class="editor-add-cover cv-button tiny primary -abs">Add Cover</button>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
