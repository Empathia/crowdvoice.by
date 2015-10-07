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
        voiceTitle: null,
        voiceContent: null,
        voiceSlug: null,
        userSlug: null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            this.el = this.element[0];
            this.header = this.el.querySelector('.cv-post-creator__header');
            this.content = this.el.querySelector('.cv-post-creator__content');


            // Voice and user slugs
            this.voiceSlug = App.Voice.data.slug;
            this.userSlug = App.Voice.data.owner.profileName;

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

            // Content
            this.voiceContent = this.content.querySelector('.write-article-body-editable');
            this.voiceTitle = this.content.querySelector('.editor-title');

            return this;
        },

        /* Binds the events.
         * @method _bindEvents <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _bindEvents : function _bindEvents() {
            CV.PostCreator.prototype._bindEvents.call(this);

            // To catch the dispatch event in Post Button
            this._buttonClickRef = this._buttonClick.bind(this);
            this.postButton.bind('buttonClick', this._buttonClickRef);

            this._contentFilledRef = this._contentFilled.bind(this);
            $(this.voiceTitle).on('change keyup paste',this._contentFilledRef);
            $(this.voiceContent).on('change keyup paste',this._contentFilledRef);

            return this;
        },
        _buttonClick : function _buttonClick(ev){
            var userUrl = this.userSlug;
            var voiceUrl = this.voiceSlug;
            var voiceTitleContent = $(this.voiceTitle).val();
            var voiceContentText = $(this.voiceContent).html();
            
            $.ajax({
                type : 'POST',
                url : '/' + userUrl + '/' + voiceUrl +'/saveArticle',
                headers : {'csrf-token' : this.token},
                cache : false,
                data : {title: voiceTitleContent,
                        content: voiceContentText
                        },
                contentType : 'json',
                success : function success(data) {},
                error : function error(err) {},
            });
        },
        _contentFilled : function _contentFilled(){
            var contentText = this.voiceContent.querySelector('p');
            if(($(this.voiceContent).children().size() > 0 && $(contentText).text().length > 0) && $(this.voiceTitle).val().length){
                this._enabledPostButton();
            } else {
                this._disablePostButton();
            }           
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
