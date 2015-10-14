/* globals App */
var rome = require('rome');
var moment = require('moment');
var autosize = require('autosize');
var API = require('./../../../lib/api');

Class(CV, 'EditablePost').includes(CV.WidgetUtils, CustomEventSupport, NodeSupport, BubblingSupport)({
    MAX_LENGTH_TITLE : 65,
    MAX_LENGTH_DESCRIPTION : 180,
    MAX_IMAGE_WIDTH : 300,

    HTML_DATE_PICKER : '\
        <div class="post-edit-date-picker -inline-block">\
            <button class="post-date-picker-button cv-button primary micro -m0 -float-right">\
                <svg class="post-edit-date-picker-calendar -color-white">\
                    <use xlink:href="#svg-calendar"></use>\
                <svg>\
            </button>\
            <div class="-overflow-hidden">\
                <input class="cv-input micro"/>\
            </div>\
        </div>',

    HTML_ADD_COVER_BUTTON : '\
        <button class="post-edit-add-cover-button ui-btn -color-bg-white -color-grey -sm">\
            Add Cover\
        </button>',

    /* Creates a specific Post by type using the Strategy Pattern.
     * The Post type should be one of the knows post types available.
     * @method create <public, static> [Function]
     * @arguments config <required> [Object] The Post Model Data.
     * @return new CV.Post[type]
     */
    create : function create(config) {
        var type = this.prototype.format.capitalizeFirstLetter(config.sourceType);
        return new window.CV['EditablePost' + type](config);
    },

    prototype : {
        sourceType: '',
        sourceUrl: '',
        sourceService: '',
        title: '',
        description: '',
        image: '',
        imageWidth: 0,
        imageHeight: 0,
        publishedAt: '',

        /* preview post creation props */
        images : null,
        imagePath : '',

        /* private props */
        _currentImageIndex : 0,
        _imagesLen : 0,

        /* Checks if we receive an Array of images on the initial config object,
         * if so it means that we may have to show the controls to allow the user selecting a cover image
         * @method setup <protected> [Function]
         * @return EditablePost
         */
        setup : function setup() {
            var parent = this.el.parentNode;
            var wrapper = document.createElement('div');
            var position = 0;
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i] === this.el) {
                    position = i;
                    break;
                }
            }
            wrapper.className = 'post-editable -rel';
            Object.keys(this.el.dataset).forEach(function(attr) {
                wrapper.dataset[attr] = this.el.dataset[attr];
            }, this);
            wrapper.appendChild(this.el);
            parent.insertBefore(wrapper, parent.childNodes[position]);
            this.el = wrapper;

            if (this.images) {
                this._imagesLen = this.images.length;
            } else {
                this.images = [];
            }

            if (this._imagesLen) {
                this._currentImageIndex = 0;
                this._updatePostImage()._addImageControls();
            }

            return this;
        },

        /* Returns the new modified data of Post.
         * @method getEditedData <pubic> [Function]
         * @returns PostModel data + imagesArray extra props [Object]
         */
        getEditedData : function getEditedData() {
            return {
                title : this.format.truncate(this.titleElement.value, this.constructor.MAX_LENGTH_TITLE),
                description : this.format.truncate(this.descriptionElement.value, this.constructor.MAX_LENGTH_DESCRIPTION),
                publishedAt : this.romeTime.getDate(),

                image : this.image,
                imageWidth : this.imageWidth,
                imageHeight : this.imageHeight,

                sourceType : this.sourceType,
                sourceService : this.sourceService,
                sourceUrl : this.sourceUrl,

                // extra props
                images : this.images.map(function(item) {return item.path;}),
                imagePath : (this.postImages && this.postImages.medium.url) || this.imagePath,
            };
        },

        /* Changes the title and description HTMLElements into TextAreas.
         * If it has postData.images then it shows the replace and remove buttons
         * If it has more than 1 postData.images then it shows the next/prev buttons for switching images.
         * @method _makeItEditable <private> [Function]
         * @return EditablePost
         */
        edit : function edit(config) {
            this.el.classList.add('edit-mode');
            this.titleElement.classList.add('-font-bold');

            // replace current tags for a textarea
            this.titleElement.outerHTML = this.titleElement.outerHTML.replace(/<h2/, '<textarea').replace(/<\/h2>/, '</textarea>');
            this.descriptionElement.outerHTML = this.descriptionElement.outerHTML.replace(/<p/, '<textarea').replace(/<\/p>/, '</textarea>');

            // update pointers to new textareas
            this.titleElement = this.el.querySelector('.post-card-title');
            this.descriptionElement = this.el.querySelector('.post-card-description');

            // clean spaces and line breaks
            this.titleElement.textContent = this.titleElement.textContent.replace(/\r?\n/ig, '').replace(/\t/gm, '').replace(/\s/gm,' ');
            this.descriptionElement.textContent = this.descriptionElement.textContent.replace(/\r?\n/ig, '').replace(/\t/gm, '').replace(/\s/gm,' ');

            // set the max length
            this.titleElement.setAttribute('maxlength', this.constructor.MAX_LENGTH_TITLE);
            this.descriptionElement.setAttribute('maxlength', this.constructor.MAX_LENGTH_DESCRIPTION);

            // add letters counter based on maxlengths
            this.appendChild(new CV.InputCounter({
                name : 'titleCounter',
                inputReference : this.titleElement,
                maxLength : this.constructor.MAX_LENGTH_TITLE,
                className : '-block'
            })).render(this.el, this.descriptionElement);

            this.appendChild(new CV.InputCounter({
                name : 'descriptionCounter',
                inputReference : this.descriptionElement,
                maxLength : this.constructor.MAX_LENGTH_DESCRIPTION,
                className : '-block'
            })).render(this.el.querySelector('.post-card-info'));

            // add the date picker
            this.dateTimeElement.style.display = 'none';
            this.dateTimeElement.parentNode.insertAdjacentHTML('beforeend', this.constructor.HTML_DATE_PICKER);
            this.timePickerInput = this.dateTimeElement.parentNode.querySelector('.cv-input');
            this.timePickerButton = this.dateTimeElement.parentNode.querySelector('.post-date-picker-button');

            this.romeTime = rome(this.timePickerInput, {
                appendTo : (config && config.appendCalendarTo !== "undefined") ? config.appendCalendarTo : this.parent.el,
                inputFormat : 'DD MMM, YYYY HH:mm',
                initialValue : moment(this.updatedAt)
            });

            this._bindEditEvents();

            return this;
        },

        /* Remove event listeners added when the edit method was run.
         * @method unedit <public> [Function]
         * @return EditablePost
         */
        unedit : function unedit() {
            this.titleElement.removeEventListener('autosize:resized', this._postDimensionsChangedRef);
            this.descriptionElement.removeEventListener('autosize:resized', this._postDimensionsChangedRef);
            this._postDimensionsChangedRef = null;

            autosize.destroy(this.titleElement);
            autosize.destroy(this.descriptionElement);

            this.timePickerButton.removeEventListener('click', this._showDatePickerRef);
            this._showDatePickerRef = null;

            this.titleElement.removeEventListener('keypress', this._titleKeyPressHandler);
            this.titleElement.removeEventListener('paste', this._pasteHandler);
            this.descriptionElement.removeEventListener('paste', this._pasteHandler);

            this.romeTime.destroy();

            return this;
         },

        /* Adds the `post-unmoderated` class name selector to Post main element.
         * This class applies visual changes only.
         * @method unmoderatedStyle <public> [Function]
         * @return EditablePost
         */
        unmoderatedStyle : function unmoderatedStyle() {
            this.el.classList.add('post-unmoderated');
            return this;
        },

        /* Adds the delete post button (for moderation management)
         * @method addRemoveButton <public> [Function]
         * @return EditablePost
         */
        addRemoveButton : function addRemoveButton() {
            this.appendChild(new CV.PostModerateRemoveButton({
                name : 'removeButton',
                postId : this.id,
                className : '-m0'
            }));
            this.el.appendChild(this.removeButton.el);
            return this;
        },

        /* Adds the publish post button (for moderation management)
         * @method addPublishButton <public> [Function]
         * @return EditablePost
         */
        addPublishButton : function addPublishButton() {
            this.appendChild(new CV.PostModeratePublishButton({
                name : 'publishButton',
                postId : this.id,
                className : '-m0'
            }));
            this.el.appendChild(this.publishButton.el);
            this.el.classList.add('has-bottom-actions');
            return this;
        },

        /* Adds the vote up/down buttons (for moderation management)
         * @method addVoteButtons <public> [Function]
         * @return EditablePost
         */
        addVoteButtons : function addVoteButtons() {
            this.appendChild(new CV.PostModerateVoteButtons({
                name : 'voteButtons',
                post : this
            }));
            this.el.appendChild(this.voteButtons.el);
            this.el.classList.add('has-bottom-actions');
            return this;
        },

        /* Binds the required events when the edit method is run
         * @method private _bindEditEvents <private> [Function]
         * @return EditablePost
         */
        _bindEditEvents : function _bindEditEvents() {
            autosize(this.titleElement);
            autosize(this.descriptionElement);

            this._postDimensionsChangedRef = this._postDimensionsChanged.bind(this);
            this.titleElement.addEventListener('autosize:resized', this._postDimensionsChangedRef);
            this.descriptionElement.addEventListener('autosize:resized', this._postDimensionsChangedRef);

            this._showDatePickerRef = this._showDatePicker.bind(this);
            this.timePickerButton.addEventListener('click', this._showDatePickerRef);

            this.titleElement.addEventListener('keypress', this._titleKeyPressHandler);
            this.titleElement.addEventListener('paste', this._pasteHandler);
            this.descriptionElement.addEventListener('paste', this._pasteHandler);

            return this;
        },

        /* Dispatch that the post has changed its dimensions. Usefull for parents to re-position Posts.
         * @method _postDimensionsChanged <private> [Function]
         * @return undefined
         */
        _postDimensionsChanged : function _postDimensionsChanged() {
            this.dispatch('dimensionsChanged', {layer: this.parent});
        },

        /* Updates the selected post image, the post imageContainer height and display the image cover
         * @method _updatePostImage <private> [Function]
         * @return EditablePost
         */
        _updatePostImage : function _updatePostImage() {
            var current = this.images[this._currentImageIndex];
            var height = this.imageHeight;

            this.imagePath = current.path;
            this.imageWidth = current.width;
            this.imageHeight = current.height;

            if (this.imageWidth > this.constructor.MAX_IMAGE_WIDTH) {
                height = this.imageHeight / this.imageWidth * this.constructor.MAX_IMAGE_WIDTH;
            }

            this.setImageHeight(height);
            this.setCoverImage(this.imagePath);

            return this;
        },

        /* Reset dynamic post image so the response to save indicates the the user choose to not display any image
         * @method _resetPostImage <private> [Function]
         * @return undefined
         */
        _resetPostImage : function _resetPostImage() {
            this.imagePath = '';
            this.imageWidth = null;
            this.imageHeight = null;
        },

        /* Adds the image controls (next,prev,remove,add) to handle the cover and subscribe its events.
         * @method _addImageControls <protected> [Function]
         * @return EditablePost
         */
        _addImageControls : function _addImageControls() {
            this.appendChild(
                new CV.PostEditImageControls({
                    name : 'imageControls',
                    images : this.images
                })
            ).render(this.imageWrapperElement);

            this._prevImageRef = this._prevImage.bind(this);
            this.imageControls.bind('prevImage', this._prevImageRef);

            this._nextImageRef = this._nextImage.bind(this);
            this.imageControls.bind('nextImage', this._nextImageRef);

            this._removeImageRef = this._removeImage.bind(this);
            this.imageControls.bind('removeImage', this._removeImageRef);

            this._replaceImageRef = this._replaceImage.bind(this);
            this.imageControls.bind('replaceImage', this._replaceImageRef);

            this.el.insertAdjacentHTML('afterbegin', this.constructor.HTML_ADD_COVER_BUTTON);
            this._showImageRef = this._showImage.bind(this);
            this.addCoverButton = this.el.parentNode.querySelector('.post-edit-add-cover-button');
            this.addCoverButton.addEventListener('click', this._showImageRef);

            return this;
        },

        /* Updates the _currentImageIndex and run _updatePostImage.
         * @method _nextImage <private> [Function]
         * @return undefined
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
         * @return undefined
         */
        _prevImage : function _prevImage() {
            if (this._currentImageIndex > 0) {
                this._currentImageIndex--;
            } else {
                this._currentImageIndex = (this._imagesLen - 1);
            }

            this._updatePostImage();
        },

        /* Hides the post.imageContainer, clears the image data and shows addCoverButton.
         * @method _removeImage <private> [Function]
         * @return undefined
         */
        _removeImage : function _removeImage() {
            this.hideImageWrapper();
            this._resetPostImage();
            this.addCoverButton.classList.add('active');
        },

        _replaceImage : function _replaceImage(ev) {
            var data = new FormData();
            data.append('image',  ev.image);

            API.uploadArticleImage({
                profileName : App.Voice.data.owner.profileName,
                voiceSlug : App.Voice.data.slug,
                data : data,
            }, function(err, res) {
                this.images.push(res);
                this._imagesLen = this.images.length;
                this._currentImageIndex = (this._imagesLen - 1);
                this._updatePostImage();

                if (this.imageControls) {
                    this.imageControls.updateImages(this.images);
                } else {
                    this._addImageControls();
                }
            }.bind(this));
        },

        /* Shows the post.imageContainer, updates the image data to be send and hides addCoverButton
         * @method _showImage <private> [Function]
         * @return undefined
         */
        _showImage : function _showImage() {
            this._updatePostImage();
            this.addCoverButton.classList.remove('active');
        },

        /* Prevent the user hiting ENTER
         * @method _titleKeyPressHandler <private> [Function]
         */
        _titleKeyPressHandler : function _titleKeyPressHandler(ev) {
            var charCode = (typeof ev.which === 'number') ? ev.which : ev.keyCode;
            if (charCode === 13) {
                ev.preventDefault();
            }
        },

        _pasteHandler : function _pasteHandler(ev) {
            ev.preventDefault();
        },

        _showDatePicker : function _showDatePicker(ev) {
            ev.stopPropagation();
            this.romeTime.show();
        }
    }
});
