/* jshint multistr: true */
Class(CV, 'VoiceAddContent').inherits(Widget)({
    HTML: '\
        <div class="voice-add-content">\
            <button class="voice-add-post-button ui-btn -primary">\
                <svg class="voice-add-post-button-svg -abs -color-white">\
                    <use xlink:href="#svg-plus"></use>\
                </svg>\
            </button>\
        </div>\
    ',

    BUBBLE_OPTIONS : '\
        <div class="voice-add-content__option -clickable" data-type="FromUrl">\
            <svg class="voice-add-content__option-svg">\
                <use xlink:href="#svg-link"></use>\
            </svg>\
            <span class="voice-add-content__option-label">From URL</span>\
            <span class="voice-add-content__option-tooltip ui-has-tooltip">(?)\
                <i class="ui-tooltip -top">You can enter a URL of an image, video from Youtube or Vimeo or a web page.</i>\
            </span>\
        </div>\
        <div class="voice-add-content__option -clickable" data-type="FromSources">\
            <svg class="voice-add-content__option-svg">\
                <use xlink:href="#svg-sources"></use>\
            </svg>\
            <span class="voice-add-content__option-label">From Sources</span>\
            <span class="voice-add-content__option-tooltip ui-has-tooltip">(?)\
                <i class="ui-tooltip -top">You can enter a URL of an image, video from Youtube or Vimeo or a web page.</i>\
            </span>\
        </div>\
        <div class="voice-add-content__option -clickable" data-type="UploadFile">\
            <svg class="voice-add-content__option-svg">\
                <use xlink:href="#svg-upload"></use>\
            </svg>\
            <span class="voice-add-content__option-label">Upload File</span>\
            <span class="voice-add-content__option-tooltip ui-has-tooltip">(?)\
                <i class="ui-tooltip -top">You can enter a URL of an image, video from Youtube or Vimeo or a web page.</i>\
            </span>\
        </div>\
        <div class="voice-add-content__option -clickable" data-type="WriteArticle">\
            <svg class="voice-add-content__option-svg">\
                <use xlink:href="#svg-pencil"></use>\
            </svg>\
            <span class="voice-add-content__option-label">Write Article</span>\
            <span class="voice-add-content__option-tooltip ui-has-tooltip">(?)\
                <i class="ui-tooltip -top">You can enter a URL of an image, video from Youtube or Vimeo or a web page.</i>\
            </span>\
        </div>\
    ',

    prototype : {
        el: null,
        addPostButton: null,
        createPostModal : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.addPostButton = this.el.querySelector('.voice-add-post-button');

            this._autoSetup()._bindEvents();
        },

        _autoSetup : function _autoSetup() {
            this.appendChild(
                new CV.PopoverBlocker({
                    name : 'addPostBubble',
                    className : 'voice-add-content-bubble',
                    placement : 'left',
                    toggler : this.addPostButton,
                    content : this.constructor.BUBBLE_OPTIONS
                })
            ).render(this.el);

            this.bubbleOptions = [].slice.call(this.addPostBubble.getContent().getElementsByClassName('voice-add-content__option'), 0);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._bubbleShownHandlerRef = this._bubbleShownHandler.bind(this);
            this.addPostBubble.bind('activate', this._bubbleShownHandlerRef);

            this._bubbleHiddennHandlerRef = this._bubbleHiddenHandler.bind(this);
            this.addPostBubble.bind('deactivate', this._bubbleHiddennHandlerRef);

            this._optionClickHandlerRef = this._optionClickHandler.bind(this);
            this.bubbleOptions.forEach(function(option) {
                option.addEventListener('click', this._optionClickHandlerRef);
            }, this);
        },

        _bubbleShownHandler : function _bubbleShownHandler() {
            this.addPostButton.classList.add('active');
        },

        _bubbleHiddenHandler : function _bubbleHiddenHandler() {
            this.addPostButton.classList.remove('active');

            if (this.createPostModal) {
                this.createPostModal.activate();
            }
        },

        _optionClickHandler : function _optionClickHandler(ev) {
            var type = ev.currentTarget.getAttribute('data-type');

            this.createPostModal = CV.PostCreator.create({type: type});

            this.createPostModal.render(document.body);

            this._createPostDeactivateHandlerRef = this._createPostDeactivateHandler.bind(this);
            this.createPostModal.bind('deactivate', this._createPostDeactivateHandlerRef);
        },

        _createPostDeactivateHandler : function _createPostDeactivateHandlerRef() {
            this.createPostModal.unbind('deactivate', this._createPostDeactivateHandlerRef);
            this._createPostDeactivateHandlerRef = null;

            this.createPostModal = this.createPostModal.destroy();
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.addPostBubble.unbind('activate', this._bubbleShownHandlerRef);
            this._bubbleShownHandlerRef = null;

            this.addPostBubble.unbind('deactivate', this._bubbleHiddennHandlerRef);
            this._bubbleHiddennHandlerRef = null;

            this.bubbleOptions.forEach(function(option) {
                option.removeEventListener('click', this._optionClickHandlerRef);
            }, this);
            this._optionClickHandlerRef = null;

            return null;
        }
    }
});
