var glob = require('glob');

glob.sync('lib/krypton/models/*.js').forEach(function (file) {
  logger.log('Loading Krypton model ' + file + '...');
  require(path.join(process.cwd(), file));
});
