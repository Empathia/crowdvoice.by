require(__dirname + '/setup.js')
var FeedInjector = require(__dirname + '/../../lib/FeedInjector.js')

//test('', function (t) {
//})

test('entityFollowsEntity', function (t) {
  t.plan(1)

  FeedInjector().inject(1, 'who entityFollowsEntity', { followedId: 2 }, function (err) {
    if (err) { t.fail(); return console.log(err) }

    t.pass()
  })
})
