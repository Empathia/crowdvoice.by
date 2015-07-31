ACL.addRole(new ACL.Role('Admin'), ['Person']);

ACL.addResource(new ACL.Resource('admin'));

ACL.allow('index', 'admin', 'Admin', function(acl, args, next) {
  return next(null, true);
});
