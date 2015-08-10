/* socketStart() => starts the socketio connection
 * getSocket() => returns the socketio instance
 * addInteractiveSidebar() => made the Sidebar listen to mouse events to show/hide itself
 */
/* global io */

var Person = require('./lib/currentPerson');
var Topics = require('./lib/registers/topics');

Class(CV, 'App').includes(NodeSupport)({
    prototype : {
        notifications : null,

        _socket : null,

        /* Updates currentPerson Registry
         * Fetch Topics and updates the Topics Registry
         * Starts the Header widget so it can update itself
         * Starts the Sidebar window so it can update itself
         */
        init : function init(config) {
            this.notifications = [];

            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            Person.set(window.currentPerson);
            Topics.fetch();

            this.appendChild(new CV.Header({
                name : 'header',
                element: $('.cv-main-header')
            }));

            this.appendChild( new CV.Sidebar({
                name : 'sidebar',
                element : document.getElementsByClassName('cv-main-sidebar')[0]
            }));

            new CV.NotificationsManager({
                notifications : this.notifications
            }).render(document.body);
        },

        /* Start socketio connection
         * @method socketStart <public> [Function]
         * @return CV.App [Object]
         */
        socketStart : function socketStart() {
            if (!this._socket) {
                this._socket = io();
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
            return this;
        },

        /* Display the CreateVoiceModal.
         * @method showCreateVoiceModal <public> [Function]
         */
        showCreateVoiceModal : function showCreateVoiceModal(voiceEntity) {
            if (!Person.get()) {
                throw new Error('Not autorized to perform this action.');
            }

            this.appendChild(new CV.UI.Modal({
                title : 'Create a Voice',
                name : 'createAVoiceModal',
                action : CV.CreateVoice,
                width : 960,
                data : voiceEntity
            })).render(document.body);

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
