var Events = require('./../../lib/events');

Class(CV, 'Image').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : '',
    HTML : '\
        <div class="form-field">\
            <label><span></span></label>\
            <div class="cv-image">\
                <div class="placeholder"></div>\
                <div class="button">Replace</div>\
                <input type="file" name="upload" class="-hide"/>\
            </div>\
        </div>\
    ',
    prototype : {
        data : {
            title  : ''
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this.imageWrapper = this.el.querySelector('.cv-image');
            this.backgroundImage = this.el.querySelector('.placeholder');
            this.uploadBgButton = this.el.getElementsByClassName('button')[0];
            this.uploadFile = this.el.querySelector('[name="upload"]');

            this._setup()._bindEvents();
        },

        setImage : function setImage(path) {
            this.backgroundImage.classList.add('-img-contain');
            this.dom.updateBgImage(this.backgroundImage, path);
            return this;
        },

        /* Sets error state feedback.
         * @method error <public>
         */
        error : function error() {
            this.imageWrapper.classList.add('-is-error');
            return this;
        },

        getFile : function getFile() {
            return this.uploadFile.files[0];
        },

        getFormData : function getFormData(as) {
            var data = new FormData();
            data.append(as || 'image',  this.getFile());
            return data;
        },

        /* Resets the uploadedFile and removes the preview background image.
         * @method reset <public>
         */
        reset : function reset() {
            this.uploadFile.value = '';
            this.backgroundImage.classList.remove('-img-contain');
            this.backgroundImage.removeAttribute('style');
            return this;
         },

        /* Clear feedback states.
         * @method clearState <public>
         */
        clearState : function clearState() {
            this.dom.removeClass(this.imageWrapper, ['-is-error']);
            return this;
        },

        _setup : function _setup() {
            if (this.data.title) {
                this.dom.updateText(this.el.querySelector('label'), this.data.title);
            } else {
                this.el.removeChild(this.el.querySelector('label'));
            }
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._triggerFileUploadRef = this._triggerFileUpload.bind(this);
            Events.on(this.uploadBgButton, 'click', this._triggerFileUploadRef);

            this._previewImageRef = this._previewImage.bind(this);
            Events.on(this.uploadFile, 'change', this._previewImageRef);

            return this;
        },

        /* Trigger the hidden file upload for the background image.
         */
        _triggerFileUpload : function _triggerFileUpload(ev) {
            this.uploadFile.click(ev);
        },

        /* Background input file change listener callback.
         * Creates a preview of the image to be uploaded.
         */
        _previewImage : function _previewImage() {
            var f = this.getFile();
            var r = new FileReader();

            this.clearState();

            if (f.type.match('image.*')) {
                r.onload = function(e) {
                    this.setImage(e.target.result);
                    r.onload = null;
                }.bind(this);
                return r.readAsDataURL(f);
            }

            this.error();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(this.uploadBgButton, this._triggerFileUploadRef);
            this._triggerFileUploadRef = null;
            return null;
        }
    }
});
