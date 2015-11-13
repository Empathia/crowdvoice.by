/* socketStart() => starts the socketio connection
 * getSocket() => returns the socketio instance
 * addInteractiveSidebar() => made the Sidebar listen to mouse events to show/hide itself
 */
/* global io */

var Person = require('./lib/currentPerson');
var Topics = require('./lib/registers/Topics');

Class(CV, 'App').includes(NodeSupport)({
    prototype : {
        notifications : null,

        _socket : null,
        _scrollableElement : null,

        /* Updates currentPerson Registry
         * Fetch Topics and updates the Topics Registry
         * Starts the Header widget so it can update itself
         * Starts the Sidebar window so it can update itself
         */
        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            Person.set(window.currentPerson);
            Topics.fetch();

            this._scrollableElement = document.body;
        },

        setup : function setup() {
            window.CardHoverWidget = new CV.CardHover().render(document.body);

            this.appendChild(new CV.Header({
                name : 'header',
                element: $('.cv-main-header')
            })).setup();

            this.appendChild( new CV.Sidebar({
                name : 'sidebar',
                element : document.getElementsByClassName('cv-main-sidebar')[0]
            }));

            return this;
        },

        /* Start socketio connection
         * @method socketStart <public> [Function]
         * @return CV.App [Object]
         */
        socketStart : function socketStart() {
            if (!this._socket) {
                this._socket = io(window.location.origin, {
                  'reconnection': true,
                  'reconnectionDelay': 1000,
                  'reconnectionDelayMax' : 5000,
                  'reconnectionAttempts': 5
                });
            }
            return this;
        },

        /* Return the socketio instance
         * @method getSocket <public> [Function]
         * @return this._socket
         */
        getSocket : function getSocket() {
            if (this._socket) {
                return this._socket;
            }

            this.socketStart();
            return this.getSocket();
        },

        /* Make the sidebar interactive, expand on :hover.
         * @method addInteractiveSidebar <public> [Function]
         * @return CV.App [Object]
         */
        addInteractiveSidebar : function addInteractiveSidebar() {
            this.sidebar.enableInteraction();
            this.sidebar.setup();
            return this;
        },

        /* Returns the scrollable element for the main content.
         * This method can be useful to get properties or run methods for the
         * scrollable area. ex. scrollTop = 0, after showing an alert message.
         * @method getScrollableElement <public> [Function]
         */
        getScrollableElement : function getScrollableElement() {
            return this._scrollableElement;
        },

        /* @method scrollTo <public> [Function]
         * @return undefined
         */
        scrollTo : function scrollTo(y) {
            this.getScrollableElement().scrollTop = y;
        },

        _bodyOverflowValuesIndex: -1,
        _bodyOverflowValues: [],

        hideScrollbar : function hideScrollbar() {
            this._bodyOverflowValues.push(this.getBodyOverflowValue());
            this._bodyOverflowValuesIndex++;
            this.getScrollableElement().style.overflow = 'hidden';
        },

        showScrollbar : function showScrollbar() {
            this.getScrollableElement().style.overflow = this._bodyOverflowValues[this._bodyOverflowValuesIndex];
            this._bodyOverflowValuesIndex--;
            this._bodyOverflowValues.pop();
        },

        getBodyOverflowValue : function getBodyOverflowValue() {
            return window.getComputedStyle(this.getScrollableElement(), null)
                .getPropertyValue('overflow');
        },

        /* Display the CreateVoiceModal.
         * @method showCreateVoiceModal <public> [Function]
         */
        showCreateVoiceModal : function showCreateVoiceModal(config) {
            if (!Person.get()) {
                throw new Error('Not autorized to perform this action.');
            }

            var modalLabel = 'Create a Voice';

            if (config.voiceEntity) {
                modalLabel = 'Update Voice';
            }

            this.appendChild(new CV.UI.Modal({
                title : modalLabel,
                name : 'createAVoiceModal',
                action : CV.CreateVoice,
                width : 960,
                data : {
                    voiceEntity : config.voiceEntity,
                    ownerEntity: config.ownerEntity
                },
                isAdmin : config.isAdmin
            })).render(config.renderTo || document.body);

            requestAnimationFrame(function() {
                this.createAVoiceModal.activate();
            }.bind(this));
        },

        /* Display the CreateOrganizationModal.
         * @method showCreateOrganizationModal <public> [Function]
         */
        showCreateOrganizationModal : function showCreateOrganizationModal() {
            if (!Person.get()) {
                throw new Error('Not autorized to perform this action.');
            }

            this.appendChild(new CV.UI.Modal({
                title : 'Create an Organization',
                name : 'createAnOrganizationModal',
                action : CV.CreateOrganization,
                width : 540,
            })).render(document.body);

            requestAnimationFrame(function() {
                this.createAnOrganizationModal.activate();
            }.bind(this));
        }
    }
});
