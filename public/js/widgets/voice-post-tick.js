Class(CV, 'VoicePostTick').inherits(Widget)({
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            console.log('new voice post tick')
        }
    }
});
