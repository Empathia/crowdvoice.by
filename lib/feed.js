'use strict'

// subscribe to all the events we need for feeds

// new entry
Voice.bind('afterCreate', FeedActionsController.prototype.voiceCreated)
Entity.bind('afterCreate', FeedActionsController.prototype.entityCreated)

// entry edited
Voice.bind('afterUpdate', FeedActionsController.prototype.voiceUpdated)
Entity.bind('afterUpdate', FeedActionsController.prototype.entityUpdated)

// entry deleted
Voice.bind('afterDestroy', FeedActionsController.prototype.voiceDeleted)
Entity.bind('afterDestroy', FeedActionsController.prototype.entityDeleted)
