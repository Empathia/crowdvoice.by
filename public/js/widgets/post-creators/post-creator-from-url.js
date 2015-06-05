/* jshint multistr: true */
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
                <div class="from-url-type ui-has-tooltip">\
                    <svg><use xlink:href="#svg-image"></use></svg>\
                    <span class="ui-tooltip -bottom">Enter the URL of an image you want to display</span>\
                </div>\
                <div class="from-url-type ui-has-tooltip">\
                    <svg><use xlink:href="#svg-star"></use></svg>\
                    <span class="ui-tooltip -bottom">Enter the URL of a Youtube or Vimeo video you want to display</span>\
                </div>\
                <div class="from-url-type ui-has-tooltip">\
                    <svg><use xlink:href="#svg-twitter-bird"></use></svg>\
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
    </div>\
    ',

    HTML_ERROR : '\
        <div class="cv-post-creator-from-url-error-content -rel -br1">\
            <svg class="error-icon -abs -color-grey">\
                <use xlink:href="#svg-circle-x"></use>\
            </svg>\
        </div>\
    ',

    prototype : {
        el : null,
        inputWrapper : null,
        contentElement : null,
        postButton : null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            console.log('new PostCreatorFromUrl');

            this.el = this.element[0];
            this.inputWrapper = this.el.querySelector('.header-flex');
            this.contentElement = this.el.querySelector('.cv-post-creator__content');
            this.postButton = this.el.querySelector('.post-btn');

            this.addCloseButton().disablePostButton()._setup();
        },

        _setup : function _setup() {
            this.appendChild(
                new CV.InputClearable({
                    name : 'input',
                    placeholder : 'Paste the URL of an image, video or web page here',
                    inputClass : '-block -lg -br0 -b0 -full-height',
                    className : '-full-height'
                })
            ).render(this.inputWrapper);

            return this;
        },

        enabledPostButton : function enabledPostButton() {
            this.postButton.classList.remove('-muted');
            this.postButton.removeAttribute('disabled');

            return this;
        },

        disablePostButton : function disablePostButton() {
            this.postButton.classList.add('-muted');
            this.postButton.setAttribute('disabled', true);

            return this;
        },

        /* Sets the error state.
         * @method setErrorState <public> [Function]
         * @return [CV.PostCreatorFromUrl]
         */
        setErrorState : function setErrorState() {
            this.el.classList.add('has-error');
            this.contentElement.insertAdjacentHTML('afterbegin', this.constructor.HTML_ERROR);

            return this;
        },

        /* Remove error messages.
         * @method removeErrorState <public> [Function]
         * @return [CV.PostCreatorFromUrl]
         */
        removeErrorState : function removeErrorState() {
            var errorContent = this.contentElement.querySelector('.cv-post-creator-from-url-error-content');

            if (errorContent) {
                this.contentElement.removeChild(errorContent);
            }

            this.el.classList.remove('has-error');

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
