var Person = require('./../../lib/currentPerson');
var PLACEHOLDERS = require('./../../lib/placeholders');

CV.Thread = Class(CV, 'Thread').includes(Widget)({
  HTML : '\
    <div class="thread-list-item -rel -clearfix">\
      <img class="thread-list-item__avatar-partner -abs" src="/img/sample/avatars/org-06.png">\
      <img class="thread-list-item__avatar-sender -abs" src="/img/sample/avatars/org-06.png">\
      <div class="message-info">\
        <h3 class="-font-normal"></h3>\
        <span class="thread-type -ellipsis"></span>\
      </div>\
      <div class="actions">\
        <span></span>\
      </div>\
    </div>',

  prototype : {
    data : {},
    threadPartner     : null,
    threadPartnerName : null,
    unreadCount       : 0,

    setup : function setup() {
      var thread = this;
      var senderOrReceiver = this.isSenderOrReceiver();

      this.unreadCount = thread.data.unreadCount;

      if (senderOrReceiver === 'sender') {
        this.threadPartner = thread.data.receiverEntity;
        this.threadSender = thread.data.senderEntity;
      } else {
        this.threadPartner = thread.data.senderEntity;
        this.threadSender = thread.data.receiverEntity;
      }

      this.element.attr('id', thread.data.id);
      this.element.attr('data-partner-id', this.threadPartner.id);
      this.element.attr('data-sender-id', this.threadSender.id);

      this.threadPartnerName = this.threadPartner.name;

      this.element.find('h3').text(this.threadPartnerName);

      if (this.threadPartner.images.small) {
        this.element.find('.thread-list-item__avatar-partner').attr('src', this.threadPartner.images.small.url);
      } else {
        this.element.find('.thread-list-item__avatar-partner').attr('src', PLACEHOLDERS.small);
      }

      if (this.threadSender.type === "person") {
        this.element.attr('is-organization', 'false');
        this.element.find('.thread-list-item__avatar-sender').remove();
        this.element.find('.thread-type').text('As Myself');
      } else {
        this.element.attr('is-organization', 'true');
        this.element.find('.thread-list-item__avatar-sender').attr('src', this.threadSender.images.notification.url);
        this.element.find('.thread-type').text('As '+ this.threadSender.name);
      }

      if (thread.data.unreadCount > 0) {
        this.element.find('.actions span').text(thread.data.unreadCount);
      } else {
        this.element.addClass('updated');
      }

      this.element.on('click', function(){
        thread.element.parent().find('.thread-list-item').removeClass('active');
        thread.element.addClass('active');
        thread.activate();
        return;
      });

      return this;
    },

    _activate : function _activate() {
      var thread = this;
      window.location.hash = thread.data.id;

      thread.threadContainer.currentThreadId = thread.data.id;

      thread.threadContainer.noMessagesEl.hide();
      thread.threadContainer.messagesBodyContainerEl.addClass('active');

      thread.threadContainer.messagesContainerEl.show();
      thread.threadContainer.messageListEl.empty();

      thread.threadContainer.messagesBodyHeaderEl.find('.m-action').show();
      thread.threadContainer.messagesBodyHeaderEl.find('.m-new').hide();

      if(this.element.attr('is-organization') === 'true'){
        thread.threadContainer.messagesBodyHeaderEl.find('span.conversation-title').text('Conversation with ' + this.threadPartnerName);
      } else {
        thread.threadContainer.messagesBodyHeaderEl.find('span.conversation-title').text('Conversation with ' + this.threadPartnerName);
      }

      thread.threadContainer.messagesBodyHeaderEl.find('.delete-thread').show().attr('data-id', this.data.id);

      var updateThreadUrl = '/'+ Person.get('profileName') + '/messages/'+ thread.data.id;

      $.ajax({
        type: "PUT",
        url: updateThreadUrl,
        headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
        success: function() {
          if (!thread.element.hasClass('updated')){
            thread.element.addClass('updated');
          }
          thread.element.find('.actions span').text('0');
          thread.dispatch('updated');
        }
      });

      thread.data.messages.sort(function(a, b) {
          if (a.createdAt < b.createdAt) {
              return -1;
          }

          if (a.createdAt > b.createdAt) {
            return 1;
          }

          return 0;
      }).forEach(function(message) {
          var messageInstance = new CV.Message({
          name : 'message_' + message.id,
          type : message.type,
          data : message
        });

        thread.appendChild(messageInstance);

        messageInstance.thread = thread;
        messageInstance.threadContainer = thread.threadContainer;

        messageInstance.setup();

        messageInstance.render(thread.threadContainer.messageListEl);
      });

      this.threadContainer.refresh();
      this.active = true;

      return this;
    },

    isSenderOrReceiver : function isSenderOrReceiver() {
      if ((Person.is(this.data.senderEntity.id)) ||
          (Person.ownerOf('organization', this.data.senderEntity.id))) {
        return 'sender';
      }
      return 'receiver';
    }
  }
});
