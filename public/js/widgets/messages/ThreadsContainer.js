var API = require('./../../lib/api')
  , Person = require('./../../lib/currentPerson')
  , Events = require('./../../lib/events')
  , KEYCODES = require('./../../lib/keycodes');

CV.ThreadsContainer = Class(CV, 'ThreadsContainer').inherits(Widget)({
    prototype : {
        threads : [],
        listElement : null,
        noMessagesEl : null,
        messagesBodyContainerEl : null,
        messagesContainerEl : null,
        messageListEl : null,
        messagesBodyHeaderEl : null,
        searchUsersResultEl : null,

        currentThread : null,
        unreadMessages : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.listElement = this.element.find('.messages-list');
            this.noMessagesEl = this.element.find('.no-messages');
            this.messagesBodyContainerEl = this.element.find('.messages-body-container');
            this.messagesContainerEl = this.element.find('.messages-container');
            this.messageListEl = this.element.find('.msgs');
            this.messagesBodyHeaderEl = this.element.find('.messages-body-header');
            this.searchUsersResultEl = this.element.find('.search-users-result');
            this.threadListEl = $(document.querySelector('.messages-list'));
            this.sidebarMessagesEl = $('.sidebar-link-messages');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            var container = this;

            this.appendChild(new CV.Input({
                name : 'searchField',
                type : 'search',
                style  : 'small',
                placeholder : 'Search conversations'
            })).render(this.element.find('.messages-search'));

            this.appendChild(new CV.UI.InputButton({
                name : 'replyButton',
                className : '-m0',
                inputData : {
                    inputClassName : '-block -btrr0 -bbrr0',
                    attr : {
                        placeholder: 'Message...'
                    }
                },
                buttonData : {
                    value : 'Reply',
                    className : 'primary small'
                },
            })).render(this.element.find('.message-create'));

            // New Conversation Button
            if (Person.ownsOrganizations()) {
                // Show select widget if currentPerson owns or is member of organizations
                this.newConversationOptions = {};

                this.newConversationOptions[Person.get('id')] = {
                    name : "myself",
                    label: "Myself"
                };

                Person.get('ownedOrganizations').forEach(function(organization) {
                    this.newConversationOptions[organization.id] = {
                        label : organization.name,
                        name : organization.profileName
                    };
                }, this);

                this.newMessageButton = new CV.Select({
                    label : 'New as...',
                    name  : 'newMessageButton',
                    style   : 'small',
                    options: this.newConversationOptions
                }).render($('.messages-new'));

                this.newMessageButton.element.find('li:first-child').bind('click', function() {
                    //console.log('myself');
                    container.newMessageAs($(this).find('> div').attr('data-id'), false, '');
                    return;
                });

                this.newMessageButton.element.find('li:not(:first-child)').bind('click', function() {
                    //console.log('org');
                    container.newMessageAs($(this).find('> div').attr('data-id'), true, $(this).find('> div').text() );
                    return;
                });
            } else {
                // Show normal button
                this.newMessageButton = new CV.UI.Button({
                    name : 'newMessageButton',
                    className : 'small messages-sidebar-header__new-conversation-btn',
                }).render($('.messages-new')).updateHTML('<svg class="-color-primary -s16"><use xlink:href="#svg-new-message"></use></svg>');

                this.newMessageButton.element.on('click', function() {
                    container.newMessageAs(Person.get('id'));
                });
            }

            // Create Thread list
            if (this.threads.length > 0) {
                this.threads.forEach(function(thread) {
                    container.addThread(thread);
                });
            } else {
                this.hideSideBar();
            }

            return this;
        },

        _bindEvents : function _bindEvents() {
            var container = this;

            Events.on(this.replyButton.button.el, 'click', this._sendMessageHandler.bind(this));
            Events.on(this.replyButton.input.el, 'keyup', this._messageInputKeyUpHandler.bind(this));

            this.element.find('a.new-message').on('click', function(){
                container.newMessageAs(Person.get('id'));
                return false;
            });

            this.searchField.element.find('input').on('keyup', function(ev){
                var searchStr = ev.target.value.toLowerCase();
                container.listElement.find('.thread-list-item').each(function() {
                    var _this = $(this)
                      , userStr = _this.text().toLowerCase();
                    if (userStr.indexOf(searchStr) >= 0){
                        _this.show();
                    } else {
                        _this.hide();
                    }
                });
            });

            this.element.find('.search-users').on('keyup', function(){
                var searchStr = $(this).val().toLowerCase();
                var inputSearch = $(this);

                if (searchStr === "") {
                    container.searchUsersResultEl.hide();
                    return false;
                }

                API.searchPeopleToInvite({
                    profileName: Person.get().profileName,
                    data : {query: inputSearch.val()}
                }, function(err, res) {
                    container.showPersons(res);
                });
            });

            this.messagesBodyHeaderEl.find('.delete-thread').on('click', function(){
                container.deleteThread($(this).attr('data-id'));
            });

            return this;
        },

        /* Reply input keyup handler.
         * Checks if the pressed key is ENTER, if so it will call the send
         * message handler, otherwise it will do nothing.
         * @method _messageInputKeyUpHandler <private> [Function]
         * @return undefined
         */
        _messageInputKeyUpHandler : function _messageInputKeyUpHandler(ev) {
            var charCode = (typeof ev.which === 'number') ? ev.which : ev.keyCode;
            if (charCode === KEYCODES.ENTER) {
                this._sendMessageHandler();
            }
        },

        /* Tries to send a new message.
         * Disables the reply button, if the input has text on in it will send
         * it to the current thread or if no thread is currently selected it
         * will create a new thread, otherwise it will just re-enable the
         * reply button.
         * @method _sendMessageHandler <private> [Function]
         * @return undefined
         */
        _sendMessageHandler : function _sendMessageHandler() {
            var message = this.replyButton.input.getValue();
            this.replyButton.button.disable();

            if (!message.trim()) {
                this.replyButton.button.enable();
                return;
            }

            this.replyButton.input.setValue('');

            if (this.currentThreadId) {
                this.postMessage(message);
            } else {
                this.createThread(message);
            }
        },

        /* Creates a new Thread item and renders it on the thread list sidebar.
         * @method addThread <private> [Function]
         * @return undefined
         */
        addThread : function addThread(threadData) {
            var container = this;

            var thread = new CV.Thread({
                name : 'thread_' + threadData.id,
                data : threadData
            });

            this.appendChild(thread);

            thread.bind('updated', function(){
                container.unreadMessages -= this.unreadCount;
            });

            thread.bind('activate', function(){
                setTimeout(function() {
                    container.replyButton.focus();
                }, 0);
            });

            thread.threadContainer = this;
            thread.setup();

            thread.render(this.listElement);

            this.unreadMessages += threadData.unreadCount;

            this.refresh();
        },

        /* Removes a Thread item from the thread list sidebar.
         * @method deleteThread <private> [Function]
         * @return undefined
         */
        deleteThread : function deleteThread(threadId) {
            var container = this;

            var deleteThreadUrl = '/' + Person.get('profileName') + '/messages/' + threadId;

            $.ajax({
                type: "DELETE",
                url: deleteThreadUrl,
                headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
                success: function() {
                    console.log('Thread deleted');
                }
            });

            this['thread_' + threadId].destroy();

            if (this.listElement.find('.thread-list-item').length === 0){
                container.hideSideBar();
            } else {
                container.showSideBar();
            }

            container.showUnselectedScreen();
        },

        /* Deactivate the thread list items.
         * Display the compose message view.
         * @method newMessageAs <private> [Function]
         */
        newMessageAs : function newMessageAs(entityId, isOrganization, orgName) {
            // set the senderEntityId so it can be accessible by other functions
            this.listElement.find('.thread-list-item').removeClass('active');

            this.senderEntityId = entityId;
            this.senderEntityIsOrg = isOrganization;
            this.senderEntityOrgName = orgName;

            this.noMessagesEl.hide();
            this.messagesContainerEl.hide();
            this.messagesBodyContainerEl.addClass('active');
            this.messagesBodyHeaderEl.find('.m-action').hide();
            this.messagesBodyHeaderEl.find('.m-new').show();
            this.messagesBodyHeaderEl.find('.m-new').find('input').focus();
            this.messageListEl.empty();
            this.refresh();
        },

        /* Hides the sidebar and display the onboarding message.
         */
        hideSideBar : function hideSideBar() {
            var container = this;

            this.element.addClass('no-sidebar');

            var messageText = 'To contact a user, message them on their profile card when rolling over their avatar or message them from their profile page. You can also <a href="#" class="new-message">compose a new message here</a> and search for the user you wish to contact.';

            this.noMessagesEl.find('.no-messages__inner').prepend('<h1>You have no messages.</h1>');
            this.noMessagesEl.find('p').html(messageText);

            this.noMessagesEl.find('a.new-message').on('click', function(){
                container.newMessageAs();
            });

        },

        /* Display the sidebar.
         */
        showSideBar : function showSideBar(){
            var container = this;
            var messageText = 'Please select a thread from the list on the left or <a href="#" class="new-message">compose a new message</a>.';

            this.noMessagesEl.find('h1').remove();
            this.noMessagesEl.find('p').html(messageText);

            this.element.find('a.new-message').on('click', function(){
                container.newMessageAs();
            });

            this.element.removeClass('no-sidebar');
            this.refresh();

        },

        showSelectedScreen : function showSelectedScreen (){
            this.noMessagesEl.hide();
            this.messagesContainerEl.hide();
            this.messagesBodyContainerEl.addClass('active');
            this.messagesBodyHeaderEl.find('.m-action').hide();
            this.messagesBodyHeaderEl.find('.m-new').show();
            this.messageListEl.empty();
            this.refresh();
        },

        showUnselectedScreen : function showUnselectedScreen (){
            this.noMessagesEl.show();
            this.messagesContainerEl.show();
            this.messagesBodyContainerEl.removeClass('active');
            this.messagesBodyHeaderEl.find('.m-action').show();
            this.messagesBodyHeaderEl.find('.m-new').hide();
            this.refresh();
        },

        showPersons : function showPersons(persons) {
            var container = this;

            this.searchUsersResultEl.empty();
            this.searchUsersResultEl.show();

            persons.forEach(function(person) {
                if (person.isAnonymous === false) {
                    var userStr = person.name;

                    var liStr = $('<li data-partner-id="' + person.id + '" data-partner-name="' + userStr + '">' + userStr + '</li>');

                    liStr.on('click', function(){
                        var receiverEntityId = $(this).attr('data-partner-id');
                        var senderEntityId = container.senderEntityId;
                        var listElement;

                        container.searchUsersResultEl.empty();
                        container.searchUsersResultEl.hide();
                        $('.search-users').val("");

                        if (container.isOnThreadList(receiverEntityId)) {
                            if (container.senderEntityIsOrg) {
                                listElement = container.threadListEl.find("[data-partner-id='" + receiverEntityId + "'][data-sender-id='" + senderEntityId + "'][is-organization='true']");

                                if (listElement.length) {
                                    return listElement.click();
                                }
                            } else {
                                listElement = container.threadListEl.find("[data-partner-id='" + receiverEntityId + "'][data-sender-id='" + senderEntityId + "'][is-organization='false']");

                                if (listElement.length) {
                                    return listElement.click();
                                }
                            }
                        }

                        container.showNewThreadScreen(this.dataset.partnerId, this.dataset.partnerName);
                        // set the receiverEntityId in the threadsContainer so it can be accessible by other functions
                        container.receiverEntityId = receiverEntityId;

                        container.searchUsersResultEl.hide();
                    });

                    container.searchUsersResultEl.append(liStr);

                }
            });
        },

        showNewThreadScreen :  function showNewThreadScreen (otherPersonID, otherPersonName){
            this.messagesBodyHeaderEl.find('.m-action').show();
            this.messagesBodyHeaderEl.find('.m-new').hide();
            this.currentThreadId = null;

            if (this.senderEntityIsOrg ){
                this.messagesBodyHeaderEl.find('span.conversation-title').text('Conversation with ' + otherPersonName);
            } else {
                this.messagesBodyHeaderEl.find('span.conversation-title').text('Conversation with ' + otherPersonName);
            }

            this.messagesBodyHeaderEl.find('.delete-thread').hide();
            this.messagesContainerEl.show();
            this.refresh();
            this.replyButton.focus();
            return this;
        },

        isOnThreadList : function isOnThreadList(partnerId) {
            var container = this;

            var foundIt = false;

            container.listElement.find('.thread-list-item').each(function() {
                //this.senderEntityIsOrg
                //console.log($(this).attr('is-organization'));
                if (container.senderEntityIsOrg){
                    if ($(this).attr('data-partner-id') === partnerId && $(this).attr('is-organization')){
                        foundIt = true;
                    }
                } else {
                    if ($(this).attr('data-partner-id') === partnerId){
                        foundIt = true;
                    }
                }

            });

            return foundIt;
        },

        createThread : function createThread(message) {
            var container = this;

            if (!message) {
                console.warn('message is required.');
                return this.replyButton.button.enable();
            }

            API.sendMessage({
                profileName : Person.get('profileName'),
                data : {
                    type : 'message',
                    senderEntityId : container.senderEntityId,
                    receiverEntityId : container.receiverEntityId,
                    message : message
                }
            }, function(err, res) {
                container.currentThreadId = res.id;
                container.addThread(res);
                container.showSideBar();
                container.threadListEl.find("[id='" + container.currentThreadId + "']").click();
                container.replyButton.button.enable();
             });
        },

        postMessage : function postMessage(message) {
            var container = this;

            if (!message) {
                console.warn('message is required.');
                return this.replyButton.button.enable();
            }

            API.sendMessageToThread({
                profileName : Person.get('profileName'),
                threadId : container.currentThreadId,
                data : {message : message}
            }, function(err, res) {
                if (err) {
                    console.log(res);
                    return;
                }

                var thread = container['thread_' + container.currentThreadId];

                thread.appendChild(new CV.Message({
                    name : 'message_' + res.id,
                    type : 'message',
                    data : res
                })).setup().render(container.messageListEl);

                thread.data.messages.push(res);

                thread.updateLastMessage();

                container.replyButton.button.enable();
                container.refresh();
            });
        },

        refresh : function refresh() {
            var height = $('.messages-conversation > .msgs').height();
            $('.messages-conversation').scrollTop(height);
        }
    }
});
