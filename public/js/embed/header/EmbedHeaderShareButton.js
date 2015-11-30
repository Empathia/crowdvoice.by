Class(CV, 'EmbedHeaderShareButton').inherits(CV.UI.Button)({
  prototype : {
    init : function init (config) {
      CV.UI.Button.prototype.init.call(this, config);
      console.log('share button');
    }
  }
});