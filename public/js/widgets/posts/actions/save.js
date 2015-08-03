var API = require('./../../../lib/api');
var Events = require('./../../../lib/events');

Class(CV, 'PostActionSave').inherits(Widget)({
    HTML : '\
        <div class="post-card-actions-item -col-6">\
            <svg class="post-card-activity-svg">\
                <use xlink:href="#svg-save"></use>\
            </svg>\
            <p class="post-card-actions-label">Save</p>\
        </div>',

    prototype : {
        entity : null,

        init : function init (config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
            return this;
        },

        _clickHandler : function _clickHandler() {
            if (this.entity.saved) {
                return this._unsave();
            }

            this._save();
        },

        _save : function _save() {
            API.postSave({
                profileName : App.Voice.owner.profileName,
                voiceSlug : App.Voice.slug,
                postId : this.entity.id
            }, this._responseHandler.bind(this));
        },

        _unsave : function _unsave() {
            API.postUnsave({
                profileName : App.Voice.owner.profileName,
                voiceSlug : App.Voice.slug,
                postId : this.entity.id
            }, this._responseHandler.bind(this));
        },

        _responseHandler : function _responseHandler(err, res) {
            console.log(err);
            console.log(res);

            if (res.status === 'saved') {
                this.entity.saved = true;
            } else if (res.status === 'removed') {
                this.entity.saved = false;
            }
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(this.el, 'click', this._clickHandlerRef);
            return null;
        }
    }
});