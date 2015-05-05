Class(CV, 'Popover').inherits(Widget)({
    HTML : '\
    <div class="ui-popover">\
        <div class="popover-title"></div>\
        <div class="popover-content"></div>\
    </div>\
    ',

    CONTAINER_CLASSNAME : 'ui-has-popover',
    PLACEMENT_CLASSNAMES : {
        top: '-top',
        topleft: '-top-left'
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

            this.container.classList.add(this.constructor.CONTAINER_CLASSNAME);
            this.el.classList.add(this.constructor.PLACEMENT_CLASSNAMES[this.placement]);

            this.contentElement.insertAdjacentHTML('afterbegin', this.content);

            this.toggler.addEventListener('click', this.toggle.bind(this), false);
        },

        getContent : function getContent() {
            return this.contentElement;
        },

        setContent : function setContent(htmlString) {
            this.contentElement.innerHTML = "";
            this.contentElement.insertAdjacentHTML('afterbegin', htmlString);

            return this;
        },

        toggle : function toggle() {
            this.active ? this.deactivate() : this.activate();

            return this;
        },

        render : function render() {
            if (this.__destroyed === true) {
                console.warn('calling on destroyed object');
            }

            this.dispatch('beforeRender');

            this.container.appendChild(this.el);

            this.dispatch('render');

            return this;
        }
    }
});