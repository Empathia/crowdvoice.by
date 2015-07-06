var router = application.router;

// HomeController
router.route('/')
  .get(HomeController.prototype.index);
router.route('/dev/voice')
  .get(HomeController.prototype.voice);
router.route('/dev/profile')
  .get(HomeController.prototype.profile);
router.route('/dev/profile/voices')
  .get(HomeController.prototype.profileVoices);
router.route('/dev/profile/saved')
  .get(HomeController.prototype.profileSaved);
router.route('/dev/discover')
  .get(HomeController.prototype.discover);
router.route('/dev/discover/recommended')
  .get(HomeController.prototype.discoverRecommended);
router.route('/dev/discover/onboarding')
  .get(HomeController.prototype.discoverOnboarding);
router.route('/dev/ui')
  .get(HomeController.prototype.ui);
router.route('/dev/kabinett')
  .get(HomeController.prototype.kabinett);

// Topics
router.route('/topics')
  .get(TopicsController.prototype.index);
router.route('/topics')
  .post(TopicsController.prototype.create);
router.route('/topic/new')
  .get(TopicsController.prototype.new);
router.route('/topic/:id*')
  .all(TopicsController.prototype.getTopicById);
router.route('/topic/:id/edit')
  .get(TopicsController.prototype.edit);
router.route('/topic/:id')
  .get(TopicsController.prototype.show);
router.route('/topic/:id')
  .put(TopicsController.prototype.update);
router.route('/topic/:id')
  .delete(TopicsController.prototype.destroy);

// OrganizationsController
router.route(['/organization*']).all(function (req, res, next) {
  req.entityType = 'organization';
  next();
});
router.route('/organizations')
  .get(OrganizationsController.prototype.index);
router.route('/organization')
  .post(OrganizationsController.prototype.create);
router.route('/organization/new')
  .get(OrganizationsController.prototype.new);

// router.route('/organization/:id*')
//   .all(OrganizationsController.prototype.getEntity);
// router.route('/organization/:id')
//   .get(OrganizationsController.prototype.show);
// router.route('/organization/:id')
//   .put(OrganizationsController.prototype.update);
// router.route('/organization/:id/edit')
//   .get(OrganizationsController.prototype.edit);
//
// router.route('/organization/:id/follow')
//   .post(OrganizationsController.prototype.follow);
// router.route('/organization/:id/invite_entity')
//   .post(OrganizationsController.prototype.inviteEntity);
// router.route('/organization/:id/voices')
//   .get(OrganizationsController.prototype.voices);
// router.route('/organization/:id/recommended')
//   .get(OrganizationsController.prototype.recommended);

// PeopleController
router.route(['/person*', '/people*']).all(function (req, res, next) {
  req.entityType = 'person';
  next();
});
// router.route('/people')
//   .get(PeopleController.prototype.index);
// router.route('/person')
//   .post(PeopleController.prototype.create);
// router.route('/person/new')
//   .get(PeopleController.prototype.new);
//
// router.route('/person/:id*')
//   .all(PeopleController.prototype.getEntity);
// router.route('/person/:id')
//   .get(PeopleController.prototype.show);
// router.route('/person/:id')
//   .put(PeopleController.prototype.update);
// router.route('/person/:id/edit')
//   .get(PeopleController.prototype.edit);
//
// router.route('/person/:id/follow')
//   .post(PeopleController.prototype.follow);
// router.route('/person/:id/voices')
//   .get(PeopleController.prototype.voices);
// router.route('/person/:id/saved_posts')
//   .get(PeopleController.prototype.savedPosts);
// router.route('/person/:id/recommended')
//   .get(PeopleController.prototype.recommended);



// SessionsController
router.route('/login')
  .get(SessionsController.prototype.login);
router.route('/session/forgot-password')
  .get(SessionsController.prototype.forgotPassword);
router.route('/session')
  .post(SessionsController.prototype.create);
router.route('/session/reset-password')
  .post(SessionsController.prototype.resetPassword);
router.route('/session')
  .get(SessionsController.prototype.tokenAuth);
router.route('/logout')
  .get(SessionsController.prototype.logout);

router.route('/switchPerson')
  .get(SessionsController.prototype.switchPerson);

// UsersController
router.route('/user')
  .post(UsersController.prototype.create);
router.route('/signup')
  .get(UsersController.prototype.new);
router.route('/signup/check-username')
  .post(UsersController.prototype.checkUsername);

// VoicesController
// router.route('/voices')
//   .get(VoicesController.prototype.index);
// router.route('/voice')
//   .post(VoicesController.prototype.create);
// router.route('/voice/new')
//   .get(VoicesController.prototype.new);
// router.route('/voice')
//   .post(VoicesController.prototype.create);

// EntitiesController
router.route('/:profile_name*')
  .all(EntitiesController.prototype.filterAction(EntitiesController, 'getEntityByProfileName'));

router.route('/:profile_name')
  .get(EntitiesController.prototype.filterAction(EntitiesController, 'show'));
router.route('/:profile_name')
  .put(EntitiesController.prototype.filterAction(EntitiesController, 'update'));
router.route('/:profile_name/edit')
  .get(EntitiesController.prototype.filterAction(EntitiesController, 'edit'));

router.route('/:profile_name/follow')
  .get(EntitiesController.prototype.filterAction(EntitiesController, 'follow'));
router.route('/:profile_name/voices')
  .get(EntitiesController.prototype.filterAction(EntitiesController, 'voices'));
router.route('/:profile_name/saved_posts')
  .get(PeopleController.prototype.filterAction(PeopleController, 'savedPosts'));
router.route('/:profile_name/recommended')
  .get(EntitiesController.prototype.filterAction(EntitiesController, 'recommended'));

// ThreadsController
router.route('/:profileName/messages')
  .get(ThreadsController.prototype.filterAction(ThreadsController, 'index'));

router.route('/:profileName/messages')
  .post(ThreadsController.prototype.filterAction(ThreadsController, 'create'));

router.route('/:profileName/messages/:threadId')
  .get(ThreadsController.prototype.filterAction(ThreadsController, 'index'))
  .put(ThreadsController.prototype.filterAction(ThreadsController, 'update'));

router.route('/:profileName/messages/:threadId')
  .delete(ThreadsController.prototype.filterAction(ThreadsController, 'destroy'));

router.route('/:profileName/messages/searchPeople')
  .post(ThreadsController.prototype.filterAction(ThreadsController, 'searchPeople'));

// MessagesController
router.route('/:profileName/messages/:threadId')
  .post(MessagesController.prototype.filterAction(MessagesController, 'create'));

router.route('/:profileName/messages/:threadId/:messageId')
  .delete(MessagesController.prototype.filterAction(MessagesController, 'destroy'));

router.route('/:profileName/messages/:threadId/:messageId/acceptInvite')
  .get(MessagesController.prototype.filterAction(MessagesController, 'acceptInvite'));

// PostsController
router.route('/posts')
  .get(PostsController.prototype.index)
router.route('/:profileName/:voiceSlug/')
  .post(PostsController.prototype.filterAction(PostsController, 'create'));

router.route('/:profileName/:voiceSlug/:postId')
  .get(PostsController.prototype.filterAction(PostsController, 'show'))
  .put(PostsController.prototype.filterAction(PostsController, 'update'))
  .delete(PostsController.prototype.filterAction(PostsController, 'destroy'));

router.route('/post/:postId/save_post')
  .post(PostsController.prototype.savePost)
router.route('/post/:postId/unsave_post')
  .post(PostsController.prototype.unsavePost)

router.route('/:profileName/:voiceSlug/preview')
  .post(PostsController.prototype.filterAction(PostsController, 'preview'));

// VoicesController
router.route('/:profileName/:voice_slug*')
  .all(VoicesController.prototype.filterAction(VoicesController, 'getActiveVoice'));
router.route('/:profileName/:voice_slug/edit')
  .get(VoicesController.prototype.filterAction(VoicesController, 'edit'));
router.route('/:profileName/:voice_slug')
  .get(VoicesController.prototype.filterAction(VoicesController, 'show'))
  .put(VoicesController.prototype.filterAction(VoicesController, 'update'));

router.route('/:profileName/:voiceSlug/requestToContribute')
  .post(VoicesController.prototype.filterAction(VoicesController, 'requestToContribute'));

// PagesController
router.route('/page/about')
  .get(PagesController.prototype.about);

// GoogleNewsFetcherController
router.route('/:profileName/:voiceSlug/googleNews/:q')
  .get(GoogleNewsFetcherController.prototype.search);
