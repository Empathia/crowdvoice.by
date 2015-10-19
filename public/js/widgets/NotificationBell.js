/** @jsx NeoWidget.h */

Class('NotificationBell').inherits(Widget)({
  HTML : '\
  <button class="header-notification-button header-actions-button cv-button small rounded -p0 -rel">\
      <svg class="header-actions-svg -s17">\
          <use xlink:href="#svg-notifications"></use>\
      </svg>\
      <span class="ui-badge -abs" style="display:none;"></span>\
  </button>\
  ',
  prototype : {

    token : $('meta[name="csrf-token"]').attr('content'),

    init : function(config) {
      Widget.prototype.init.call(this, config);
    },

    setup : function setup() {
      var bell = this;
      var notifications = null;

      $.ajax({
          type : 'GET',
          dataType : 'json',
          url : '/' + currentPerson.profileName + '/notifications',
          headers : {'csrf-token' : this.token},
          success : function success(data) {
            console.log(data);
            notifications = new CV.NotificationsManager({
                notifications : data.reverse()
            }).render(document.body);
          },
          error : function error(err) {
            console.log(err);
          }
      });

      var socket = this.parent.parent.getSocket();

      if (!/feed/.test(window.location.href)){
        socket.emit('getNotifications');
      }

      setInterval(function() {
        socket.emit('getNotifications');
      }, 30000);

      socket.on('notifications', function(data) {

        if (data > 0) {
          bell.element.find('.ui-badge').show().html(data);
          bell.element.addClass('has-new-notifications');
        } else {
          bell.element.find('.ui-badge').hide();
          bell.element.removeClass('has-new-notifications');
        }

        $.ajax({
            type : 'GET',
            dataType : 'json',
            url : '/' + currentPerson.profileName + '/notifications',
            headers : {'csrf-token' : this.token},
            success : function success(data) {

              notifications.update(data.reverse());

            },
            error : function error(err) {
              console.log(err);
            }
        });


      });

      bell.element.on('click', function() {

        if(notifications){
          notifications.open ? notifications.hide() : notifications.show();
        }

      });
    }
  }
});









