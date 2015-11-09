Class(CV, 'VoiceOboarding').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-voice-onboarding',
    HTML : '\
        <div class="cv-onboarding-popover">\
            <div class="cv-onboarding-wrapper">\
            </div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element;
            this.popoverContainer = this.el.find('.cv-onboarding-wrapper');
        },

        setup : function setup() {
            var popoverToggler = this.parent.voiceAddContent.el;

            this.appendChild(new CV.Popover({
                name : 'popoverOnboarding',
                className : 'onboarding-popover',
                placement : '-bottom-right',
                toggler : popoverToggler,
                container : this.popoverContainer[0],
                title : 'Raise Your Voice!',
                content : '\
                    <div class="line"></div>\
                    <p class="cv-voice-onboarding__desc -float-left">Use this button to <b>add content</b><br>from any source.</p>\
                    <div class="cv-voice-onboarding__arrow"></div>\
                '
            })).render(this.el);

            this.appendChild(new CV.UI.Close({
                name : 'closeButton',
                className : '-abs cv-onboarding__close',
                svgClassName : '-s10'
            })).render(this.popoverOnboarding.el);

            this.popoverOnboarding.activate();
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this.closeButton.el.addEventListener('click', this._deactivateOnboarding.bind(this));
            this.popoverOnboarding.bind('deactivate', this._deactivateOnboarding); 
        },

        _deactivateOnboarding : function _deactivateOnboarding() {
            this.destroy();
        },

        destroy : function destroy (){
            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});
