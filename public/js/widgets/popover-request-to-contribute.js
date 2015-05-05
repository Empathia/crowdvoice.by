Class(CV, 'PopoverRequestToContribute').inherits(Widget)({

    HTML_DEFAULT_CONTENT : '\
        <div class="request-contribute-popover-default">\
            <h2 class="-m0">Want to help out by posting relevant content?</h2>\
            <p class="-mb1">Brifly state why you be a valuable content contributor to this Voice.</p>\
            <textarea id="" class="ui-textarea -block -mb1" name="" rows="4" placeholder="140 characters max."></textarea>\
            <button class="submit-btn ui-btn -primary">Submit Request</button>\
            <button class="cancel-btn ui-btn">Cancel</button>\
        </div>',

    HTML_DONE_CONTENT : '\
        <div class="request-contribute-popover-done -text-center">\
            <h2 class="-mb0">Thanks for the interest to help out!</h2>\
            <p class="-mb1">We will review your request as soon as possible and may contact you to get some more information or directly with a response.</p>\
            <button class="ok-btn ui-btn -primary -font-bold -pl3 -pr3">OK</button>\
        </div>',

    prototype : {
        /* options */
        toggler: null,
        container: null,

        init: function init(config) {
            Widget.prototype.init.call(this, config);

            this.popOver = new CV.Popover({
                className: 'request-contribute-popover',
                placement: 'topleft',
                toggler: document.querySelector('.request-to-contribute-button'),
                container: document.querySelector('.request-to-contribute-container'),
                content: this.constructor.HTML_DEFAULT_CONTENT
            }).render();

            this.popOver.getContent().querySelector('.submit-btn').addEventListener('click', this.submit.bind(this), false);
            this.popOver.getContent().querySelector('.cancel-btn').addEventListener('click', this.popOver.toggle.bind(this.popOver), false);
        },

        submit : function() {
            this.popOver.setContent(this.constructor.HTML_DONE_CONTENT);
            this.popOver.getContent().querySelector('.ok-btn').addEventListener('click', function() {
                this.popOver.toggle();
                this.popOver.toggler.setAttribute('disabled', true);
            }.bind(this), false);

        }
    }
});