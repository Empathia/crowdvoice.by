Class(CV, 'MyVoicesTab').inherits(Widget)({
    prototype : {
        _rendered : false,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.el = this.element[0];
        },

        update : function update() {
            if (this._rendered === true) {
                return;
            }

            if (this.data.voices.length === 0) {
                this.el.innerHTML = '<p class="onboarding-message">You have no '+ this.data.name +'. <a href="#">Create a Voice</a>.</p>';
                return;
            }

            var fragment = document.createDocumentFragment();
            this.data.voices.forEach(function(voice, index) {
                this.appendChild(new CV.VoiceCoverMini({
                    name : 'voice_' + index,
                    className : 'my-voices-item-list',
                    data : voice
                })).addActions();
                fragment.appendChild(this['voice_' + index].el);
            }, this);

            this.el.appendChild(fragment);

            this._rendered = true;
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this.update();
        }
    }
});
