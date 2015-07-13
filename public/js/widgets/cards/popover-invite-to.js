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
            var popover = this;

            this.el = this.element[0];
            this.contributeItem = this.el.querySelector('[data-action="contribute"]');
            this.memberButton = this.el.querySelector('[data-action="member"]');


            this.contributeItem.addEventListener("click", function(){

                new CV.Bubble({
                    title       : 'Invite to Contribute',
                    name        : 'inviteToContributeModal',
                    action      : CV.InviteToContribute,
                    width       : 650,
                    anchorEl    : $(popover.contributeItem)
                }).show();

            }, false);


            this.memberButton.addEventListener('click', function(){

                new CV.Bubble({
                    title       : 'Invite to Organization',
                    name        : 'inviteToOrganizationModal',
                    action      : CV.InviteToOrganization,
                    width       : 650,
                    anchorEl    : $(popover.memberButton)
                }).show();

            }, false);

        }
    }
});


