ACL.addRole(new ACL.Role('Admin'), ['Person']);

ACL.allow(['index'], 'admin', 'Admin', function(acl, args, next) {
  return next(null, true);
});
