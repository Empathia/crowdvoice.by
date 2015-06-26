/* jshint multistr: true */
var API = require('../../../lib/api');
var Checkit = require('checkit');

Class(CV, 'PostCreatorFromUrl').inherits(CV.PostCreator)({

    ELEMENT_CLASS : 'cv-post-creator post-creator-from-url',

    HTML : '\
    <div>\
        <div class="input-error-message -on-error -abs -color-danger"></div>\
        <header class="cv-post-creator__header -clearfix"></header>\
        <div class="cv-post-creator__content -abs"></div>\
        <div class="cv-post-creator__disable">\
            <div class="cv-loader -abs">\
                <div class="ball-spin-fade-loader">\
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>\
                </div>\
            </div>\
        </div>\
    </div>\
    ',

    DEFAULT_ERROR_MESSAGE : 'You entered an invalid URL. Please double check it.',

    prototype : {
        el : null,
        header : null,
        content : null,
        postButton : null,
        iconTypes : null,
        inputWrapper : null,
        errorMessage : null,

        _inputKeyPressHandlerRef : null,
        _inputLastValue : null,
        _checkitUrl : null,
        _previewPostWidget : null,

        init : function init(config) {
            CV.PostCreator.prototype.init.call(this, config);

            console.log('new PostCreatorFromUrl');

            this.el = this.element[0];
            this.header = this.el.querySelector('.cv-post-creator__header');
            this.content = this.el.querySelector('.cv-post-creator__content');
            this.inputWrapper = document.createElement('div');
            this.errorMessage = this.el.querySelector('.input-error-message');

            this.addCloseButton()._setup()._bindEvents()._disablePostButton();
        },

        /* Appends the InputClearable widget and creates the checkit instance for it.
         * @method _setup <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _setup : function _setup() {
            this.appendChild(
                new CV.PostCreatorErrorTemplate({
                    name : 'errorTemplate'
                })
            ).render(this.content);

            this.appendChild(
                new CV.PostCreatorFromUrlSourceIcons({
                name : 'sourceIcons',
                className : '-rel -float-left -full-height -color-border-grey-light'
            })
            ).render(this.header);

            this.appendChild(
                new CV.PostCreatorPostButton({
                    name : 'postButton',
                    className : '-rel -float-right -full-height -color-border-grey-light'
                })
            ).render(this.header);

            this.inputWrapper.className = '-overflow-hidden -full-height';

            this.appendChild(
                new CV.InputClearable({
                name : 'input',
                placeholder : 'Paste the URL of an image, video or web page here',
                inputClass : '-block -lg -br0 -bw0 -full-height',
                className : '-full-height'
            })
            ).render(this.inputWrapper);

            this.header.appendChild(this.inputWrapper);

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
            CV.PostCreator.prototype._bindEvents.call(this);

            this._inputKeyPressHandlerRef = this._inputKeyPressHandler.bind(this);
            this.input.getElement().addEventListener('keypress', this._inputKeyPressHandlerRef);

            this.postButton.bind('buttonClick', this._handlePostButtonClick.bind(this));

            return this;
        },

        _handlePostButtonClick : function _handlePostButtonClick() {
            var postEditedData = this._previewPostWidget.getEditedData();

            var saveData = {
                title : postEditedData.title,
                description : postEditedData.description,
                sourceType : postEditedData.sourceType,
                sourceService : postEditedData.sourceService,
                sourceUrl : postEditedData.sourceUrl,
                imagePath : postEditedData.imagePath,
                images : postEditedData.images.map(function(item) {return item.path;}),
                publishedAt : postEditedData.publishedAt
            };
            console.log(saveData);

            var args = { data : saveData };
            API.postSave(args, this._savePostResponse.bind(this));
        },

        _savePostResponse : function _savePostResponse(err, response) {
            // Object {ownerId: "", voiceId: "", id: ""}
            console.log(err);
            console.log(response);
            // @TODO: show message && window.reload();
        },

        /* Handles the keypress event on the input. We are only interested on the ENTER key.
         * @method _inputKeyPressHandler <private> [Function]
         */
        _inputKeyPressHandler : function _inputKeyPressHandler(ev) {
            var inputValue, checkitResponse;

            if (ev.keyCode !== 13) return;

            inputValue = this.input.getValue();

            if (inputValue === this._inputLastValue) return;

            this._inputLastValue = inputValue;
            checkitResponse = this._checkitUrl.runSync({url: inputValue});

            this._disablePostButton();
            this._deactivateIconType();

            if (checkitResponse[0]) {
                return this._setErrorState();
            }

            this.disable()._removeErrorState()._requestPreview(checkitResponse[1].url);
        },

        /* Make a call to the API for getting the preview data for creating a Post.
         * @method _requestPreview <private> [Function]
         */
        _requestPreview : function _requestPreview(url) {
            var args = { url : url };
            API.postPreview(args, this._requestResponseHandler.bind(this));
        },

        /* Handle the preview API call response (error or success).
         * @method _requestResponseHandler <private> [Function]
         */
        _requestResponseHandler : function _requestResponseHandler(err, response) {
            var errorMessage;
            var post = {};

            if (err || response.error) {
                if (err) errorMessage = response.responseJSON.status;
                if (response.error) errorMessage = response.error;

                return this._setErrorState({message: errorMessage}).enable();
            }

            post.name ='_previewPostWidget';
            Object.keys(response).forEach(function(propertyName) {
                post[propertyName] = response[propertyName];
            });

            if (this._previewPostWidget) {
                this._previewPostWidget.unedit().destroy();
            }

            this.appendChild(CV.EditablePost.create(post));
            this._previewPostWidget.render(this.content).edit();

            this._activateIconType(post.sourceType);
            this._enabledPostButton().enable();
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

        /* Sets the error state.
         * @method _setErrorState <private> [Function]
         * @return [PostCreatorFromUrl]
         */
        _setErrorState : function _setErrorState(config) {
            if (config && config.message) {
                this.dom.updateText(this.errorMessage, config.message);
            } else {
                this.dom.updateText(this.errorMessage, this.constructor.DEFAULT_ERROR_MESSAGE);
            }

            if (this.el.classList.contains('has-error')) {
                return this;
            }

            if (this._previewPostWidget) {
                this._previewPostWidget.destroy();
            }

            this.el.classList.add('has-error');
            this.errorTemplate.activate();

            return this;
        },

        /* Remove error messages.
         * @method _removeErrorState <private> [Function]
         * @return [CV.PostCreatorFromUrl]
         */
        _removeErrorState : function _removeErrorState() {
            this.el.classList.remove('has-error');
            this.errorTemplate.deactivate();

            return this;
        },

        /* @method _activateIconType <private> [Function]
        */
        _activateIconType : function _activateIconType(type) {
            this.sourceIcons.activateIcon(type);
            return this;
        },

        /* @method _deactivateIconType <private> [Function]
        */
        _deactivateIconType : function _deactivateIconType() {
            this.sourceIcons.deactivateIcons();
            return this;
        },

        _activate : function _activate() {
            CV.PostCreator.prototype._activate.call(this);

            this.input.getElement().focus();
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);

            this.input.getElement().focus();
        },

        _disable  : function _disable() {
            Widget.prototype._disable.call(this);

            this.input.getElement().blur();
        },

        destroy : function destroy() {
            CV.PostCreator.prototype.destroy.call(this);

            this.el = null;
            this.header = null;
            this.content = null;
            this.iconTypes = null;
            this.postButton = null;
            this.inputWrapper = null;
            this.errorMessage = null;

            this._inputKeyPressHandlerRef = null;
            this._inputLastValue = null;
            this._checkitUrl = null;
            this._previewPostWidget = null;

            return null;
        }
    }
});
