/* jshint multistr: true */

var rome = require('rome');
var moment = require('moment');
var autosize = require('autosize');

Class(CV, 'EditablePost').includes(CV.WidgetUtils, CustomEventSupport, NodeSupport)({

    MAX_LENGTH_TITLE : 80,
    MAX_LENGTH_DESCRIPTION : 180,

    HTML_DATE_PICKER : '\
        <div class="post-edit-date-picker ui-input-group -inline-block">\
            <button class="post-date-picker-button ui-btn -primary -color-white -sm -float-right">\
                <svg class="post-edit-date-picker-calendar">\
                    <use xlink:href="#svg-calendar"></use>\
                <svg>\
            </button>\
            <div class="ui-input-auto">\
                <input class="ui-input -sm"/>\
            </div>\
        </div>',

    HTML_ADD_COVER_BUTTON : '\
        <button class="add-cover-button ui-btn -color-bg-white -color-grey -sm">\
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

        images : null,
        imagePath : '',

        _data : null,
        _currentImageIndex : 0,
        _imagesLen : 0,

        setup : function setup() {
            if (this.images) {
                this._imagesLen = this.images.length;
            }

            if (this._imagesLen) {
                this.updatePostImage();
                this._addImageControls();
            }

            return this;
        },

        /* Updates the post image, the post imageContainer height;
         * @method updatePostImage <private> [Function]
         */
        updatePostImage : function updatePostImage() {
            var current = this.images[this._currentImageIndex];

            this.imagePath = current.path;
            this.imageWidth = current.width;
            this.imageHeight = current.height;

            this.setImageHeight(this.imageHeight);
            this.setCoverImage(this.imagePath);
        },

        /* Returns the new modified data of Post.
         * @method getEditedData <pubic> [Function]
         * @returns PostModel data + imagesArray extra props [Object]
         */
        getEditedData : function getEditedData() {
            return {
                title : this.titleElement.value,
                description : this.descriptionElement.value,
                publishedAt : this.romeTime.getDate(),

                image : this.image,
                imageWidth : this.imageWidth,
                imageHeight : this.imageHeight,

                // extra props
                images : this.images,
                imagePath : this.imagePath,

                sourceType : this.sourceType,
                sourceService : this.sourceService,
                sourceUrl : this.sourceUrl
            };
        },

        /* Changes the title and description HTMLElements into TextAreas.
         * If it has postData.images then it shows the replace and remove buttons
         * If it has more than 1 postData.images then it shows the next/prev buttons for switching images.
         * @method _makeItEditable <private> [Function]
         */
        edit : function edit() {
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

            // add the date picker
            this.dateTimeElement.style.display = 'none';
            this.dateTimeElement.parentNode.insertAdjacentHTML('beforeend', this.constructor.HTML_DATE_PICKER);
            this.timePickerInput = this.dateTimeElement.parentNode.querySelector('.ui-input');
            this.timePickerButton = this.dateTimeElement.parentNode.querySelector('.post-date-picker-button');

            this.romeTime = rome(this.timePickerInput, {
                appendTo : this.el,
                inputFormat : 'DD MMM, YYYY HH:mm',
                initialValue : moment(this.updatedAt)
            });

            this._bindEditEvents();

            return this;
        },

        addRemoveButton : function addRemoveButton() {
            this.appendChild(new CV.PostEditRemoveButton({name : 'removeButton'})).render(this.el);
            return this;
        },

        addPublishButton : function addPublishButton() {
            this.appendChild(new CV.PostModeratePublishButton({name : 'publishButton'})).render(this.el);
            this.el.classList.add('has-bottom-actions');
            return this;
        },

        addVoteButtons : function addVoteButtons() {
            this.appendChild(new CV.PostModerateVoteButtons({name : 'voteButtons'})).render(this.el);
            this.el.classList.add('has-bottom-actions');
            return this;
        },

        _bindEditEvents : function _bindEditEvents() {
            autosize(this.titleElement);
            autosize(this.descriptionElement);

            this._showDatePickerRef = this._showDatePicker.bind(this);
            this.timePickerButton.addEventListener('click', this._showDatePickerRef);

            this.titleElement.addEventListener('keypress', this._titleKeyPressHandler);
            this.titleElement.addEventListener('paste', this._pasteHandler);
            this.descriptionElement.addEventListener('paste', this._pasteHandler);
        },

        /* Adds the image controls (next,prev,remove,add) to handle the cover and subscribe its events.
         * @method _addImageControls <private> [Function]
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
            this.imageControls.bind('removeImages', this._removeImageRef);

            this.el.insertAdjacentHTML('afterbegin', this.constructor.HTML_ADD_COVER_BUTTON);
            this._showImageRef = this._showImage.bind(this);
            this.addCoverButton = this.el.querySelector('.add-cover-button');
            this.addCoverButton.addEventListener('click', this._showImageRef);

            return this;
        },

        /* Updates the _currentImageIndex and run updatePostImage.
         * @method _nextImage <private> [Function]
         */
        _nextImage : function _nextImage() {
            if (this._currentImageIndex < (this._imagesLen - 1)) {
                this._currentImageIndex++;
            } else {
                this._currentImageIndex = 0;
            }

            this.updatePostImage();
        },

        /* Updates the _currentImageIndex and run updatePostImage.
         * @method _prevImage <private> [Function]
         */
        _prevImage : function _prevImage() {
            if (this._currentImageIndex > 0) {
                this._currentImageIndex--;
            } else {
                this._currentImageIndex = (this._imagesLen - 1);
            }

            this.updatePostImage();
        },

        /* Hides the post.imageContainer, updates _image to '' and shows addCoverButton
         * @method _removeImage <private> [Function]
         */
        _removeImage : function _removeImage() {
            this.hideImageWrapper();
            this.addCoverButton.style.display = 'block';
        },

        /* Shows the post.imageContainer, updates _currentImageIndex to '' and hides addCoverButton
         * @method _showImage <private> [Function]
         */
        _showImage : function _showImage() {
            this.showImageWrapper();
            this.addCoverButton.style.display = 'none';
        },

        /* Prevent the user hiting ENTER
         * @method _titleKeyPressHandler <private> [Function]
         */
        _titleKeyPressHandler : function _titleKeyPressHandler(ev) {
            var charCode = (typeof ev.which == 'number') ? ev.which : ev.keyCode;
            if (charCode === 13) ev.preventDefault();
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
