/* jshint multistr: true */
Class(CV, 'CardInviteToPopover').inherits(Widget)({
    HTML : '\
        <ul class="ui-vertical-list hoverable -list-clean">\
            <li class="ui-vertical-list-item -nw" data-action="contribute">Contribute in voice&hellip;</li>\
            <li class="ui-vertical-list-item -nw" data-action="member">Become a member of&hellip;</li>\
        </ul>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.contibuteItem = this.el.querySelector('[data-action="contribute"]');
            this.memberButton = this.el.querySelector('[data-action="member"]');
        }
    }
});


