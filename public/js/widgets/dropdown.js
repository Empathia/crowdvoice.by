/* jshint multistr: true */
/* Class CV.Dropdown
 * The dropdown class require the following options to work:
 * - label (string | Node/s)
 * - content (string | Node/s)
 *
 * This dropdown only does the following:
 * - show the `body` when the `head` is clicked
 * - when an clicking outside of the dropdown, the `body` will hide
 *
 * You can also call the `activate` and `deactivate` methods on the dropdown instance to show and hide the `body` as well.
 * To set the contents you can use the `setContent` method, which will replace the contents,
 * or you can append elements to it using the `addContent` method.
 */
Class(CV, 'Dropdown').inherits(Widget)({

    HTML : '\
        <div class="ui-dropdown -rel">\
            <div class="ui-dropdown__head -full-height -clickable">\
                <span class="ui-dropdown-label"></span>\
            </div>\
            <div class="ui-dropdown__body -abs -color-border-grey-light">\
            </div>\
        </div>\
    ',

    HTML_LABEL : '<span class="ui-dropdown-label"></span>',

    ARROW_HTML : '\
        <svg class="ui-dropdown-arrow">\
            <use xlink:href="#svg-arrow-down"></use>\
        </svg>\
    ',

    prototype : {
        /* options */
        label : '',
        content : '',
        alignment : 'left',
        showArrow : true,
        arrowClassName : '',
        bodyClassName : '',

        /* private */
        el : null,
        head : null,
        body : null,
        labelElement : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.head = this.el.querySelector('.ui-dropdown__head');
            this.body = this.el.querySelector('.ui-dropdown__body');
            this.labelElement = this.el.querySelector('.ui-dropdown-label');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.el.classList.add('-' + this.alignment);
            this.setLabel(this.label);
            this.setContent(this.content);

            if (this.showArrow) {
                this.head.insertAdjacentHTML('beforeend', this.constructor.ARROW_HTML);

                if (this.arrowClassName) {
                    this.arrowElement = this.head.querySelector('.ui-dropdown-arrow');
                    this.arrowClassName.split(' ').forEach(function(className) {
                        this.arrowElement.classList.add(className);
                    }, this);
                }
            }

            this.body.className += ' ' + this.bodyClassName;

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._toggleRef = this.toggle.bind(this);
            this.head.addEventListener('click', this._toggleRef);
        },

        /* Replace the label with the passed HTMLString, String, or HTMLElement(s).
         * @method setLabel <public> [Function]
         */
        setLabel : function setLabel(label) {
            this.labelElement.innerHTML = '';

            if ((typeof label).toLowerCase() === 'string') {
                this.labelElement.insertAdjacentHTML('beforeend', label);
                return this;
            } else this.labelElement.appendChild(label);

            this.label = null;
            return this;
        },

        /* Replace the contents with the passed HTMLString, String, or HTMLElement(s).
         * @method setContent <public> [Function]
         */
        setContent : function setContent(content) {
            this.body.innerHTML = '';

            if ((typeof content).toLowerCase() === 'string') {
                this.body.insertAdjacentHTML('beforeend', content);
            } else this.body.appendChild(content);

            content = null;
            return this;
        },

        /* Appends the passed HTML Nodes to the `body`.
         * @method addContent <public> [Function]
         */
        addContent : function addContent(element) {
            this.body.appendChild(element);
            element = null;
            return this;
        },

        toggle : function toggle() {
            this.el.classList.toggle('active');
            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.head.removeEventListener('click', this._toggleRef);
            this._toggleRef = null;

            this.el = null;
            this.head = null;
            this.body = null;
            this.labelElement = null;

            return null;
        }
    }
});
