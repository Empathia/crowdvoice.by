Class(CV, 'PostCreatorUploadFile').inherits(Widget).includes(CV.WidgetUtils)({
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            console.log('new PostCreatorUploadFile');
        }
    }
});
