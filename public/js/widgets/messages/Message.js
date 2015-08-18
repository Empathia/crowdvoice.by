var PLACEHOLDERS = require('./../../lib/placeholders');

CV.Message = new Class(CV, 'Message').inherits(Widget)({
  HTML : '<div class="message-text">\
            <div class="message-info">\
            <img class="message-sender-image" src="/img/sample/avatars/org-06.png" alt="">\
            <div class="message-data">\
                <h3 class="data-message-participant">Chu Vaca </h3>\
                <span class="data-message-date">• May 5th, 2015 • 7:32 PM</span>\
                <p class="data-message-text"></p>\
                <div class="message-notification">\
                  <div class="message-notification-actions"></div>\
                </div>\
              </div>\
            </div>\
          </div>',

  INVITATION_ORGANIZATION_HTML : '<p>You were invited to become a member of {organizationName}.\
    Accepting this invitation will grant you privilege of posting and moderating content on all the Voices by <a href="{url}">{organizationName}</a.</p>',

  INVITATION_VOICE_HTML : '<p>You were invited to become a contributor of {organizationName}.\
    Accepting this invitation will grant you privilege of posting and moderating content on the Voices <a href="{url}">{organizationName}</a.</p>',

  REQUEST_ORGANIZATION_HTML : '<p>{name} has requested to become a member of {organizationName}. \
    If you grant access, {name} will be able to post and moderate content on all the Voices of {organizationName}.<br><a href="{url}">Go to this Voice\'s settings ›</a></p>',

  REQUEST_VOICE_HTML : '<p>{name} has requested to become a contributor for {organizationName}. \
    If you grant access, {name} will be able to post and moderate content of this Voice.<br><a href="{url}">Go to this Voice\'s settings ›</a></p>',

  REPORT : '<p>This is an organization report for <a href="{url}">{organizationName} ›</a>.</p>',

  prototype : {
    data : {},
    init : function init(config) {
      Widget.prototype.init.call(this, config);

      var message = this;

      if (this.type === 'message') {
        this.element.find('.message-data .message-notification').remove();
      }
    },

    setup : function setup() {
      var message = this;
      //console.log(this);

      var participant;

      if (message.data.senderEntity.id !== message.parent.parent.currentPerson.id) {
        participant = message.data.senderEntity.name + " " + message.data.senderEntity.lastname;
      } else {
        participant = 'You';
      }

      message.element.find('.message-data .data-message-participant').text(participant);

      if (message.data.senderEntity.images.notification) {
        message.element.find('.message-sender-image').attr('src', message.data.senderEntity.images.notification.url);
      } else {
        message.element.find('.message-sender-image').attr('src', PLACEHOLDERS.profile);
      }

      message.element.find('.message-data .data-message-date').text(moment(new Date(message.data.createdAt).toISOString()).format('• MMMM Do, YYYY • h:mm a'));
      message.element.find('.message-data .data-message-text').text(message.data.message);

      //console.log('type: ' +message.type);

      if ( message.type == 'report') {
        console.log(this);
        var messageNotificationElement = $(message.constructor.REPORT);
        var text = messageNotificationElement.html();

        text = text
            .replace('{organizationName}', message.data.organization.name)
            .replace('{url}', '/' + message.data.organization.profileName);

        messageNotificationElement.html(text);

        this.element.find('.message-data .message-notification').prepend(messageNotificationElement);

      }

      if (message.type != 'message' && message.type != 'report') {
        var messageNotificationElement = $(message.constructor[message.type.toUpperCase() + '_HTML']);

        var text = messageNotificationElement.html();

        if (message.data.senderEntity.id !== message.parent.parent.currentPerson.id) {
          switch(message.type) {
            case 'invitation_organization':
              text = text
                      .replace(/{organizationName}/g, message.data.organization.name)
                      .replace(/{url}/, '/' + message.data.organization.profileName)
              break;
            case 'invitation_voice':
              text = text
                      .replace(/{organizationName}/g, message.data.voice.title)
                      .replace(/{url}/, '/' + message.data.voice.slug)
              break;
            case 'request_organization':
              text = text
                      .replace(/{name}/g, message.data.senderEntity.name + ' ' + message.data.senderEntity.lastname)
                      .replace(/{organizationName}/g, message.data.organization.name + ' ' + message.data.organization.lastname)
                      .replace(/{url}/, '/' + message.data.organization.profileName + '/edit')
              break;
            case 'request_voice':
              text = text
                      .replace(/{name}/g, message.data.senderEntity.name + ' ' + message.data.senderEntity.lastname)
                      .replace(/{organizationName}/g, message.data.voice.title)
                      .replace(/{url}/g, '/' + message.data.voice.slug)
              break;
          }

          //console.log('type: ' +message.type);

          if (message.type != "request_organization" && message.type != "request_voice"){

            //console.log('in');

            var btnMultipleOptions = {
              "1": {label: 'Accept', name: 'accept'},
              "2": {label: 'Accept as an Anonymous Member', name: 'anonymous'},
              "3": {label: 'Refuse', name: 'refuse'}
            };

            var messageActions = new CV.Button({
              style   : 'tiny',
              type    : 'multiple',
              name    : 'buttonMultiple',
              options : btnMultipleOptions
            }).render(message.element.find('.message-notification-actions'));

            // ************   Message button actions *******************

            messageActions.accept.on('click', function(){
              var url = '/' + message.threadContainer.currentPerson.profileName + '/messages/' + message.data.threadId + '/' + message.data.id  +'/answerInvite';

              console.log('-- Accept --');
              console.log('url: ' + url);
              console.log('message Id: ' + message.data.id);
              console.log('thread Id: ' + message.data.threadId);
              console.log('message Type: ' + message.data.type);

              $.ajax({
                  type : 'POST',
                  headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
                  url : url,
                  dataType : 'json',
                  data : {
                    action : 'accept'
                  },
                  success : function(data) {
                      console.log(data);
                  },
                  error : function(err) {
                      console.error(err);
                  }
              })

            });

            messageActions.anonymous.on('click', function(){
              var url = '/' + message.threadContainer.currentPerson.profileName + '/messages/' + message.data.threadId + '/' + message.data.id  +'/answerInvite';

              console.log('-- Accept as an Anonymous Member --');
              console.log('url: ' + url);
              console.log('message Id: ' + message.data.id);
              console.log('thread Id: ' + message.data.threadId);
              console.log('message Type: ' + message.data.type);

              $.ajax({
                  type : 'POST',
                  headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
                  url : url,
                  dataType : 'json',
                  data : {
                    action : 'acceptAsAnonymous'
                  },
                  success : function(data) {
                      console.log(data);
                  },
                  error : function(err) {
                      console.error(err);
                  }
              })

            });

            messageActions.refuse.on('click', function(){
              var url = '/' + message.threadContainer.currentPerson.profileName + '/messages/' + message.data.threadId + '/' + message.data.id  +'/answerInvite';

              console.log('-- Refuse --');
              console.log('url: ' + url);
              console.log('message Id: ' + message.data.id);
              console.log('thread Id: ' + message.data.threadId);
              console.log('message Type: ' + message.data.type);

              $.ajax({
                  type : 'POST',
                  headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
                  url : url,
                  dataType : 'json',
                  data : {
                    action : 'ignore'
                  },
                  success : function(data) {
                      console.log(data);
                  },
                  error : function(err) {
                      console.error(err);
                  }
              })

            });

          }

        } else {
          switch(message.type) {
            case 'invitation_organization':
              text = 'You have invited this user to become member of ' + message.data.organization.name;
              break;
            case 'invitation_voice':
              text = 'You have invited this user to become contributor of ' + message.data.voice.title;
              break;
            case 'request_organization':
              text = 'You have requested to be a member of ' + message.data.organization.name;
              break;
            case 'request_voice':
              text = 'You have requested to be a contributor of ' + message.data.voice.title;
              break;
          }
        }

        messageNotificationElement.html(text);

        this.element.find('.message-data .message-notification').prepend(messageNotificationElement);
      }
    }
  }
})
