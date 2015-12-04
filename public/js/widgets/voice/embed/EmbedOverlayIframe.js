/* Help/Support - Help Desk Iframe */

Class(CV.UI, 'EmbedOverlayIframe').inherits(Widget)({
	ELEMENT_CLASS : 'iframe-container',

	HTML : '\
		<div>\
			<iframe></iframe>\
			<p><i></i></p>\
		</div>\
	',

	prototype:{
		iframeUrl : null,
		description : null,
		init : function init(config) {
			Widget.prototype.init.call(this, config);

			this.el = this.element[0];
			this.iframeContainer = this.el.querySelector('iframe');
			this.adviceContiner = this.el.querySelector('i');

			this.iframeContainer.setAttribute('src', this.iframeUrl);
			this.adviceContiner.innerHTML = this.description;
		},

		updateUrl : function updateUrl(url){
			this.iframeContainer.src = url;
		}
	}
});
  