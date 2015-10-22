var Person = require('./../../lib/currentPerson');

Class(CV, 'FeedSidebarStats').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="voices-stats -row">\
            <div class="-col-6">\
                <div class="profile-stat stat-voices">\
                    <div data-voices-total-num class="stat-num">0</div>\
                    <p>Voices</p>\
                    <span>you created or are contributing on</span>\
                </div>\
            </div>\
            <div class="-col-6">\
                <div class="profile-stat stat-organizations">\
                    <div data-orgs-total-num class="stat-num">0</div>\
                    <p>Organizations</p>\
                    <span>that you own or are a member of</span>\
                </div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.dom.updateText(
                this.el.querySelector('[data-voices-total-num]'),
                Person.get().voicesCount
            );

             this.dom.updateText(
                this.el.querySelector('[data-orgs-total-num]'),
                Person.get().organizations.length
            );
       }
    }
});


