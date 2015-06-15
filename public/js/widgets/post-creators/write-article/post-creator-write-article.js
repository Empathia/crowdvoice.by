/* jshint multistr: true */
Class(CV, 'PostCreatorWriteArticle').inherits(CV.PostCreator)({

    ELEMENT_CLASS : 'cv-post-creator post-creator-write-article',

    HTML : '\
    <div>\
        <header class="cv-post-creator__header -clearfix"></header>\
        <div class="cv-post-creator__content -abs"></div>\
        <div class="cv-post-creator__disable"></div>\
    </div>\
    ',

    prototype : {

        el : null,
        header : null,
        content : null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            this.el = this.element[0];
            this.header = this.el.querySelector('.cv-post-creator__header');
            this.content = this.el.querySelector('.cv-post-creator__content');

            this.addCloseButton()._setup()._bindEvents()._disablePostButton();
        },

        _setup : function _setup() {
            this.appendChild(
                new CV.PostCreatorPostButton({
                    name : 'postButton',
                    className : '-rel -float-right -full-height -color-border-grey-light'
                })
            ).render(this.header);

            this.appendChild(
                new CV.PostCreatorWriteArticlePostDate({
                    name : 'postDate',
                    className : '-overflow-hidden -full-height'
                })
            ).render(this.header);

            this.appendChild(
                new CV.PostCreatorWriteArticleEditor({
                    name : 'editor'
                })
            ).render(this.content);

            return this;
        },

        /* Binds the events.
         * @method _bindEvents <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _bindEvents : function _bindEvents() {
            CV.PostCreator.prototype._bindEvents.call(this);
            return this;
        },

        /* Enables the Post Button.
         * @method _enabledPostButton <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _enabledPostButton : function _enabledPostButton() {
            this.postButton.enable();
            return this;
        },

        /* Disables the Post Button.
         * @method _disablePostButton <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _disablePostButton : function _disablePostButton() {
            this.postButton.disable();
            return this;
        },

        destroy : function destroy() {
            CV.PostCreator.prototype.destroy.call(this);

            this.el = null;
            this.header = null;
            this.content = null;
        }
    }
});
