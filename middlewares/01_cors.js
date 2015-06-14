// *************************************************************************
//                             CORS
// *************************************************************************
module.exports = function (req, res, next) {
  var hrtime = function() {
    var hrTime = process.hrtime();
    return (hrTime[0] + (hrTime[1] / 1000000));
  }

  var startTime = hrtime();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.on('finish', function() {
    logger.log('RESPONSE TIME: ' + ((hrtime() - startTime).toFixed(4) + 'ms' + "\n"));

  })
  next();
};
