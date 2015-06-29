/* jshint multistr: true */
Class(CV, 'VoiceRequestToContribute').inherits(Widget)({
    HTML : '\
        <div class="request-to-contribute-container -inline-block">\
          <button class="request-to-contribute-button cv-button tiny">Request to Contribute</button>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            var bubble = new CV.Bubble({
                title       : 'Want to help out?',
                name        : 'bubbleRequest',
                action      : CV.FormRequestToContribute,
                width       : 600,
                anchorEl    : this.el.querySelector('.request-to-contribute-button')
            });

            this.appendChild(bubble);

            bubble.bubbleAction.element.find('button.submit').bind('click', function() {
              var url = window.location.pathname + '/requestToContribute';

              var data = {
                message : bubble.bubbleAction.element.find('form textarea').val()
              }

              $.ajax({
                method : 'POST',
                url : url,
                headers: { 'csrf-token': $('meta[name="csrf-token"]').attr('content') },
                data : data,
                success : function(data) {
                    bubble.bubbleAction.showSuccess();
                },
                error : function(data) {
                  console.error(data)
                }
              })
            })

            //this.appendChild(
            //    new CV.PopoverRequestToContribute({
            //        toggler: this.el.querySelector('.request-to-contribute-button'),
            //        container: this.el
            //    })
            //);
        }
    }
});
