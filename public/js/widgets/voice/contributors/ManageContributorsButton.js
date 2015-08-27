var Events = require('./../../../lib/events');

Class(CV, 'ManageContributorsButton').inherits(Widget)({
    HTML : '<button class="cv-button tiny">Manage Contributors</button>',
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.el, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            if (this.manageContributorsModal) {
                this.manageContributorsModal = this.manageContributorsModal.destroy();
            }

            this.appendChild(new CV.UI.Modal({
                name : 'manageContributorsModal',
                title : 'Manage Contributors',
                action : CV.ManageContributors,
                width : 900,
                data : {
                    users : []
                }
            })).render(document.body);

            this.manageContributorsModal.bubbleAction.setup();

            requestAnimationFrame(function() {
                this.manageContributorsModal.activate();
            }.bind(this));
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(this.el, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            return null;
        }
    }
});
