var API = require('../../../lib/api');

Class(CV, 'PostModeratePublishButton').inherits(Widget)({
    HTML : '\
        <button class="post-moderate-publish-btn cv-button -abs">\
            <svg class="-s16">\
                <use xlink:href="#svg-thumbs-up"></use>\
            </svg>\
            <span>Publish</span>\
        </button>\
    ',

    prototype : {
        postId : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._bindEditEvents();
        },

        _bindEditEvents : function _bindEditEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            this.el.addEventListener('click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            this.disable();

            var postEditedData = this.parent.getEditedData();

            var saveData = {
                title : postEditedData.title,
                description : postEditedData.description,
                sourceType : postEditedData.sourceType,
                sourceService : postEditedData.sourceService,
                sourceUrl : postEditedData.sourceUrl,
                imagePath : postEditedData.image || postEditedData.imagePath,
                images : postEditedData.images.map(function(item) {return item.path;}),
                publishedAt : postEditedData.publishedAt
            };
            console.log(saveData);

            API.postSave({data : saveData}, this._publishPostResponse.bind(this));
        },

        _publishPostResponse : function _publishPostResponse(err, response) {
            var errorMessage = '';

            if (err) {
                errorMessage = 'Error - ' + response.status;
                return this._setErrorState({message: errorMessage}).enable();
            }

            this._setSuccessState();
        },

        _setErrorState : function _setErrorState(config) {
            if (config && config.message) {
                this.el.innerHTML = config.message;
            }

            return this;
        },

        _setSuccessState : function _setSuccessState() {
            this.el.innerHTML = 'Published!';
            window.setTimeout(function() {
                window.location.reload();
            }, 2000);
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.el.classList.add('-muted');
            this.el.setAttribute('disabled', true);
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
            this.el.classList.remove('-muted');
            this.el.removeAttribute('disabled');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.el.removeEventListener('click', this._clickHandlerRef);
            this._clickHandlerRef = null;

            return null;
        }

    }
});
