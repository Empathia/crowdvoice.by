Class(CV, 'Tab').inherits(Widget)({
    prototype : {
        title : null,
        content : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.appendChild(new CV.TabNav({
                name : 'nav',
                title : this.title
            }));

            this.appendChild(new CV.TabContent({
                name : 'content',
                content : this.content,
                data : this.contentData || null
            }));

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._activateRef = this.activate.bind(this);
            this.nav.bind('click', this._activateRef);
        },

        activate : function activate() {
            Widget.prototype.activate.call(this);
            this.nav.activate();
            this.content.activate();

            return this;
        },

        deactivate : function deactivate() {
            Widget.prototype.deactivate.call(this);
            this.nav.deactivate();
            this.content.deactivate();
            return this;
        }
    }
});
