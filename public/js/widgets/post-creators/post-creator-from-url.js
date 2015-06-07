/* jshint multistr: true */
var Checkit = require('checkit');

Class(CV, 'PostCreatorFromUrl').inherits(CV.PostCreator)({

    ELEMENT_CLASS : 'cv-post-creator post-creator-from-url',

    HTML : '\
    <div>\
        <div class="input-error-message -on-error -abs -color-danger">You entered an invalid URL. Please double check it.</div>\
        <header class="cv-post-creator__header -clearfix">\
            <div class="header-left -rel -float-left">\
                <svg class="input-error-icon -on-error -abs -color-danger">\
                    <use xlink:href="#svg-circle-x"></use>\
                </svg>\
                <div class="from-url-type image ui-has-tooltip">\
                    <svg class="type-svg"><use xlink:href="#svg-image"></use></svg>\
                    <span class="ui-tooltip -bottom">Enter the URL of an image you want to display</span>\
                </div>\
                <div class="from-url-type video ui-has-tooltip">\
                    <svg class="type-svg"><use xlink:href="#svg-video"></use></svg>\
                    <span class="ui-tooltip -bottom">Enter the URL of a Youtube or Vimeo video you want to display</span>\
                </div>\
                <div class="from-url-type link ui-has-tooltip">\
                    <svg class="type-svg"><use xlink:href="#svg-article"></use></svg>\
                    <span class="ui-tooltip -bottom">Enter the URL of a web page you want to display</span>\
                </div>\
            </div>\
            <div class="header-right -rel -float-right">\
                <button class="post-btn ui-btn -primary -pl2 -pr2">Post</button>\
            </div>\
            <div class="header-flex -rel">\
            </div>\
        </header>\
        <div class="cv-post-creator__content -abs"></div>\
        <div class="cv-post-creator__disable"></div>\
    </div>\
    ',

    HTML_ERROR : '\
        <div class="cv-post-creator-from-url-error-content -rel -br1">\
            <svg class="error-icon -abs -color-grey-light">\
                <use xlink:href="#svg-circle-x"></use>\
            </svg>\
        </div>\
    ',

    prototype : {
        el : null,
        inputWrapper : null,
        contentElement : null,
        postButton : null,
        iconTypes : null,

        _inputKeyPressHandlerRef : null,
        _inputLastValue : null,
        _checkitUrl : null,
        _previewPostWidget : null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            console.log('new PostCreatorFromUrl');

            this.el = this.element[0];
            this.inputWrapper = this.el.querySelector('.header-flex');
            this.contentElement = this.el.querySelector('.cv-post-creator__content');
            this.postButton = this.el.querySelector('.post-btn');
            this.iconTypes = [].slice.call(this.el.getElementsByClassName('from-url-type'), 0);

            this.addCloseButton()._disablePostButton()._setup()._bindEvents();
        },

        /* Appends the InputClearable widget and creates the checkit instance for it.
         * @method _setup <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _setup : function _setup() {
            this.appendChild(
                new CV.InputClearable({
                    name : 'input',
                    placeholder : 'Paste the URL of an image, video or web page here',
                    inputClass : '-block -lg -br0 -b0 -full-height',
                    className : '-full-height'
                })
            ).render(this.inputWrapper);

            this._checkitUrl = new Checkit({
                url : ['required', 'url']
            });

            return this;
        },

        /* Binds the events for the InputClearable (keydown enter)
         * @method _bindEvents <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _bindEvents : function _bindEvents() {
            if (typeof this.input === 'undefined') {
                console.warn('PostCreatorFromUrl::Missing Input Widget');
                return;
            }

            this._inputKeyPressHandlerRef = this._inputKeyPressHandler.bind(this);
            this.input.getElement().addEventListener('keypress', this._inputKeyPressHandlerRef);

            return this;
        },

        /* Handles the keypress event on the input. We are only interested on the ENTER key.
         * @method _inputKeyPressHandler <private> [Function]
         */
        _inputKeyPressHandler : function _inputKeyPressHandler(ev) {
            var inputValue, checkitResponse;

            if (ev.keyCode !== 13) {
                return;
            }

            inputValue = this.input.getValue();

            if (inputValue === this._inputLastValue) {
                return;
            }

            this._inputLastValue = inputValue;
            checkitResponse = this._checkitUrl.runSync({url: inputValue});

            this._disablePostButton();
            this._deactivateIconType();

            if (checkitResponse[0]) {
                return this._setErrorState();
            }

            this.disable()._removeErrorState()._scrapTest(checkitResponse[1].url);
        },

        _scrapTest : function _scrapTest(url) {
            // @TODO : use preview route
            // handle the error and success

            if (this._previewPostWidget) {
                this._previewPostWidget.destroy();
            }

            var posts = require('./../../../demo-data/posts.js');
            var post = posts[Math.floor(Math.random() * posts.length)];
            var postType = post.sourceType;
            post.name = '_previewPostWidget';
            this.appendChild(CV.Post.create(post)).render(this.contentElement).loadImage();

            this._activateIconType(postType);
            this._enabledPostButton().enable();
        },

        /* Enables the Post Button.
         * @method _enabledPostButton <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _enabledPostButton : function _enabledPostButton() {
            this.postButton.classList.remove('-muted');
            this.postButton.removeAttribute('disabled');

            return this;
        },

        /* Disables the Post Button.
         * @method _disablePostButton <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _disablePostButton : function _disablePostButton() {
            this.postButton.classList.add('-muted');
            this.postButton.setAttribute('disabled', true);

            return this;
        },

        /* Sets the error state.
         * @method _setErrorState <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _setErrorState : function _setErrorState() {
            if (this.el.classList.contains('has-error')) {
                return this;
            }

            if (this._previewPostWidget) {
                this._previewPostWidget.destroy();
            }

            this.el.classList.add('has-error');
            this.contentElement.insertAdjacentHTML('afterbegin', this.constructor.HTML_ERROR);

            return this;
        },

        /* Remove error messages.
         * @method _removeErrorState <private> [Function]
         * @return [CV.PostCreatorFromUrl]
         */
        _removeErrorState : function _removeErrorState() {
            var errorContent = this.contentElement.querySelector('.cv-post-creator-from-url-error-content');

            if (errorContent) {
                this.contentElement.removeChild(errorContent);
            }

            this.el.classList.remove('has-error');

            return this;
        },

        /* @method _activateIconType <private> [Function]
         */
        _activateIconType : function _activateIconType(type) {
            this.iconTypes.some(function(icon) {
                if (icon.classList.contains(type)) {
                    icon.classList.add('active');
                    return true;
                }
            });

            return this;
        },

        /* @method _deactivateIconType <private> [Function]
         */
        _deactivateIconType : function _deactivateIconType() {
            this.iconTypes.forEach(function(icon) {
                icon.classList.remove('active');
            });

            return this;
        },

       _activate : function _activate() {
            CV.PostCreator.prototype._activate.call(this);

            this.input.getElement().focus();
        },

        destroy : function destroy() {
            CV.PostCreator.prototype.destroy.call(this);

            this.el = null;
            this.inputWrapper = null;
            this.contentElement = null;
            this.postButton = null;

            return null;
        }
    }
});
