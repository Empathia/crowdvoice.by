Class(CV, 'EmptyState').inherits(Widget)({
    HTML : '\
        <div class="cv-empty-state -text-center">\
            <div class="cv-empty-state__svg-wrapper">\
                <svg class="cv-empty-state__svg">\
                    <use xlink:href="#svg-logo-flat"></use>\
                </svg>\
            </div>\
            <div class="cv-empty-state__message"></div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            if (this.message) {
                this.element[0].querySelector('.cv-empty-state__message').textContent = this.message;
            }
        }
    }
});
