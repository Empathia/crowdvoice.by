var API = require('../../../lib/api');

Class(CV, 'PostCreatorUploadFile').inherits(CV.PostCreator)({
    ELEMENT_CLASS : 'cv-post-creator post-creator-upload-file',
    HTML : '\
        <div>\
            <header class="cv-post-creator__header -clearfix">\
                <input type="file" name="image" class="image-input cv-button tiny"/>\
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

            this.addCloseButton()._setup()._bindEvents()._disablePostButton();
        },

        _setup : function _setup() {
            this.appendChild(
                new CV.PostCreatorUploadingTemplate({
                    name : 'uploadingTemplate'
                })
            ).render(this.content);

            this.appendChild(
                new CV.PostCreatorErrorTemplate({
                    name : 'errorTemplate'
                })
            ).render(this.content);

            this.appendChild(
                new CV.PostCreatorPostButton({
                    name : 'postButton',
                    className : '-float-right -full-height -color-border-grey-light'
                })
            ).render(this.header);

            this.appendChild(
                new CV.PostCreatorUploadFileHeaderMessages({
                    name : 'headerStatus',
                    className : '-overflow-hidden -full-height'
                })
            ).render(this.header);

            return this;
        },

        _bindEvents : function _bindEvents() {
            CV.PostCreator.prototype._bindEvents.call(this);
            this.inputFile.addEventListener('change', this._uploadFile.bind(this));
            return this;
        },

        _uploadFile : function _uploadFile(ev) {
            var data = new FormData();
            data.append('image',  this.inputFile.files[0]);

            API.uploadPostImage(data, function(err, res) {
                console.log(err);
                console.log(res);
            });
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
        _statusImageUploaded : function statusImageUploaded() {
            this.headerStatus.uploadedImage();
            this.errorTemplate.deactivate();
            this.uploadingTemplate.deactivate();

            if (this._previewPostWidget) {
                this._previewPostWidget.unedit().destroy();
            }

            var posts = require('./../../../../demo-data/posts-preview.js');
            var post = posts[Math.floor(Math.random() * posts.length)];
            post.name = '_previewPostWidget';

            this.appendChild(CV.EditablePost.create(post)).edit().render(this.content);

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
