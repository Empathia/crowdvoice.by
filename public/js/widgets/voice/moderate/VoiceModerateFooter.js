/* jshint multistr: true */
Class(CV, 'VoiceModerateFooter').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
    <footer class="voice-moderate-footer -clearfix">\
        <div class="-float-left moderate-footer-left" data-container="left">\
            <div data-container="total">\
                <b>{{TOTAL}}</b> posts in moderation queue.\
            </div>\
        </div>\
        <div class="-float-right moderate-footer-right" data-container="right"></div>\
    </footer>',

    prototype : {
        /* options */
        totalPosts : 0,

        el : null,
        leftElementWrapper : null,
        rightElementWrapper : null,
        totalPostsWrapper : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.leftElementWrapper = this.el.querySelector('[data-container="left"]');
            this.rightElementWrapper = this.el.querySelector('[data-container="right"]');
            this.totalPostsElement = this.leftElementWrapper.querySelector('b');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.dom.updateText(this.totalPostsElement, this.totalPosts);

            this.appendChild(
                new CV.VoiceModerateDoneButton({
                    name : 'button'
                })
            ).render(this.rightElementWrapper);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            this.button.bind('click', this._buttonClickHandlerRef);

            return this;
        },

        _buttonClickHandler : function _buttonClickHandler() {
            this.dispatch('done');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._buttonClickHandlerRef = null;
            this.el = null;
            this.leftElementWrapper = null;
            this.rightElementWrapper = null;

            return null;
        }
    }
});


