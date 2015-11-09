/* jshint multistr: true */
/* @class CV.Popover – Add small overlays of content
 *
 * @options
 * placement [String] (top) top|right|bottom|left
 * toggler <required> [HTMLElement] (null) The element that will show/hide the popover upon click
 * container <required> [HTMLElement] (null) The element to append the popover
 * content <required> [HTMLString] ('') Popover content
 *
 * @usage
 *  new CV.Popover({
        toggler: document.querySelector('.button'),
        container: document.querySelector('.container'),
        content: '<h1>Hello</h1>'
    }).render();
 */
Class(CV, 'Popover').inherits(Widget)({
    HTML : '\
    <div class="ui-popover">\
        <div class="popover-title"></div>\
        <div class="popover-content"></div>\
    </div>\
    ',

    CONTAINER_CLASSNAME : 'ui-has-popover',
    PLACEMENT_CLASSNAMES : {
        top     : '-top',
        right   : '-right',
        bottom  : '-bottom',
        left    : '-left'
    },

    prototype : {
        /* options */
        placement: 'top',
        toggler: null,
        container: null,
        title: '',
        content: '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.titleElement = this.el.querySelector('.popover-title');
            this.contentElement = this.el.querySelector('.popover-content');

            this.titleElement.textContent = this.title;

            this.container.classList.add(this.constructor.CONTAINER_CLASSNAME);
            this.el.classList.add(this.constructor.PLACEMENT_CLASSNAMES[this.placement] || this.constructor.PLACEMENT_CLASSNAMES.top);

            this.contentElement.insertAdjacentHTML('afterbegin', this.content);

            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this.togglerRef = this.toggle.bind(this);
            this.toggler.addEventListener('click', this.togglerRef, false); 
        },

        /* Returns the `popover-content` element
         * @method getContent <public> [Function]
         * @return this.contentElement [HTMLElement]
         */
        getContent : function getContent() {
            return this.contentElement;
        },

        /* Replaces the HTML of `popover-content` element
         * @method setContent <public> [Function]
         * @param htmlString <required> [HTMLString] the new content for `popover-content` element
         * @return this [CV.Popover]
         */
        setContent : function setContent(htmlString) {
            this.contentElement.innerHTML = "";
            this.contentElement.insertAdjacentHTML('afterbegin', htmlString);

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

        /* Overrides Widget.prototype.render. Appends the popover to this.container
         * @method render <public> [Function]
         * @return this [CV.Popover]
         */
        render : function render() {
            if (this.__destroyed === true) {
                console.warn('calling on destroyed object');
            }
            this.dispatch('beforeRender');

            this.container.appendChild(this.el);

            this.dispatch('render');

            return this;
        },

        destroy : function destroy(){
            Widget.prototype.destroy.call(this);

            this.toggler.removeEventListener('click', this.togglerRef);
            this.togglerRef = null;

            return null;
        }
    }
});
