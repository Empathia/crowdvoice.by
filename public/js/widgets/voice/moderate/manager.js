/* jshint multistr: true */
Class(CV, 'VoiceModerateManager').inherits(Widget)({
    HTML : '\
        <div class="voice-moderate-wrapper">\
            <div class="voice-posts"></div>\
        </div>\
    ',

    prototype : {

        el : null,
        layersManager : null,
        _window : null,
        _body : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this._window = window;
            this._body = document.body;

            var data = {
                name : 'layersManager',
                element : this.el.querySelector('.voice-posts'),
                averagePostTotal : 150,
                averagePostWidth : 340,
                averagePostHeight : 500,
                scrollableArea : this.el
            };
            Object.keys(voiceInfo).forEach(function(propertyName) {
                data[propertyName] = voiceInfo[propertyName];
            });
            data.postsCount = Voice.postsCount;

            this.layersManager = new CV.VoicePostLayersManager(data);

            this.appendChild(
                new CV.VoiceModerateFooter({
                    name : 'footer'
                })
            ).render(this.el);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._renderHandlerRef = this._renderHandler.bind(this);
            this.bind('render', this._renderHandlerRef);

            this._destroyRef = this.destroy.bind(this);
            this.footer.bind('done', this._destroyRef);

            this._windowKeydownHandlerRef = this._windowKeydownHandler.bind(this);
            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);

            return this;
        },

        _renderHandler : function _renderHandler() {
            this._body.style.overflow = 'hidden';
        },

        _windowKeydownHandler : function _windowKeydownHandler(ev) {
            var charCode = (typeof ev.which == 'number') ? ev.which : ev.keyCode;

            if (charCode === 27) { // ESC
                this.destroy();
            }
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this._body.style.overflow = '';

            this._window.addEventListener('keydown', this._windowKeydownHandlerRef);
            this._windowKeydownHandlerRef = null;

            this._renderHandlerRef = null;
            this._destroyRef = null;
            this.el = null;
            this._window = null;
            this._body = null;

            return null;
        }
    }
});
