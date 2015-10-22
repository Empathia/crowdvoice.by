var Person = require('./../../lib/currentPerson');

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

      var container = this;
      this.listElement = this.element.find('.messages-list');
      this.noMessagesEl = this.element.find('.no-messages');
      this.messagesBodyContainerEl = this.element.find('.messages-body-container');
      this.messagesContainerEl = this.element.find('.messages-container');
      this.messageListEl = this.element.find('.unread');
      this.messagesBodyHeaderEl = this.element.find('.messages-body-header');
      this.searchUsersResultEl = this.element.find('.search-users-result');

      this.sidebarMessagesEl = $('.sidebar-link-messages');

      this.searchField = new CV.Input({
        name : 'searchField',
        type    : 'search',
        style     : 'small',
        placeholder : 'Filter'
      }).render(this.element.find('.messages-search'));

      this.replyButton = new CV.InputButton({
          name        : 'replyButton',
          style       : 'primary',
          isArea      : true,
          buttonLabel : 'Reply'
      }).render(this.element.find('.message-create'));
      //console.log(this.replyButton);

      // New Conversation Button
      if (this.currentPerson.organizations.length > 0) {
        // Show select widget if currentPerson owns or is member of organizations
        this.newConversationOptions = {};

        this.newConversationOptions[this.currentPerson.id] = {
          name : "myself",
          label: "Myself"
        };

        this.currentPerson.organizations.forEach(function(organization) {
          container.newConversationOptions[organization.id] = {
            label : organization.name,
            name : organization.profileName
          };
        });

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
        this.newMessageButton = new CV.Button({
          name    : 'newMessageButton',
          style   : 'primary small',
          type    : 'single',
          label   : 'New Conversation',
        }).render($('.profile-messages-intro'));

        this.newMessageButton.element.on('click', function() {
          container.newMessageAs(container.currentPerson.id);
        });
      }

      // Create Thread list
      if (this.threads.length > 0) {
        this.threads.forEach(function(thread) {
          container.addThread(thread);
        });

        this.updateSidebarCount();

      } else {
        this.hideSideBar();
      }

      this.setup();
    },

    setup : function setup() {
      var container = this;

      this.replyButton.buttonEl.on('click', function(){
        if (container.currentThreadId) {
          container.postMessage();
        } else {
          //console.log('createThread');
          container.createThread();
        }
      });

      this.element.find('a.new-message').on('click', function(){
        container.newMessageAs(container.currentPerson.id);
        return false;
      });

      this.searchField.element.find('input').on('keyup', function(ev){
        var searchStr = ev.target.value.toLowerCase();
        container.listElement.find('.message-side').each(function() {

          var userStr = $(this).find('h3').text().toLowerCase();

          if (userStr.indexOf(searchStr) >= 0){
            $(this).show();
          } else {
            $(this).hide();
          }

        });
      });

      this.element.find('.search-users').on('keyup', function(){
        var searchStr = $(this).val().toLowerCase();
        var inputSearch = $(this);

        if (searchStr === "") {
          searchUsersResultEl.hide();
          return false;
        }

        $.ajax({
          type: "POST",
          url:'/' + Person.get().profileName + '/messages/searchPeople',
          headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
          data : {value : inputSearch.val()},
          success: function(data) {
            container.showPersons(data);
          }
        });

      });

      this.messagesBodyHeaderEl.find('.delete-thread').on('click', function(){
        container.deleteThread($(this).attr('data-id'));
      });
    },

    updateSidebarCount : function updateSidebarCount() {
      if(this.unreadMessages > 0){
        console.log(this.sidebarMessagesEl);
        this.sidebarMessagesEl.addClass('has-messages');
        this.sidebarMessagesEl.find('.sidebar-link-badge').text(this.unreadMessages);
      } else {
        this.sidebarMessagesEl.removeClass('has-messages');
      }

    },

    addThread : function addThread(threadData) {
      var container = this;

      //console.log(threadData);

      var thread = new CV.Thread({
        name : 'thread_' + threadData.id,
        data : threadData
      });

      this.appendChild(thread);

      thread.bind('updated', function(){
        container.unreadMessages -= this.unreadCount;

        container.updateSidebarCount();
      });

      thread.threadContainer = this;
      thread.setup();

      thread.render(this.listElement);

      this.unreadMessages += threadData.unreadCount;

      this.refresh();
    },

    deleteThread : function deleteThread(threadId) {
      var container = this;

      var deleteThreadUrl = '/' + this.currentPerson.profileName + '/messages/' + threadId;

      $.ajax({
        type: "DELETE",
        url: deleteThreadUrl,
        headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
        success: function() {
          console.log('Thread deleted');
        }
      });

      this['thread_' + threadId].destroy();

      // this.listElement.find('#'+threadId).remove();

      if (this.listElement.find('.message-side').length === 0){
        container.hideSideBar();
        container.showUnselectedScreen();

      }else{
        container.showSideBar();
        container.showUnselectedScreen();
      }
    },

    newMessageAs : function newMessageAs(entityId, isOrganization, orgName) {
      // set the senderEntityId so it can be accessible by other functions
      this.listElement.find('.message-side').removeClass('active');

      this.senderEntityId = entityId;
      this.senderEntityIsOrg = isOrganization;
      console.log(this.senderEntityIsOrg);

      this.senderEntityOrgName = orgName;

      this.noMessagesEl.hide();
      this.messagesContainerEl.hide();
      this.messagesBodyContainerEl.addClass('active');
      this.messagesBodyHeaderEl.find('.m-action').hide();
      this.messagesBodyHeaderEl.find('.m-new').show();
      this.messagesBodyHeaderEl.find('.m-new').find('textarea').focus();
      this.messageListEl.empty();
      this.refresh();
    },

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
          var userStr = person.name + ' ' + person.lastname;

          var liStr = $('<li data-partner-id="' + person.id + '" data-partner-name="' + userStr + '">' + userStr + '</li>');

          liStr.on('click', function(){
            var receiverEntityId = $(this).attr('data-partner-id');

            container.searchUsersResultEl.empty();
            container.searchUsersResultEl.hide();
            $('.search-users').val("");

            if (container.isOnThreadList(receiverEntityId)) {
              console.log(container.senderEntityIsOrg);
              if (container.senderEntityIsOrg ){
                console.log('is');

                console.log(threadListEl.find("[data-partner-id='" + receiverEntityId + "'][is-organization='true']"));
                threadListEl.find("[data-partner-id='" + receiverEntityId + "'][is-organization='true']").click();
              } else {
                console.log('not');

                console.log($('body').find("[data-partner-id='" + receiverEntityId + "'][is-organization='false']"));
                threadListEl.find("[data-partner-id='" + receiverEntityId + "'][is-organization='false']").click();
              }
              return;

            } else {
              container.showNewThreadScreen($(this).attr('data-partner-id'), $(this).attr('data-partner-name'));
            }

            // set the receiverEntityId in the threadsContainer so it can be accessible by other functions
            container.receiverEntityId = receiverEntityId;

            container.searchUsersResultEl.hide();
          });

          container.searchUsersResultEl.append(liStr);

        }
      });
    },

    showNewThreadScreen :  function showNewThreadScreen (otherPersonID, otherPersonName){
      //console.log(otherPersonID);
      this.messagesBodyHeaderEl.find('.m-action').show();
      this.messagesBodyHeaderEl.find('.m-new').hide();
      this.currentThreadId = null;

      if (this.senderEntityIsOrg ){
        this.messagesBodyHeaderEl.find('span.conversation-title').html('Conversation with ' +
          otherPersonName +
          ' <span>- As an Organization (<b>'+ this.senderEntityOrgName +'<b>)</span>');
      } else {
        this.messagesBodyHeaderEl.find('span.conversation-title').text('Conversation with ' + otherPersonName);
      }

      this.messagesBodyHeaderEl.find('.delete-thread').hide();
      this.messagesContainerEl.show();
      this.refresh();
      return this;
    },

    isOnThreadList : function isOnThreadList(partnerId) {
      var container = this;

      var foundIt = false;

      container.listElement.find('.message-side').each(function() {
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

    createThread : function createThread() {
      var container = this;
      console.log(container);
      var postMessageUrl = '/'+ container.currentPerson.profileName + '/messages';
      console.log('postMessageUrl: ' + postMessageUrl);
      console.log('senderEntityId: ' + container.senderEntityId);
      console.log('receiverEntityId: ' + container.receiverEntityId);
      $.ajax({
        type: "POST",
        url: postMessageUrl,
        headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
        data: {
          message : container.element.find('.message-create textarea').val(),
          senderEntityId : container.senderEntityId,
          receiverEntityId : container.receiverEntityId
        },
        success: function(data) {
          container.element.find('.message-create textarea').value = "";
          container.currentThreadId = data.id;
          container.addThread(data);
          container.showSideBar();
          //postMessage();
          threadListEl.find("[id='" + container.currentThreadId + "']").click();

          //console.log(data);
        }
      });
    },

    postMessage : function postMessage(){
      var container = this;

      var postMessageUrl = '/'+ container.currentPerson.profileName + '/messages/'+ container.currentThreadId;

      $.ajax({
        type: "POST",
        url: postMessageUrl,
          headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
          data: { message : container.element.find('.message-create textarea').val()},
          success: function(data) {
            container.element.find('.message-create textarea').val('');

            var messageInstance = new CV.Message({
              type : 'message',
              data : data
            });

            var thread = container['thread_' + container.currentThreadId];

            thread.appendChild(messageInstance);

            thread.data.messages.push(data);

            messageInstance.setup();

            messageInstance.render(container.messageListEl);

            container.refresh();

          }
        });
    },

    refresh : function refresh() {
      var height = $('.messages-conversation > .msgs').height();
      $('.messages-conversation').scrollTop(height);
    }
  }
});
