
Class(CV, 'VoicePostsLayer').inherits(Widget)({
    HTML : '<div class="cv-voice-posts-layer"></div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
        },

        /* Sets the heigth of the layer. If a number is provided it will
         * convert it into pixel units.
         * @param height <required> [Number or String]
         * @method setHeight <public>
         */
        setHeight : function setHeight(height) {
            if (typeof height === 'number') {
                height = height + 'px';
            }

            this.el.style.height = height;
        },

        getPosts : function getPosts() {
            return this.children;
        }
    }
});
