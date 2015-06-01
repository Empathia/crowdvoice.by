/* jshint multistr: true */
Class(CV, 'VoiceAddContent').inherits(Widget)({
    HTML: '\
        <div class="voice-add-content">\
            <button class="voice-add-post-button ui-btn -primary">+</button>\
        </div>\
    ',

    BUBBLE_OPTIONS : '\
        <div class="voice-add-content__option" data-type="FromUrl">From URL</div>\
        <div class="voice-add-content__option" data-type="FromSources">From Sources</div>\
        <div class="voice-add-content__option" data-type="UploadFile">Upload File</div>\
        <div class="voice-add-content__option" data-type="WriteArticle">Write Article</div>\
    ',

    prototype : {
        el: null,
        addPostButton: null,

        init : function init() {
            Widget.prototype.init.call(this);

            this.el = this.element[0];
            this.addPostButton = this.el.querySelector('.voice-add-post-button');

            this.appendChild(
                new CV.Popover({
                    className : 'voice-add-content-bubble',
                    placement : 'left',
                    toggler : this.addPostButton,
                    container : this.el,
                    content : this.constructor.BUBBLE_OPTIONS
                })
            ).render();
        }
    }
});
