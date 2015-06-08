ACL.addRole(new ACL.Role('Visitor'));

ACL.addResource(new ACL.Resource('homepage'));

ACL.addResource(new ACL.Resource('signup'));

ACL.addResource(new ACL.Resource('login'));

ACL.addResource(new ACL.Resource('voices'));

ACL.allow('show', 'homepage', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('show', 'signup', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('show', 'login', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('browse', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('trending', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('new', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});

ACL.allow('topics', 'voices', 'Visitor', function (acl, args, next) {
  return next(null, true);
});
