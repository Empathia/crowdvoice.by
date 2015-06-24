Class(CV, 'EditablePostLink').inherits(CV.PostLink).includes(CV.EditablePost)({
    prototype : {
        init : function init(config) {
            CV.PostLink.prototype.init.call(this, config);

            this.setup();
        }
    }
});
