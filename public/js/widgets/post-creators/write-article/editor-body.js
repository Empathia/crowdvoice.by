/* jshint multistr: true */
var MediumEditor = require('medium-editor');

Class(CV, 'PostCreatorWriteArticleEditorBody').inherits(Widget)({

    ELEMENT_CLASS : 'write-article-editor-body',

    HTML : '\
        <div>\
            <div class="write-article-body-editable" contenteditable="true">\
                <h1>Phasellus molestie magna (H1)</h1>\
                <h2>Phasellus molestie magna (H2)</h2>\
                <h3>Phasellus molestie magna (H3)</h3>\
                <p>Sed Auctor Neque Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci.</p>\
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
