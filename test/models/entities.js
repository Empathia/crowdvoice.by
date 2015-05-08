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

  describe('Basic operations', function () {

    beforeEach(function (done) {
      db('Entities').del().then(function (err, result) {
        done();
      });
    });

    it('should create an entity record', function (done) {
      var entity = new Entity(entityData1);
      entity.save(function (err) {
        assert(err === null);
        done();
      });
    });

  });

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

});
