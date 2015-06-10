/* jshint multistr: true */
var autosize = require('autosize');

Class(CV, 'PostEdit').inherits(Widget)({

    ELEMENT_CLASS : 'post-edit',

    HTML : '\
        <div>\
            <button class="add-cover-button ui-btn -color-bg-white -color-grey -sm">\
                Add Cover\
            </button>\
        </div>\
    ',

    MAX_LENGTH_TITLE : 65,
    MAX_LENGTH_DESCRIPTION : 140,

    prototype : {
        sourceType : null,
        sourceUrl : null,
        sourceService : null,
        title : null,
        description : null,
        images : null,

        _postConfig : null,
        _currentImageIndex : 0,
        _imagesLen : 0,
        titleElement : null,
        descriptionElement : null,
        imageWrapperElement : null,
        addCoverButton : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.addCoverButton = this.el.querySelector('.add-cover-button');
            this.images = this.images.filter(function(image) {
                return image.width >= 300;
            });
            this._imagesLen = this.images.length;

            this._postConfig = {
                name : 'post',
                sourceType : this.sourceType,
                sourceUrl : this.sourceUrl,
                sourceService : this.sourceService,
                title : this.title,
                description : this.description,
                image : '',
                imageWidth : 0,
                imageHeight : 0,
                publishedAt : new Date()
            };

            this.appendChild(
                CV.Post.create(this._postConfig)
            ).render(this.el).loadImage();

            if (this._imagesLen) {
                this._currentImageIndex = 0;
                this._updatePostImage();

                if (this.sourceType === 'link') {
                    this.appendChild(
                        new CV.PostEditImageControls({
                            name : 'imageControls',
                            images : this.images
                        })
                    ).render(this.post.imageWrapperElement);
                }
            }

            this._makeItEditable()._bindEvents();
        },

        /* Subscribe the event listener
         * @method _bindEvents <private> [Function]
         */
        _bindEvents : function _bindEvents() {
            this._renderHandlerRef = this._renderHandler.bind(this);
            this.bind('render', this._renderHandlerRef);

            this._showImageRef = this._showImage.bind(this);
            this.addCoverButton.addEventListener('click', this._showImageRef);

            this.titleElement.addEventListener('keypress', this._titleKeyPressHandler);
            this.titleElement.addEventListener('paste', this._pasteHandler);
            this.descriptionElement.addEventListener('paste', this._pasteHandler);

            if (this.imageControls) {
                this._prevImageRef = this._prevImage.bind(this);
                this.imageControls.bind('prevImage', this._prevImageRef);

                this._nextImageRef = this._nextImage.bind(this);
                this.imageControls.bind('nextImage', this._nextImageRef);

                this._removeImageRef = this._removeImage.bind(this);
                this.imageControls.bind('removeImages', this._removeImageRef);
            }

            return this;
        },

        /* Render event listener handler
         * Instantiate the editable textareas, they need to be on the DOMTree in order to work
         * @method _renderHandler <private> [Function]
         */
        _renderHandler : function _renderHandler() {
            autosize(this.titleElement);
            autosize(this.descriptionElement);
        },

        /* Prevent the user hiting ENTER
         * @method _titleKeyPressHandler <private> [Function]
         */
        _titleKeyPressHandler : function _titleKeyPressHandler(ev) {
            var charCode = (typeof ev.which == 'number') ? ev.which : ev.keyCode;

            if (charCode === 13) { // ENTER
                ev.preventDefault();
            }
        },

        _pasteHandler : function _pasteHandler(ev) {
            ev.preventDefault();
        },

        /* Changes the title and description HTMLElements into TextAreas.
         * If it has postData.images then it shows the replace and remove buttons
         * If it has more than 1 postData.images then it shows the next/prev buttons for switching images.
         * @method _makeItEditable <private> [Function]
         */
        _makeItEditable : function _makeItEditable() {
            this.post.el.classList.add('edit-mode');

            this.titleElement = this.post.titleElement;
            this.descriptionElement = this.post.descriptionElement;
            this.imageWrapperElement = this.post.imageWrapperElement;

            this.titleElement.classList.add('-font-bold');

            // replace current tags for a textarea
            this.titleElement.outerHTML = this.titleElement.outerHTML.replace(/<h2/, '<textarea').replace(/<\/h2>/, '</textarea>');
            this.descriptionElement.outerHTML = this.descriptionElement.outerHTML.replace(/<p/, '<textarea').replace(/<\/p>/, '</textarea>');

            // update pointers to new textareas
            this.titleElement = this.post.el.querySelector('.post-card-title');
            this.descriptionElement = this.post.el.querySelector('.post-card-description');

            // clean spaces and line breaks
            this.titleElement.textContent = this.titleElement.textContent.replace(/\r?\n/ig, '').replace(/\t/gm, '').replace(/\s/gm,' ');
            this.descriptionElement.textContent = this.descriptionElement.textContent.replace(/\r?\n/ig, '').replace(/\t/gm, '').replace(/\s/gm,' ');

            // set the max length
            this.titleElement.setAttribute('maxlength', this.constructor.MAX_LENGTH_TITLE);
            this.descriptionElement.setAttribute('maxlength', this.constructor.MAX_LENGTH_DESCRIPTION);

            // add letters counter based on maxlengths
            this.appendChild(
                new CV.InputCounter({
                    name : 'titleCounter',
                    inputReference : this.titleElement,
                    maxLength : this.constructor.MAX_LENGTH_TITLE,
                    className : '-block'
                })
            ).render(this.el, this.descriptionElement);

            this.appendChild(
                new CV.InputCounter({
                    name : 'descriptionCounter',
                    inputReference : this.descriptionElement,
                    maxLength : this.constructor.MAX_LENGTH_DESCRIPTION,
                    className : '-block'
                })
            ).render(this.el.querySelector('.post-card-info'));

            return this;
        },

        /* Updates the _currentImageIndex and run _updatePostImage.
         * @method _nextImage <private> [Function]
         */
        _nextImage : function _nextImage() {
            if (this._currentImageIndex < (this._imagesLen - 1)) {
                this._currentImageIndex++;
            } else {
                this._currentImageIndex = 0;
            }

            this._updatePostImage();
        },

        /* Updates the _currentImageIndex and run _updatePostImage.
         * @method _prevImage <private> [Function]
         */
        _prevImage : function _prevImage() {
            if (this._currentImageIndex > 0) {
                this._currentImageIndex--;
            } else {
                this._currentImageIndex = (this._imagesLen - 1);
            }

            this._updatePostImage();
        },

        /* Updates the post image, the post imageContainer height;
         * @method _updatePostImage <private> [Function]
         */
        _updatePostImage : function _updatePostImage() {
            this.post.setImageHeight(this.images[this._currentImageIndex].height);
            this.post.setCoverImage(this.images[this._currentImageIndex].path);
        },

        /* Hides the post.imageContainer, updates _image to '' and shows addCoverButton
         * @method _removeImage <private> [Function]
         */
        _removeImage : function _removeImage() {
            this.post.hideImageWrapper();
            this.addCoverButton.style.display = 'block';
        },

        /* Shows the post.imageContainer, updates _currentImageIndex to '' and hides addCoverButton
         * @method _showImage <private> [Function]
         */
        _showImage : function _showImage() {
            this.post.showImageWrapper();
            this.addCoverButton.style.display = 'none';
        },

        destroy : function destroy() {
            this.unbind('render', this._renderHandlerRef);
            this._renderHandlerRef = null;

            autosize.destroy(this.titleElement);
            autosize.destroy(this.descriptionElement);

            Widget.prototype.destroy.call(this);

            this.addCoverButton.removeEventListener('click', this._showImageRef);
            this._showImageRef = null;

            this.titleElement.removeEventListener('keypress', this._titleKeyPressHandler);
            this.titleElement.removeEventListener('paste', this._pasteHandler);
            this.descriptionElement.removeEventListener('paste', this._pasteHandler);

            if (this.imageControls) {
                this.imageControls.unbind('prevImage', this._prevImageRef);
                this._prevImageRef = null;

                this.imageControls.unbind('nextImage', this._nextImageRef);
                this._nextImageRef = null;

                this.imageContainer.unbind('removeImages', this._removeImageRef);
                this._removeImageRef = null;
            }

            return null;
        }
    }
});
