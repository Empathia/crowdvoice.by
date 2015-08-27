require(__dirname + '/setup.js')
var FeedInjector = require(__dirname + '/../../lib/FeedInjector.js')

//test('', function (t) {
//})

test('entityFollowsEntity', function (t) {
  t.plan(1)

  FeedInjector().inject(1, 'who entityFollowsEntity', { followedId: 2 }, function (err) {
    if (err) {
      t.fail()
      return console.log(err)
    }

    FeedAction.findById(1, function (err, result) {
      if (err) {
        t.fail()
        return console.log(err)
      }

      t.deepEqual(result[0], {
        id: result[0].id,
        itemType: 'entity',
        itemId: 2,
        action: 'followed',
        who: 1,
        createdAt: result[0].createdAt,
        updatedAt: result[0].updatedAt,
      }, 'FeedAction entry is right')
    })

  })
})
