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

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

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

            return this;
        },

        _renderHandler : function _renderHandler() {
            document.body.style.overflow = 'hidden';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            document.body.style.overflow = '';

            this._renderHandlerRef = null;
            this._destroyRef = null;

            return null;
        }
    }
});
