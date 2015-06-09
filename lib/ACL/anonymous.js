ACL.addRole(new ACL.Role('Anonymous'), ['Visitor']);

ACL.addResource(new ACL.Resource('threads'));

ACL.allow('show', 'threads', 'Anonymous', function (acl, args, next) {
  return next(null, true);
});
