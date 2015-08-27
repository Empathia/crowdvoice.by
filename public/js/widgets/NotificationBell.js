/** @jsx NeoWidget.h */

Class('NotificationBell').inherits(Widget)({
  HTML : '\
  <button class="header-notification-button header-actions-button cv-button small rounded -p0 -rel has-new-notifications">\
      <svg class="header-actions-svg -s17">\
          <use xlink:href="#svg-notifications"></use>\
      </svg>\
      <span class="ui-badge -abs" style="display:none;"></span>\
  </button>\
  ',
  prototype : {
    init : function(config) {
      Widget.prototype.init.call(this, config);
    },

    setup : function setup() {
      var bell = this;
      var notifications = null;

      var feedGen = new CV.feedGenerator({
          type : 'feed app'
      });

      var socket = this.parent.parent.getSocket();

      setInterval(function() {
        socket.emit('getNotifications');
      }, 5000);

      socket.on('notifications', function(data) {
        if (data > 0) {
          bell.element.find('.ui-badge').show().html(data);
        } else {
          bell.element.find('.ui-badge').hide();
        }
      });

      bell.element.on('click', function() {
        socket.emit('readNotifications');
        //setTimeout(function() {
        //  window.location = '/';
        //}, 500);
        if (feedGen.feedItems){
          if (!notifications){
          //feedGen.bind('ready', function(){
            notifications = new CV.NotificationsManager({
                notifications : feedGen.feedItems
            }).render(document.body);
            notifications.show();
          //});
          } else {
            notifications.open ? notifications.hide() : notifications.show();

          }

        }

      });
    }
  }
});
