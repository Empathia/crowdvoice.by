Class(CV, 'Notification').inherits(Widget).includes(CV.WidgetUtils)({
    ELEMENT_CLASS : 'cv-notification',

    create : function create(config, notificationId) {
       return new CV.NotificationItem({
            data: config,
            notificationId: notificationId
        });
    }
});
