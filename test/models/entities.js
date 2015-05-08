'use strict';


/* Entity Model Tests
 *
 */
describe('Entity Model', function () {

  var entityData1 = {
    type: 'person',
    name: 'John',
    lastname: 'Doe',
    isAnonymous: false
  };

  describe('Validations', function () {
    it('should validate that type is present', function (done) {
      var data = clone(entityData1), entity;

      data.type = '';
      entity = new Entity(data);

      entity.isValid(function (valid) {
        assert(valid === false);
        done();
      });
    });

    describe('type', function () {
      it('cannot be different than person|organization', function (done) {
        var data = clone(entityData1), entity;

          data.type = 'hola';
          entity = new Entity(data);

          entity.isValid(function (valid) {
            assert(valid === false);
            done();
          });
      });

      it('should pass if type is person', function (done) {
        var data = clone(entityData1), entity;

        data.type = 'person';
        entity = new Entity(data);

        entity.isValid(function (valid) {
          assert(valid === true);
          done();
        });
      });

      it('should pass if type is organization', function (done) {
        var data = clone(entityData1), entity;

        data.type = 'organization';
        entity = new Entity(data);

        entity.isValid(function (valid) {
          assert(valid === true);
          done();
        });
      });
    });

    describe('name', function () {
      it('should be present', function (done) {
        var data = clone(entityData1), entity;

        data.name = '';
        entity = new Entity(data);
        entity.isValid(function (err) {
          assert(err !== null);
          done();
        });
      });

      it('should have a length <= 512', function (done) {
        var data = clone(entityData1), entity;

        data.name = '';
        for (var i = 0; i < 513; i+=1) {
          data.name += 'a';
        }
        entity = new Entity(data);
        entity.isValid(function (valid) {
          assert(valid === false);
          done();
        });       
      });
    });

    describe('lastname', function () {
      it('should have a length <= 512', function (done) {
        var data = clone(entityData1), entity;

        data.lastname = '';
        for (var i = 0; i < 513; i+=1) {
          data.lastname += 'a';
        }
        entity = new Entity(data);
        entity.isValid(function (valid) {
          assert(valid === false);
          done();
        });       
      });
    });

    describe('isAnonymous', function () {
      it('should not save if its not boolean', function (done) {
        var data = clone(entityData1), entity;

        data.isAnonymous = 234;
        entity = new Entity(data);
        entity.isValid(function (valid) {
          assert(valid === false);
          done();
        });
      });

      it('should save if it is boolean', function (done) {
        var data = clone(entityData1), entity;

        data.isAnonymous = true;
        entity = new Entity(data);
        entity.isValid(function (valid) {
          assert(valid === true);
          done();
        });
      });
    });

  });

  describe('EntityFollower', function (done) {
    var e1, e2, e3;

    before(function (done) {
      db('Entities').del().then(function () {
        done();
      });
    });
    before(function (done) {
      db('EntityFollower').del().then(function () {
        done();
      });
    });
    before(function (done) {
      e1 = new Entity(entityData1);
      e1.save(done);
    });
    before(function (done) {
      var data = clone(entityData1);
      data.name = 'org1';
      data.lastname = '';
      data.type = 'organization';
      e2 = new Entity(data);
      e2.save(done);
    });
    before(function (done) {
      var data = clone(entityData1);
      data.lastname = '';
      data.name = 'org3';
      data.type = 'organization';
      e3 = new Entity(data);
      e3.save(done);
    });

    it('followEntity should create a EntityFollower relation', function (done) {
      e1.followEntity(e2, function (err) {
        db('EntityFollower').where('follower_id', '=', e1.id).andWhere('followed_id', '=', e2.id).then(function (result) {
          assert(result[0].follower_id === e1.id);
          assert(result[0].followed_id === e2.id);
          done();
        });
      });
    });

    it('followers should return all followers', function (done) {
      e3.followEntity(e2, function (err) {
        e2.followers(function (followers) {
          assert(followers.length === 2);
          done();
        });
      });
    })

    it('followers should return a query', function (done) {
      e2.followers().where('type', '=', 'organization').then(function (followers) {
        assert(followers.length === 1);
        assert(followers[0].name === 'org3');
        done();
      });
    })

    it('follows should return all follows of the current entity', function (done) {
      e1.follows(function (follows) {
        assert(follows.length === 1);
        assert(follows[0].name = 'org2');
        done();
      });
    })

    it('follows should return a query', function (done) {
      e1.follows().where('type', '=', 'person').then(function (follows) {
        assert(follows.length === 0);
        done();
      });
    })
  });

});
