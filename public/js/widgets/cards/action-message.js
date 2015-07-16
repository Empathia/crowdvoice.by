var Person = require('./../../lib/currentPerson');

Class(CV, 'CardActionMessage').inherits(Widget)({

    ELEMENT_CLASS : 'card-actions-item',

    HTML : '\
        <div>\
            <svg class="card-activity-svg -s16">\
                <use xlink:href="#svg-messages"></use>\
            </svg>\
            <p class="card-actions-label">Message</p>\
        </div>',

    prototype : {

        id      : null,
        bubble  : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            var button = this;
            var bCreated = false;

            this.element.on('click', function(){

                if (!bCreated){
                    bCreated = true;
                    button.bubble = new CV.Bubble({
                        title       : 'Send Message',
                        name        : 'sendMessageBubble',
                        action      : CV.SendMessage,
                        width       : 320,
                        data        : {
                          type : 'message',
                          profileName : Person.get().profileName,
                          senderEntityId : Person.get().id,
                          receiverEntityId : button.id
                        },
                        anchorEl    : button.element
                    }).show();
                }
            });

        }
    }
});
