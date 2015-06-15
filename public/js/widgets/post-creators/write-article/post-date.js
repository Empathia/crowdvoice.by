/* jshint multistr: true */
var rome = require('rome');
var moment = require('moment');

Class(CV, 'PostCreatorWriteArticlePostDate').inherits(Widget)({

    ELEMENT_CLASS : 'write-article-post-date',

    HTML : '\
        <div>\
            <div class="-full-height">\
                <div class="write-article-title-wrapper -inline-block">\
                    <span class="write-article-title -font-bold">Write an Article</span>\
                    <span class="ui-has-tooltip">\
                        (?)\
                        <span class="ui-tooltip -right -nw">Tootlip Message</span>\
                    </span>\
                </div>\
                <div class="write-article-post-date-wrapper -float-right">\
                    Post date\
                    <div class="write-article-date-picker ui-input-group -inline-block">\
                        <button class="post-date-picker-button ui-btn -primary -color-white -sm -float-right">\
                            <svg class="post-edit-date-picker-calendar">\
                                <use xlink:href="#svg-calendar"></use>\
                            </svg>\
                        </button>\
                        <div class="ui-input-auto">\
                            <input class="ui-input -sm">\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {

        el : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.timePickerInput = this.el.querySelector('.write-article-date-picker .ui-input');
            this.timePickerButton = this.el.querySelector('.post-date-picker-button');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.romeTime = rome(this.timePickerInput, {
                appendTo : this.el,
                inputFormat : 'DD MMM, YYYY HH:mm',
                initialValue : moment()
            });

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._showDatePickerRef = this._showDatePicker.bind(this);
            this.timePickerButton.addEventListener('click', this._showDatePickerRef);

            return this;
        },

        _showDatePicker : function _showDatePicker(ev) {
            ev.stopPropagation();
            this.romeTime.show();
        },

        destroy : function destroy() {
            CV.PostCreator.prototype.destroy.call(this);
        }
    }
});
