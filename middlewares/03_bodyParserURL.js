// *************************************************************************
//                           Body Parser urlEncoded
// *************************************************************************
logger.log("Setting bodyParser URL");
module.exports = bodyParser.urlencoded({limit : '50mb', extended: true});
