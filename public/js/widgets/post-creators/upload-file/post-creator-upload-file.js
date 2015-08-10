/* globals App */
var API = require('../../../lib/api');

Class(CV, 'PostCreatorUploadFile').inherits(CV.PostCreator)({
    ELEMENT_CLASS : 'cv-post-creator post-creator-upload-file',
    HTML : '\
        <div>\
            <div class="input-error-message -on-error -abs -color-negative"></div>\
            <header class="cv-post-creator__header -clearfix">\
                <input type="file" name="image" class="image-input cv-button tiny -hide"/>\
            </header>\
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

            console.log('new PostCreatorUploadFile');

            this.el = this.element[0];
            this.inputFile = this.el.querySelector('input[type="file"]');
            this.header = this.el.querySelector('.cv-post-creator__header');
            this.content = this.el.querySelector('.cv-post-creator__content');
            this.errorMessage = this.el.querySelector('.input-error-message');

            this.addCloseButton()._setup()._bindEvents()._disablePostButton();
        },

        activate : function activate(ev) {
            Widget.prototype.activate.call(this);
            this.inputFile.click(ev);
        },

        _setup : function _setup() {
            this.appendChild(new CV.PostCreatorUploadingTemplate({
                name : 'uploadingTemplate'
            })).render(this.content);

            this.appendChild(new CV.PostCreatorErrorTemplate({
                name : 'errorTemplate'
            })).render(this.content);

            this.appendChild(new CV.PostCreatorSuccessTemplate({
                name : 'successTemplate'
            })).render(this.content);

            this.appendChild(new CV.PostCreatorPostButton({
                name : 'postButton',
                className : '-float-right -full-height -color-border-grey-light'
            })).render(this.header);

            this.appendChild(new CV.PostCreatorUploadFileHeaderMessages({
                name : 'headerStatus',
                className : '-overflow-hidden -full-height'
            })).render(this.header);

            return this;
        },

        _bindEvents : function _bindEvents() {
            CV.PostCreator.prototype._bindEvents.call(this);
            this.inputFile.addEventListener('change', this._uploadFile.bind(this));
            this.postButton.bind('buttonClick', this._handlePostButtonClick.bind(this));
            return this;
        },

        _handlePostButtonClick : function _handlePostButtonClick() {
            var postEditedData = this._previewPostWidget.getEditedData();
            console.log(postEditedData);

            API.postCreate({posts : [postEditedData]}, this._savePostResponse.bind(this));
        },

        _savePostResponse : function _savePostResponse(err, response) {
            var errorMessage = '';

            if (err) {
                errorMessage = 'Error - ' + response.status;
                return this._setErrorState({message: errorMessage}).enable();
            }

            this._setSuccessState();
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

        _setSuccessState : function _setSuccessState() {
            this.el.classList.add('is-success');
            this.successTemplate.activate();

            window.setTimeout(function() {
                window.location.reload();
            }, 2000);

            return this;
        },

        _uploadFile : function _uploadFile() {
            this._statusUploading();

            var data = new FormData();
            data.append('image',  this.inputFile.files[0]);

            API.uploadPostImage({
                profileName : App.Voice.data.owner.profileName,
                voiceSlug : App.Voice.data.slug,
                data : data
            }, function(err, res) {
                console.log(err);
                console.log(res);

                if (err) {
                    return this._statusError();
                }

                this._statusImageUploaded(res);
            }.bind(this));
        },

        /* Sets the widget state as uploading.
         * @method _statusUploading <private> [Function]
         */
        _statusUploading : function _statusUploading() {
            this.headerStatus.uploading();
            this.errorTemplate.deactivate();
            this.uploadingTemplate.activate();
            return this;
        },

        /* Sets the widget state as error.
         * @method _statusError <private> [Function]
         */
        _statusError : function _statusError() {
            this.headerStatus.error();
            this.errorTemplate.activate();
            this.uploadingTemplate.deactivate();
            return this;
        },

        /* Sets the widget state as image uploaded.
         * @method _statusImageUploaded <private> [Function]
         */
        _statusImageUploaded : function statusImageUploaded(postData) {
            this.headerStatus.uploadedImage();
            this.errorTemplate.deactivate();
            this.uploadingTemplate.deactivate();

            if (this._previewPostWidget) {
                this._previewPostWidget.unedit().destroy();
            }

            postData.name = '_previewPostWidget';
            this.appendChild(CV.EditablePost.create(postData)).edit().render(this.content);

            this._enabledPostButton();
            return this;
        },

        _enabledPostButton : function _enabledPostButton() {
            this.postButton.enable();
            return this;
        },

        _disablePostButton : function _disablePostButton() {
            this.postButton.disable();
            return this;
        },

        destroy : function destroy() {
            CV.PostCreator.prototype.destroy.call(this);

            this.el = null;
            this.header = null;
            this.content = null;

            return null;
        }
    }
});
