/* jshint multistr: true */
Class(CV, 'VoiceFooterShareItems').inherits(Widget).includes(CV.WidgetUtils, ShareLinkGenerator)({
    HTML : '\
        <div class="ui-vertical-list hoverable">\
            <a class="ui-vertical-list-item -block" target="_blank" data-type="twitter">\
                <svg class="-s20 -mr1">\
                    <use xlink:href="#svg-twitter-square"></use>\
                </svg>\
                Twitter\
            </a>\
            <a class="ui-vertical-list-item -block" target="_blank" data-type="facebook">\
                <svg class="-s20 -mr1">\
                    <use xlink:href="#svg-facebook-square"></use>\
                </svg>\
                Facebook\
            </a>\
            <a class="ui-vertical-list-item -block" target="_blank" data-type="googleplus">\
                <svg class="-s20 -mr1">\
                    <use xlink:href="#svg-gplus-square"></use>\
                </svg>\
                Google Plus\
            </a>\
            <div class="share-popover-email-box -clearfix">\
                <svg class="-s20 -float-left">\
                    <use xlink:href="#svg-email-square"></use>\
                </svg>\
                <button class="cv-button tiny -float-right">Share</button>\
                <div class="cv-input -overflow-hidden">\
                    <input placeholder="Enter email here to share"/>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.fa = this.el.querySelector('[data-type="facebook"]');
            this.tw = this.el.querySelector('[data-type="twitter"]');
            this.gp = this.el.querySelector('[data-type="googleplus"]');

            var url = location.href;
            this.dom.updateAttr('href', this.fa, this.facebook({url: url}));
            this.dom.updateAttr('href', this.tw, this.twitter({url: url, text: voiceInfo.title}));
            this.dom.updateAttr('href', this.gp, this.googlePlus({url: url}));
        }
    }
});
