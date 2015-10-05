Class(CV, 'VoiceCoverActions').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-cover-actions',
    prototype : {
        voiceEntity : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];

            this.appendChild(new CV.VoiceCoverActionsEdit({
                name : 'edit',
                voiceEntity : this.voiceEntity,
                data : {value: 'Edit'}
            })).render(this.el);

            this.appendChild(new CV.VoiceCoverActionsArchive({
                name : 'archive',
                voiceEntity : this.voiceEntity
            })).render(this.el);

            // this.appendChild(new CV.VoiceCoverActionsDelete({
            //     name : 'delete'
            // })).render(this.el);
        }
    }
});
