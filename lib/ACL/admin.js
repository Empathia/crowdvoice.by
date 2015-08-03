ACL.addRole(new ACL.Role('Admin'), ['Person']);

ACL.allow(['index'], 'admin', 'Admin', function(acl, args, next) {
  return next(null, true);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.people', 'Admin', function(acl, args, next) {
  return next(null, true);
});

ACL.allow(['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'], 'admin.organizations', 'Admin', function(acl, args, next) {
  return next(null, true);
});
