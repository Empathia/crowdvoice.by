/* global io */

var Person = require('./lib/currentPerson');

Class(CV, 'App').includes(NodeSupport)({
    prototype : {
        notifications : null,

        _socket : null,

        init : function init(config) {
            this.notifications = [];

            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            Person.set(window.currentPerson);

            this.appendChild(
                new CV.Header({
                    name : 'header',
                    element: $('.cv-main-header')
                })
            );

            this.appendChild(
                new CV.Sidebar({
                    name : 'sidebar',
                    element : document.getElementsByClassName('cv-main-sidebar')[0]
                })
            );

            new CV.NotificationsManager({
                notifications : this.notifications
            }).render(document.body);
        },

        /* Start socketio connection
         * @method socketStart <public> [Function]
         * @return CV.App [Object]
         */
        socketStart : function socketStart() {
            this._socket = io();
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
         * @method addInteractiveSidebar <punlic> [Function]
         * @return CV.App [Object]
         */
        addInteractiveSidebar : function addInteractiveSidebar() {
            this.sidebar.enableInteraction();
            return this;
        }
    }
});
