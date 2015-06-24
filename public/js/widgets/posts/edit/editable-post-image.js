Class(CV, 'EditablePostImage').inherits(CV.PostImage).includes(CV.EditablePost)({
    prototype : {
        init : function init(config) {
            CV.PostImage.prototype.init.call(this, config);

            this.setup();
        }
    }
});
