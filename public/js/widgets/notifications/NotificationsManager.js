Class(CV, 'NotificationsManager').inherits(Widget)({
    ELEMENT_CLASS : 'cv-notifications',

    HTML : '\
        <div>\
            <div class="cv-notifications-container">\
                <div class="cv-notifications-all">\
                </div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0].querySelector(".cv-notifications-container");
            this.elAll = this.element[0].querySelector(".cv-notifications-all");
        },

        /* Updates the displayed notifications with the passed ones.
         * @method update <public> [Function]
         * @argument notifications <required> [Array] Array of Objects, each
         *  Object should be a modified FeedPresenter, with an extra property
         *  `notificationId` that holds the encoded notificationId.
         * @return NotificationsManager
         */
        update : function update(notifications){
            this.empty();

            notifications.forEach(function(n) {
                this.appendChild(CV.Notification.create(n.action, n.notificationId)).render(this.elAll);
            }, this);
            return this;
        },

        /* Removes all the children `notifications`.
         * @method empty <public> [Function]
         * @return NotificationsManager
         */
        empty : function empty() {
            while(this.children.length > 0) {
                this.children[0].destroy();
            }
            return this;
        },

        /* Show/hide the notifications.
         * @method toggle <public> [Function]
         * @return NotificationsManager
         */
        toggle : function toggle() {
            if (this.active) {
                return this.deactivate();
            }

            return this.activate();
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this.element.slideDown(250);
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this.element.slideUp(150);
        }
    }
});
