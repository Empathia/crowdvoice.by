/* jshint multistr: true */
var Checkit = require('checkit');

Class(CV, 'VoiceFooterShareItems').inherits(Widget).includes(CV.WidgetUtils, ShareUrl)({
    HTML : '\
        <div class="ui-vertical-list hoverable">\
            <a class="ui-vertical-list-item -block" target="_blank" data-type="twitter" title="Share on Twitter">\
                <svg class="-s20 -mr1">\
                    <use xlink:href="#svg-twitter-square"></use>\
                </svg>\
                Twitter\
            </a>\
            <a class="ui-vertical-list-item -block" target="_blank" data-type="facebook" title="Share on Facebook">\
                <svg class="-s20 -mr1">\
                    <use xlink:href="#svg-facebook-square"></use>\
                </svg>\
                Facebook\
            </a>\
            <a class="ui-vertical-list-item -block" target="_blank" data-type="googleplus" title="Share on Google+">\
                <svg class="-s20 -mr1">\
                    <use xlink:href="#svg-gplus-square"></use>\
                </svg>\
                Google Plus\
            </a>\
            <div class="share-popover-email-box -clearfix">\
                <svg class="-s20 -float-left">\
                    <use xlink:href="#svg-email-square"></use>\
                </svg>\
                <button class="cv-button tiny -float-right" data-button="send-email">Share</button>\
                <div class="cv-input -overflow-hidden">\
                    <input placeholder="Enter email here to share" data-input="email"/>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        _checkit : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.fa = this.el.querySelector('[data-type="facebook"]');
            this.tw = this.el.querySelector('[data-type="twitter"]');
            this.gp = this.el.querySelector('[data-type="googleplus"]');
            this.emailInputWrapper = this.el.querySelector('.cv-input');
            this.emailInput = this.el.querySelector('[data-input="email"]');
            this.sendEmailButton = this.el.querySelector('[data-button="send-email"]');

            var url = location.href;
            this.dom.updateAttr('href', this.fa, this.facebook({u: url}));
            this.dom.updateAttr('href', this.tw, this.twitter({url: url, text: voiceInfo.title}));
            this.dom.updateAttr('href', this.gp, this.googlePlus({url: url}));

            this._checkit = new Checkit({
                email : ['required', 'email']
            });

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._beforeEmailSendRef = this._beforeEmailSend.bind(this);
            this.sendEmailButton.addEventListener('click', this._beforeEmailSendRef);

            this._keyupHandlerRef = this._keyupHandler.bind(this);
            this.emailInput.addEventListener('keyup', this._keyupHandlerRef);

            return this;
        },

        _beforeEmailSend : function _beforeEmailSend() {
            var checkResult = this._checkit.runSync({email : this.emailInput.value});

            if (checkResult[0]) {
                return this.emailInputWrapper.classList.add('error');
            }

            var emailUrlString = this.email({
                to : this.emailInput.value,
                subject : 'Check out this page',
                body : window.location
            });

            window.location = emailUrlString;
        },

        _keyupHandler : function _keyupHandler(ev) {
            this.emailInputWrapper.classList.remove('error');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.sendEmailButton.removeEventListener('click', this._beforeEmailSendRef);
            this._beforeEmailSendRef = null;

            this.emailInput.removeEventListener('keyup', this._keyupHandlerRef);
            this._keyupHandlerRef = null;

            return null;
        }
    }
});
