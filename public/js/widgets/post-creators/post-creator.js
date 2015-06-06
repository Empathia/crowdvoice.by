Class(CV, 'PostCreator').inherits(Widget).includes(CV.WidgetUtils)({

    create : function create(config) {
        var type = config.type;

        return new window.CV['PostCreator' + type](config);
    },

    prototype : {
        _body : null,
        closeButton : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this._body = document.body;
        },

        /* Adds the close icon and binds its events
         * @method addCloseButton <public> [Function]
         * @return [PostCreator]
         */
        addCloseButton : function addCloseButton() {
            this.el.insertAdjacentHTML('afterbegin', '<svg class="cv-post-creator__close -clickable"><use xlink:href="#svg-circle-x"></use></svg>');
            this.closeButton = this.el.getElementsByClassName('cv-post-creator__close')[0];

            this._closeHanderRef = this._closeHander.bind(this);
            this.closeButton.addEventListener('click', this._closeHanderRef);

            return this;
        },

        _closeHander : function _closeHander() {
            this.deactivate();
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);

            this._body.style.overflow = 'hidden';
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);

            this._body.style.overflow = '';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            if (this.closeButton) {
                this.closeButton.removeEventListener('click', this._closeHanderRef);
                this._closeHanderRef = null;
            }

            this._body = null;
            this.closeButton = null;

            return null;
        }
    }
});

