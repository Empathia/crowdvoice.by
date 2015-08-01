CV.Thread = Class(CV, 'Thread').includes(Widget)({
  HTML : '<div class="message-side">\
            <div class="message-info">\
            <img class="" src="/img/sample/avatars/org-06.png" alt="">\
              <h3></h3>\
              <span class="thread-type"></span>\
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

    init : function init(config) {
      Widget.prototype.init.call(this, config);

      var thread = this;
    },

    setup : function setup() {
      var thread = this;

      var senderOrReceiver = this.isSenderOrReceiver(thread.parent.currentPerson);

      this.unreadCount = thread.data.unreadCount;

      if (senderOrReceiver === 'sender') {
        this.threadPartner = thread.data.receiverEntity;
      } else {
        this.threadPartner = thread.data.senderEntity;
      }

      if (thread.data.receiverEntity.id !== thread.parent.currentPerson.id ){
        threadPartner = thread.data.receiverEntity;
      } else {
        threadPartner = thread.data.senderEntity;
      }

      this.element.attr('id', thread.data.id);
      this.element.attr('data-partner-id', threadPartner.id);

      this.threadPartnerName = threadPartner.name + " " + threadPartner.lastname;

      this.element.find('h3').text(this.threadPartnerName);
      this.element.find('img').attr('src', this.threadPartner.images.small.url);

      //console.log('setup ');

      //console.log(this.data.senderEntity);

      if (this.data.senderEntity.type == "person"){
        this.element.attr('is-organization', 'false');
        this.element.find('.thread-type').text('As Myself');
      } else {
        this.element.attr('is-organization', 'true');
        this.element.find('.thread-type').html('As an Organization (<b>'+
          this.data.senderEntity.name
          +'<b>)');
      }


      if (thread.data.unreadCount > 0) {
        this.element.find('.actions span').text(thread.data.unreadCount);
      } else {
        this.element.addClass('updated');
      }

      this.element.on('click', function(){
        thread.element.parent().find('.message-side').removeClass('active');
        thread.element.addClass('active');
        thread.activate();
        return;
      });

      return this;
    },

    _activate : function _activate() {
      var thread = this;
      window.location.hash = thread.data.id;
      //console.log('_activate');

      thread.threadContainer.currentThreadId = thread.data.id;

      thread.threadContainer.noMessagesEl.hide();
      thread.threadContainer.messagesBodyContainerEl.addClass('active');

      thread.threadContainer.messagesContainerEl.show();
      thread.threadContainer.messageListEl.empty();

      thread.threadContainer.messagesBodyHeaderEl.find('.m-action').show();
      thread.threadContainer.messagesBodyHeaderEl.find('.m-new').hide();

      if(this.element.attr('is-organization') == 'true'){
        thread.threadContainer.messagesBodyHeaderEl.find('span.conversation-title').html('Conversation with '
          + this.threadPartnerName +
          ' <span>- As an Organization (<b>'+ this.data.senderEntity.name +'<b>)</span>');

      } else {
        thread.threadContainer.messagesBodyHeaderEl.find('span.conversation-title').html('Conversation with '
          + this.threadPartnerName +
          ' <span>- As Myself</span>');
      }

      thread.threadContainer.messagesBodyHeaderEl.find('.delete-thread').show().attr('data-id', this.data.id);

      var updateThreadUrl = '/'+ thread.threadContainer.currentPerson.profileName + '/messages/'+ thread.data.id;

      $.ajax({
        type: "PUT",
        url: updateThreadUrl,
        headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
        success: function(data) {
          console.log('Thread updated');
          if (!thread.element.hasClass('updated')){
            thread.element.addClass('updated');
          }
          thread.element.find('.actions span').text('0');
          thread.dispatch('updated');
        }
      });


      thread.data.messages.forEach(function(message) {
        var messageInstance = new CV.Message({
          name : 'message_' + message.id,
          type : message.type,
          data : message
        })

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

    isSenderOrReceiver : function isSenderOrReceiver(currentPerson) {
      var thread = this;

      return thread.data.senderPerson ? 'sender' : 'receiver';
    }
  }
})
