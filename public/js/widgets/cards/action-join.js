var Events = require('./../../lib/events');

Class(CV, 'CardActionJoin').inherits(Widget)({
    ELEMENT_CLASS : 'card-actions-item',
    HTML : '\
        <div>\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-join"></use>\
            </svg>\
            <p class="card-actions-label">Join</p>\
        </div>',

    prototype : {
        entity : null,
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
            this.requestMembershipModal = new CV.UI.Modal({
                title : 'Request Membership',
                name : 'requestMembershipModal',
                action : CV.RequestMembership,
                width : 650,
                data : {
                    orgId : this.entity.id,
                    profileName : this.entity.profileName
                }
            }).render(document.body);

            requestAnimationFrame(function() {
                this.requestMembershipModal.activate();
            }.bind(this));
        }
    }
});
