/* jshint multistr: true */
var MediumEditor = require('medium-editor');

Class(CV, 'PostCreatorWriteArticleEditorBody').inherits(Widget)({

    ELEMENT_CLASS : 'write-article-editor-body',

    HTML : '\
        <div>\
            <div class="write-article-body-editable" contenteditable="true">\
                Phasellus molestie magna (H2)\
                Sed Auctor Neque Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci.\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.editor = new MediumEditor(this.el.querySelector('.write-article-body-editable'));
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el = null;
            this.editor.destroy();

            return null;
        }
    }
});
