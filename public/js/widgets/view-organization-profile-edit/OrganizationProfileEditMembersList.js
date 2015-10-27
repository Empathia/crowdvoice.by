Class(CV, 'OrganizationProfileEditMembersList').inherits(Widget).includes(BubblingSupport)({
    prototype : {
        data : {
            members : null
        },

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup();
        },

        _setup : function _setup() {
            this.data.members.forEach(this.addUser, this);
            return this;
        },

        addUser : function addUser(user) {
            this.appendChild(new CV.CardMini({
                name : 'user_' + user.id,
                className : 'cv-items-list',
                data : user
            })).render(this.el).addButtonAction({
                name : 'removeButton',
                value : 'Remove',
                className : 'micro',
                eventName : 'card-remove-action-clicked'
            });
        },

        removeUser : function removeUser(user) {
            this.removeChild(user);
            user = user.destroy();
            return this;
        }
    }
});
