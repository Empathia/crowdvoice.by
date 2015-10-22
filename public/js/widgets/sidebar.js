Class(CV, 'Sidebar').inherits(Widget)({

    IS_EXPANDED_CLASSNAME : '-is-expanded',
    IS_PAUSED_CLASSNAME : '-is-paused',

    prototype : {

        el : null,
        linkElements : null,
        _yield : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element;
            this.linkElements = [].slice.call(this.el.querySelectorAll('.sidebar-link'), 0);
            this._yield = document.body.querySelector('.app-wrapper');

            this.messageLinkContainer = this.el.querySelector('.sidebar-link-messages');
            this.sidebarUnreadMessagesEl = this.messageLinkContainer.querySelector('.unread');

            this._checkAndActivateCurrentLink();
        },

        /* Make the sidebar expand/collapse on :hover
         * @method enableInteraction <public> [Function]
         */
        enableInteraction : function enableInteraction() {
            this._bindEvents();
        },

        _checkAndActivateCurrentLink : function _checkAndActivateCurrentLink() {
            var pathname = window.location.pathname;

            this.linkElements.some(function(link) {
                if (link.getAttribute('href') === pathname) {
                    link.classList.add('active');
                    return true;
                }
            });

            return this;
        },

        setup : function setup(){
            var socket = App.getSocket();

            setInterval(function() {
                socket.emit('getUnreadMessagesCount');
            }, 1000);

            socket.on('unreadMessagesCount', function(data) {
                this._updateSidebarCount(data);
            }.bind(this));
        },

        _updateSidebarCount : function _updateSidebarCount(data) {
            /* 
            * Adds the unread message notification icon for the sidebar
            */
            var containerClass = this.messageLinkContainer.className;
            var unreadValueContainer = this.sidebarUnreadMessagesEl.querySelector('.sidebar-link-badge');
            var containerActive = false;
            var dataCache;

            if(data > 0){
                if (containerActive === false){
                    this.messageLinkContainer.className = this.messageLinkContainer.className + ' unreadActive';
                    unreadValueContainer.innerHTML = data;
                    containerActive = true;
                    dataCache = data;
                }

                if(dataCache < data || dataCache > data){
                    unreadValueContainer.textContent = data;
                    dataCache = data;
                }
            } else {
                this.messageLinkContainer.className = containerClass;
                containerActive = false;
                dataCache = null;
            }
        },

        _bindEvents : function _bindEvents() {
            this._mouseEnterHandlerRef = this._mouseEnterHandler.bind(this);
            this.el.addEventListener('mouseenter', this._mouseEnterHandlerRef);

            this._mouseLeaveHandlerRef = this._mouseLeaveHandler.bind(this);
            this.el.addEventListener('mouseleave', this._mouseLeaveHandlerRef);
        },

        _mouseEnterHandler : function _mouseEnterHandler() {
            this._yield.classList.add(this.constructor.IS_PAUSED_CLASSNAME);
            this.el.classList.add(this.constructor.IS_EXPANDED_CLASSNAME);
        },

        _mouseLeaveHandler : function _mouseLeaveHandler() {
            this._yield.classList.remove(this.constructor.IS_PAUSED_CLASSNAME);
            this.el.classList.remove(this.constructor.IS_EXPANDED_CLASSNAME);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            if (this._mouseEnterHandlerRef) {
                this.el.removeEventListener('mouseenter', this._mouseEnterHandlerRef);
                this._mouseEnterHandlerRef = null;
            }

            if (this._mouseLeaveHandlerRef) {
                this.el.removeEventListener('mouseleave', this._mouseLeaveHandlerRef);
                this._mouseLeaveHandlerRef = null;
            }

            this.el = null;
            this.linkElements = null;
            this._yield = null;

            return null;
        }
    }
});
