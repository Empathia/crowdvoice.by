/* jshint multistr: true */
var MediumEditor = require('medium-editor');

Class(CV, 'PostCreatorWriteArticleEditorBody').inherits(Widget)({

    ELEMENT_CLASS : 'write-article-editor-body',

    HTML : '\
        <div>\
            <div class="write-article-body-editable" contenteditable="true">\
            </div>\
        </div>',

    prototype : {

        el : null,
        body : null,
        editor : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.body= this.el.querySelector('.write-article-body-editable');

            this._setup();
        },

        _setup : function _setup() {
            this.editor = new MediumEditor(this.body, {
                anchor : {
                    linkValidation : true
                }
            });

            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.editor.destroy();

            this.el = null;
            this.body = null;
            this.editor = null;

            return null;
        }
    }
});
