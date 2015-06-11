/* jshint multistr: true */
Class(CV, 'PostCreatorUploadFileHeaderMessages').inherits(Widget)({
    HTML : '\
        <div>\
            <div class="upload-file-msg-uploading -color-grey-light -font-bold">\
                Hold on. We’re uploading your file. It might take a few mins.\
            </div>\
            <div class="upload-file-msg-error -font-bold">\
                <svg class="-s20 -color-danger">\
                    <use xlink:href="#svg-warning"></use>\
                </svg>\
                There was a problem uploading your file. Check that the file is not corrupt.\
                <button class="ui-btn -outline -sm">Try Again</button>\
            </div>\
            <div class="upload-file-msg-uploaded-image -font-bold">\
                <svg class="-s20 -color-grey-light">\
                    <use xlink:href="#svg-image"></use>\
                </svg>\
                You uploaded an image.\
                <button class="ui-btn -outline -sm">Upload something else</button>\
            </div>\
        </div>\
    ',

    prototype : {

        el : null,
        uploadingMessage : null,
        errorMessage : null,
        uploadImageMessage : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.uploadingMessage = this.el.querySelector('.upload-file-msg-uploading');
            this.errorMessage = this.el.querySelector('.upload-file-msg-error');
            this.uploadImageMessage = this.el.querySelector('.upload-file-msg-uploaded-image');
        },

        _deactivateAll : function _deactivateAll() {
            this.uploadingMessage.classList.remove('active');
            this.errorMessage.classList.remove('active');
            this.uploadImageMessage.classList.remove('active');

            return this;
        },

        uploading : function uploading() {
            this._deactivateAll();
            this.uploadingMessage.classList.add('active');
            return this;
        },

        error : function error() {
            this._deactivateAll();
            this.errorMessage.classList.add('active');
            return this;
        },

        uploadedImage : function uploadedImage() {
            this._deactivateAll();
            this.uploadImageMessage.classList.add('active');
            return this;
        }
    }
});
