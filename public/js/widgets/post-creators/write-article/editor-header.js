/* jshint multistr: true */
Class(CV, 'PostCreatorWriteArticleEditorHeader').inherits(Widget)({

    ELEMENT_CLASS : 'write-article-editor-header',

    HTML : '\
        <div class="-rel">\
            <button class="editor-add-cover cv-button tiny primary -abs">Add Cover</button>\
            <textarea class="editor-title -block -font-bold" placeholder="Title">Suspendisse Dictum Feugiat Nisl Ut (H1)</textarea>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});
