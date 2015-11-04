/* Help/Support - Help Desk Iframe */

Class(CV, 'HelpDesk').inherits(Widget).includes(CV.WidgetUtils)({

	prototype:{
		el : null,

		init : function init(){
			this.el = this.element;
			console.log(this);
			console.log('Hey soy el help desk'+this.el);
		},

		_bindEvents : function _bindEvents(){
			document.getElementByClass('sidebar-link-help-support').onclick = function() { };
		},

		_helpDesk : function _helpDesk (){

			var iframe = document.createElement('iframe');
			iframe.src = 'http://crowdvoice.reamaze.com/';
			document.body.appendChild(iframe);
			console.log('taco');    

		}
	}

});