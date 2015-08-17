/* globals App */
var origin = require('get-location-origin');
var moment = require('moment');

Class(CV, 'PostActionShare').inherits(Widget)({
    HTML : '\
        <div class="post-card-actions-item -clickable">\
            <svg class="post-card-activity-svg">\
                <use xlink:href="#svg-share"></use>\
            </svg>\
            <p class="post-card-actions-label">Share</p>\
        </div>',

    prototype : {
        /* the PostEntity */
        entity : null,

        init : function init (config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            var url = origin + '/' + App.Voice.data.owner.profileName + '/';
            url += App.Voice.data.slug + '/';
            url += '#!' + moment(this.entity.publishedAt).format('YYYY-MM') + '/';
            url += this.entity.id;

            this.appendChild(new CV.PopoverShare({
                name : 'share',
                data : {
                    url : url,
                    title : this.entity.title
                }
            }));

            this.appendChild(new CV.PopoverBlocker({
                name : 'popover',
                className : 'post-share-popover share-popover -text-left',
                placement : 'top-right',
                toggler : this.el,
                content : this.share.el
            })).render(this.el);
        }
    }
});
