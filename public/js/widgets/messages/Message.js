var moment = require('moment');
var API = require('./../../lib/api');
var Person = require('./../../lib/currentPerson');
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

  INVITATION_ORGANIZATION_HTML : '<p>You were invited to become a member of {organizationName}. \
    Accepting this invitation will grant you privilege of posting and moderating content on all the Voices by <a href="{url}">{organizationName}</a.</p>',

  INVITATION_VOICE_HTML : '<p>You were invited to become a contributor of {organizationName}. \
    Accepting this invitation will grant you privilege of posting and moderating content on the Voices <a href="{url}">{organizationName}</a.</p>',

  REQUEST_ORGANIZATION_HTML : '<p>{name} has requested to become a member of {organizationName}. \
    If you grant access, {name} will be able to post and moderate content on all the Voices of {organizationName}. <a href="{url}">Go to this Organization\'s settings ›</a></p>',

  REQUEST_VOICE_HTML : '<p>{name} has requested to become a contributor for {organizationName}. \
    If you grant access, {name} will be able to post and moderate content of this Voice.<br><a href="{url}">Go to this Voice\'s settings ›</a></p>',

  INVITATION_ACCEPTED_VOICE_HTML : '<p>Invitation to {voiceTitle} accepted.</p>',

  INVITATION_ACCEPTED_ORGANIZATION_HTML : '<p>Invitation to {organizationName} accepted.</p>',

  INVITATION_REJECTED_VOICE_HTML : '<p>Invitation to {voiceTitle} rejected.</p>',

  INVITATION_REJECTED_ORGANIZATION_HTML : '<p>Invitation to {organizationName} rejected.</p>',

  prototype : {
    data : {},
    init : function init(config) {
      Widget.prototype.init.call(this, config);

      if (this.type === 'message') {
        this.element.find('.message-data .message-notification').remove();
      }
    },

    setup : function setup() {
      var message = this;
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
        message.element.find('.message-sender-image').attr('src', PLACEHOLDERS.notification);
      }

      message.element.find('.message-data .data-message-date').text(moment(new Date(message.data.createdAt).toISOString()).format('• MMMM Do, YYYY • h:mm A'));
      message.element.find('.message-data .data-message-text').text(message.data.message);

      if (message.type !== 'message' && message.type !== 'report') {
        var text = this.constructor[this.type.toUpperCase() + '_HTML'];

        if (Person.is(message.data.senderEntity.id) === false) {
          switch(message.type) {
            case 'invitation_organization':
              text = text.replace(/{organizationName}/g, message.data.organization.name)
                      .replace(/{url}/, '/' + message.data.organization.profileName);
              break;
            case 'invitation_voice':
              text = text.replace(/{organizationName}/g, message.data.voice.title)
                      .replace(/{url}/, '/' + message.data.voice.slug);
              break;
            case 'request_organization':
              text = text
                      .replace(/{name}/g, message.data.senderEntity.name + ' ' + message.data.senderEntity.lastname)
                      .replace(/{organizationName}/g, message.data.organization.name)
                      .replace(/{url}/, '/' + message.data.organization.profileName + '/edit');
              break;
            case 'request_voice':
              text = text.replace(/{name}/g, message.data.senderEntity.name + ' ' + message.data.senderEntity.lastname)
                      .replace(/{organizationName}/g, message.data.voice.title)
                      .replace(/{url}/g, '/' + message.data.voice.slug);
              break;
            case 'invitation_accepted_voice':
              text = text.replace(/{voiceTitle}/, message.data.voice.title);
              break;

            case 'invitation_accepted_organization':
              text = text.replace(/{organizationName}/, message.data.organization.name);
              break;

            case 'invitation_rejected_voice':
              text = text.replace(/{voiceTitle}/, message.data.voice.title);
              break;

            case 'invitation_rejected_organization':
              text = text.replace(/{organizationName}/, message.data.organization.name);
              break;
          }

          if (message.type === "invitation_organization" || message.type === "invitation_voice") {
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
              console.log('-- Accept --');

              API.threatAnswerInvitation({
                profileName: message.threadContainer.currentPerson.profileName,
                threadId: message.data.threadId,
                messageId: message.data.id,
                data : {action: 'accept'}
              }, function(err, res) {
                if (err) {
                  return console.log(res);
                }
                messageActions.element.hide();
                message.element.find('.message-notification > p').html('Invitation Accepted.');
              });
            });

            messageActions.anonymous.on('click', function(){
              console.log('-- Accept As anon --');

              API.threatAnswerInvitation({
                profileName: message.threadContainer.currentPerson.profileName,
                threadId: message.data.threadId,
                messageId: message.data.id,
                data : {action: 'accept', anonymous: true}
              }, function(err, res) {
                if (err) {
                  return console.log(res);
                }
                messageActions.element.hide();
                message.element.find('.message-notification > p').html('Invitation Accepted.');
              });
            });

            messageActions.refuse.on('click', function(){
              console.log('-- Refuse --');

              API.threatAnswerInvitation({
                profileName: message.threadContainer.currentPerson.profileName,
                threadId: message.data.threadId,
                messageId: message.data.id,
                data : {action: 'ignore'}
              }, function(err, res) {
                if (err) {
                  return console.log(res);
                }
                messageActions.element.hide();
                message.element.find('.message-notification > p').html('Invitation rejected.');
              });
            });
          }
        } else {

          switch(message.type) {
            case 'invitation_voice':
              text = '<p>You invited ' + message.thread.data.receiverEntity.name + ' to become a contributor of ' + message.data.voice.title + '.</p>';
              break;

            case 'invitation_organization':
              text = '<p>You invited ' + message.thread.data.receiverEntity.name + ' to become a member of ' + message.data.organization.name + '.</p>';
              break;

            case 'request_voice':
              text = '<p>You has requested to become a contributor for {voiceTitle}.</p>'.replace(/{voiceTitle}/, message.data.voice.title);
              break;

            case 'request_organization':
              text = '<p>You has requested to become a member of {organizationName}.</p>'.replace(/{organizationName}/, message.data.organization.name);
              break;

            case 'invitation_accepted_voice':
              text = text.replace(/{voiceTitle}/, message.data.voice.title);
              break;

            case 'invitation_accepted_organization':
              text = text.replace(/{organizationName}/, message.data.organization.name);
              break;

            case 'invitation_rejected_voice':
              text = text.replace(/{voiceTitle}/, message.data.voice.title);
              break;

            case 'invitation_rejected_organization':
              text = text.replace(/{organizationName}/, message.data.organization.name);
              break;
          }
        }

        this.element.find('.message-data .message-notification').prepend(text);
      }
    }
  }
});
