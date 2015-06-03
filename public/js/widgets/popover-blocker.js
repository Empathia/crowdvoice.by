/* jshint multistr: true */
/* @class CV.PopoverBlocker – Creates pop overs that when activated they will be placed on top of every content,
 * disabling interation and scrolling for the passed `container` element.
 *
 * @options
 * placement [String] (top) top|right|bottom|left
 * toggler <required> [HTMLElement] (null) The element that will show/hide the popover upon click
 * container <optional> [HTMLElement] (document.body) The element to disable when activated
 * title <optional> [String] (null) popover's title
 * content <optional> [HTMLElement, HTMLString] (null) Popover's content
 *
 * @usage
 *  new CV.Popover({
        toggler: document.querySelector('.button'),
        container: document.querySelector('.container'),
        content: '<h1>Hello</h1>'
    }).render();
 */
Class(CV, 'PopoverBlocker').inherits(Widget)({
    HTML : '\
        <div class="ui-popover">\
            <div class="popover-title"></div>\
            <div class="popover-content"></div>\
        </div>\
    ',

   PLACEMENT_CLASSNAMES : {
        top     : '-top',
        right   : '-right',
        bottom  : '-bottom',
        left    : '-left'
    },

    prototype : {
        toggler : null,
        container : null,
        placement : null,
        title : null,
        content : null,

        el : null,
        titleElement : null,
        contentElement : null,
        backdropElement : null,
        parentElement : null,

        init : function init(config) {
            this.placement = 'top';
            this.container = document.body;

            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.titleElement = this.el.querySelector('.popover-title');
            this.contentElement = this.el.querySelector('.popover-content');
            this.backdropElement = document.createElement('div');

            this._autoSetup()._bindEvents();
        },

        _autoSetup : function _autoSetup() {
            this.backdropElement.classList.add('ui-popover-backdrop');
            this.el.classList.add(this.constructor.PLACEMENT_CLASSNAMES[this.placement]);
            if (this.title) this.titleElement.textContent = this.title;
            if (this.content) this.setContent(this.content);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._toggleHandlerRef = this.toggle.bind(this);
            this.toggler.addEventListener('click', this._toggleHandlerRef, false);

            this._closeHandlerRef = this.deactivate.bind(this);
            this.backdropElement.addEventListener('click', this._closeHandlerRef);
        },

        /* Replaces the HTML of `popover-content` element
         * @method setContent <public> [Function]
         * @param content <required> [HTMLString] the new content for `popover-content` element
         * @return this [CV.Popover]
         */
        setContent : function setContent(content) {
            this.contentElement.innerHTML = "";

            if ((typeof this.content).toLowerCase() === 'string') {
                this.contentElement.insertAdjacentHTML('afterbegin', content);
                return this;
            }

            this.contentElement.appendChild(content);

            return this;
        },

        /* Activate/Deactivate the popover
         * @method toggle <public> [Function]
         * @return this [CV.Popover]
         */
        toggle : function toggle() {
            if (this.active) this.deactivate();
            else this.activate();

            return this;
        },

        /* Append the element inside the backdrop and update sets its position.
         * @method _placeElement <private> [Function]
         */
        _placeElement : function _placeElement() {
            var bounds = this.el.getBoundingClientRect();
            var coords = [bounds.left, bounds.top];

            this.el.style.position = 'absolute';
            this.el.style.left = coords[0] + 'px';
            this.el.style.top = coords[1] + 'px';
            this.el.style.bottom = 'initial';

            this.backdropElement.appendChild(this.el);

            bounds = coords = null;
        },

        /* Return the element to its original container and remove the custom styles.
         * @method _unplaceElement <private> [Function]
         */
        _unplaceElement : function _unplaceElement() {
            this.el.style.position = '';
            this.el.style.left = '';
            this.el.style.top = '';
            this.el.style.bottom = '';

            this.parentElement.appendChild(this.el);
        },

        /* Activate handler
         * @method _activate <private> [Function]
         */
        _activate : function _activate() {
            Widget.prototype._activate.call(this);

            this._placeElement();
            this.container.appendChild(this.backdropElement);
            // this.container.style.overflow = 'hidden';
        },

        /* Deactivate handler
         * @method <private> [Function]
         */
        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);

            this._unplaceElement();
            this.container.removeChild(this.backdropElement);
            // this.container.style.overflow = '';
        },

        render : function render(element, beforeElement) {
            Widget.prototype.render.call(this, element, beforeElement);

            this.parentElement = this.el.parentElement;

            this.parentElement.classList.add('ui-has-popover');

            return this;
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            this.toggler = null;
            this.container = null;
            this.placement = null;
            this.title = null;
            this.content = null;

            this.el = null;
            this.titleElement = null;
            this.contentElement = null;
            this.backdropElement = null;
            this.parentElement = null;

            return null;
        }
    }
});
