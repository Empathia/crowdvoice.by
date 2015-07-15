Li.Engine.before.push(function beforeEngine(data) {
  logger.log('Executing '.yellow + (data.spy.targetObject.className || data.spy.targetObject.constructor.className)  + '.' + data.spy.methodName);
});

Li.Engine.error.push(function errorEngine(data) {
  logger.error('Lithium Detected an error...');
  logger.error('ERROR:', data.error.toString());

  logger.error('Sending a notification');
  LithiumMailer.newError(data.error.toString(), null, function(err, result) {
    if (err) {
      logger.log(err);
    }
    logger.log('Notification sent.');
  });
});

Li.Engine.after.push(function afterEngine(data) {
	logger.log('Executed '.green + (data.spy.targetObject.className || data.spy.targetObject.constructor.className)  + '.' + data.spy.methodName + ' on ' + data.time + 'ms');
});
