Class(CV, 'VoiceOboarding').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-voice-onboarding',
    HTML : '\
        <div>\
            <div class="header">\
                <h3 class="cv-voice-onboarding__title -float-left">Rise Your Voice!</h3>\
                <div class="line"></div>\
            </div>\
            <p class="cv-voice-onboarding__desc -float-left">Use this button to <b>add content</b><br>from any source.</p>\
            <div class="cv-voice-onboarding__arrow"></div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element;
            this.closeBtnContainer = this.el.find('.header');

            this.appendChild(new CV.UI.Close({
                name : 'closeButton',
                className : '-abs cv-onboarding__close',
                svgClassName : '-s10'
            })).render(this.closeBtnContainer);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this.closeButton.el.addEventListener('click', this._deactivateOnboarding.bind(this));
        },

        _deactivateOnboarding : function _deactivateOnboarding() {
            console.log('Bybye');
            this.deactivate();
            setTimeout( this.destroy(), 1000 );
        },

        destroy : function destroy (){
            Widget.prototype.destroy.call(this);

            if(this.closeButton){
                this.closeButton.el.removeEventListener('click', this._deactivateOnboarding.bind(this));
            }

            return null;
        }
    }
});

