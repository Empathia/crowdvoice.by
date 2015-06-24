Class(CV, 'EditablePostVideo').inherits(CV.PostVideo).includes(CV.EditablePost)({
    prototype : {
        init : function init(config) {
            CV.PostVideo.prototype.init.call(this, config);

            this.setup();
        }
    }
});
