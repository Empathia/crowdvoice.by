Class(CV, 'RelatedVoicesList').inherits(Widget)({
    ELEMENT_CLASS : 'cv-related-voices-list',
    prototype : {
        data : {
            voices : null,
            editMode : false
        },
        _index: 0,

        init : function(config){
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
            this._setup();
        },

        _setup : function _setup() {
            this.data.voices.forEach(this.addVoice, this);
            return this;
        },

        addVoice : function addVoice(voice) {
            this._index++;
            this.appendChild(new CV.VoiceCoverMini({
                name : 'voice_' + this._index,
                className : 'cv-related-voices__list-item',
                data : voice
            })).render(this.el);
        }
    }
});

