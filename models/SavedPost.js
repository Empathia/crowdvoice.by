var SavedPost = Class('SavedPost').inherits(Argon.KnexModel)({

  validations : {},

  storage : (new Argon.Storage.Knex({
    tableName : 'SavedPosts'
  })),

  prototype : {
    post: function post (done) {
      Post.find({id: this.postId}, function (err, result) {
        if (err) { done(err); return; }

        done(null, new Post(result[0]));
      });
    }
  }
});

module.exports = SavedPost;
