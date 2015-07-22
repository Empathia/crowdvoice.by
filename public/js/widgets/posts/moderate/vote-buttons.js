var API = require('../../../lib/api');

Class(CV, 'PostModerateVoteButtons').inherits(Widget)({
    ELEMENT_CLASS : 'post-moderate-vote-buttons -abs -clearfix',

    HTML : '\
        <div> \
            <button class="post-moderate-allow-btn cv-button -m0 -float-left">\
                <svg class="-s16">\
                    <use xlink:href="#svg-thumbs-up"></use>\
                </svg>\
                <span>Allow</span>\
            </button>\
            <button class="post-moderate-deny-btn cv-button -m0 -float-left">\
                <svg class="-s16">\
                    <use xlink:href="#svg-join"></use>\
                </svg>\
                <span>Deny</span>\
            </button>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.allowButton = this.el.querySelector('.post-moderate-allow-btn');
            this.denyButton = this.el.querySelector('.post-moderate-deny-btn');

            this._bindEditEvents();
        },

        _bindEditEvents : function _bindEditEvents() {
            this._allowClickHandlerRef = this._allowClickHandler.bind(this);
            this.allowButton.addEventListener('click', this._allowClickHandlerRef);

            this._denyClickHandlerRef = this._denyClickHandler.bind(this);
            this.denyButton.addEventListener('click', this._denyClickHandlerRef);
        },

        _allowClickHandler : function _allowClickHandler() {
            var args = {
                profileName : App.Voice.owner.profileName,
                voiceSlug : App.Voice.slug,
                postId : this.postId,
                vote : 'up'
            };

            API.postVote(args, this._voteResponseHandler.bind(this));
        },

        _denyClickHandler : function _denyClickHandler() {
            var args = {
                profileName : App.Voice.owner.profileName,
                voiceSlug : App.Voice.slug,
                postId : this.postId,
                vote : 'up'
            };

            API.postVote(args, this._voteResponseHandler.bind(this));
        },

        _voteResponseHandler : function _voteResponseHandler(err, response) {
            console.log(err);
            console.log(response);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.allowButton.removeEventListener('click', this._allowClickHandlerRef);
            this._allowClickHandlerRef = null;

            this.denyButton.removeEventListener('click', this._denyClickHandlerRef);
            this._denyClickHandlerRef = null;

            return null;
        }
    }
});
