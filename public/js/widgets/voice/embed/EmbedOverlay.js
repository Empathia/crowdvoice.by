Class(CV.UI, 'EmbedOverlay').inherits(Widget)({
  HTML: '\
    <div class="cv-embed-overlay__background"></div>\
    <div class="cv-embed-overlay__body">\
        <div class="cv-embed-overlay__iframe">\
          <div class="cv-embed-iframe-wraper">\
          </div>\
        </div>\
        <div class="cv-embed-overlay__options">\
          <p class="cv-embed-overlay__title">Widget Settings</p>\
          <div class="cv-embed-overlay__height">\
            <p class="option-title">Widget Height:</p>\
          </div>\
          <div class="cv-embed-overlay__view">\
            <p class="option-title">Default view:</p>\
          </div>\
          <div class="cv-embed-overlay__theme">\
            <p class="option-title">Theme</p>\
          </div>\
          <div class="cv-embed-overlay__accent">\
            <p class="option-title">Pick Accent Color</p>\
          </div>\
          <div class="cv-embed-overlay__share"></div>\
          <div class="cv-embed-overlay__code"></div>\
        </div>\
    </div>\
  ',

  prototype : {
    init : function(config) {
      Widget.prototype.init.call(this, config);
      
      this.el = this.element[1];
      console.log(App.Voice);
      this.embedWidgetContainer = this.el.querySelector('.cv-embed-overlay__iframe');
      this.iframeInner = this.el.querySelector('.cv-embed-iframe-wraper');

      this.optionsContainer = this.el.querySelector('.cv-embed-overlay__options');
      this.optionHeight = this.optionsContainer.querySelector('.cv-embed-overlay__height');
      this.optionView = this.optionsContainer.querySelector('.cv-embed-overlay__view');
      this.optionTheme = this.optionsContainer.querySelector('.cv-embed-overlay__theme');
      this.optionAccent = this.optionsContainer.querySelector('.cv-embed-overlay__accent');
      this.optionShare = this.optionsContainer.querySelector('.cv-embed-overlay__share');
      this.optionCode = this.optionsContainer.querySelector('.cv-embed-overlay__code');

      this._setup()._bindEvents();
    },

    _setup : function _setup() {
      this.iframeUrl = '/embed/' + App.Voice.data.owner.profileName + '/' + App.Voice.data.slug + '/?default_view=cards&change_view=true&description=false&background=true&share=true&theme=light&accent=ff9400';
      this.appendChild(new CV.UI.EmbedOverlayIframe({
        name : 'embedableIFrame',
        iframeUrl : this.iframeUrl,
        description : 'Widget Width is set to 100% (min width 320 px)'
      })).render(this.iframeInner);

      this.appendChild(new CV.UI.Close({
        name : 'closeButton',
        className : '-clickable -color-white -abs cv-embed-overlay__closebtn',
        svgClassName : '-s18'
      })).render(this.el);

      /* 
       * Widget Height Radios
       */
      this.appendChild(new CV.UI.Radio({
        name : 'shortRadio',
        data : {
          label : 'Short',
          checked : true,
          attr : {
            name : 'heightRadios',
            value : '400'
          }
        }
      })).render(this.optionHeight);

      this.shortPixels = document.createElement('i');
      this.shortPixels.innerHTML = '400px';

      this.shortRadio.el.querySelector('.ui-radio-label').appendChild(this.shortPixels);

      this.appendChild(new CV.UI.Radio({
        name : 'mediumRadio',
        data : {
          label : 'Medium',
          checked : false,
          attr : {
            name : 'heightRadios',
            value : '500'
          }
        }
      })).render(this.optionHeight);

      this.mediumPixels = document.createElement('i');
      this.mediumPixels.innerHTML = '500px';

      this.mediumRadio.el.querySelector('.ui-radio-label').appendChild(this.mediumPixels);


      this.appendChild(new CV.UI.Radio({
        name : 'tallRadio',
        data : {
          label : 'Tall',
          checked : false,
          attr : {
            name : 'heightRadios',
            value : '650'
          }
        }
      })).render(this.optionHeight);

      this.tallPixels = document.createElement('i');
      this.tallPixels.innerHTML = '650px';

      this.tallRadio.el.querySelector('.ui-radio-label').appendChild(this.tallPixels);

      /*
       * Default View Radios
       */
      this.appendChild(new CV.UI.Radio({
        name : 'cardView',
        data : {
          label : 'Cards',
          checked : true,
          attr : {
            name : 'viewRadios',
            value : 'cards'
          }
        }
      })).render(this.optionView);

      this.appendChild(new CV.UI.Radio({
        name : 'listView',
        data : {
          label : 'List',
          checked : false,
          attr : {
            name : 'viewRadios',
            value : 'list'
          }
        }
      })).render(this.optionView);

      this.appendChild(new CV.UI.Checkbox({
        name : 'changeView',
        data : {
          label : 'Allow users to change view',
          checked : true,
          attr : {
            name : 'viewRadios',
            value : 'true'
          }
        }
      })).render(this.optionView);

      this.appendChild(new CV.UI.Checkbox({
        name : 'showDescription',
        data : {
          label : 'Show Voice Description',
          checked : false,
          attr : {
            name : 'viewRadios',
            value : 'true'
          }
        }
      })).render(this.optionView);

      /*
       * Theme radios
       */
      this.appendChild(new CV.UI.Radio({
        name : 'lightTheme',
        data : {
          label : 'Light',
          checked : true,
          attr : {
            name : 'themeRadios',
            value : 'light'
          }
        }
      })).render(this.optionTheme);

      this.appendChild(new CV.UI.Radio({
        name : 'darkTheme',
        data : {
          label : 'Dark',
          checked : false,
          attr : {
            name : 'themeRadios',
            value : 'dark'
          }
        }
      })).render(this.optionTheme);

      this.appendChild(new CV.UI.Checkbox({
        name : 'voiceBackgrond',
        data : {
          label : 'Include voice background',
          checked : true,
          attr : {
            name : 'themeRadios',
            value : 'true'
          }
        }
      })).render(this.optionTheme);

      /*
       * Accent Color Picker 
       */
      this.inputAccent = document.createElement('input');
      this.inputAccent.type = 'color';
      this.inputAccent.value = '#ff9400';
      this.optionAccent.appendChild(this.inputAccent);

      /* 
       * Allow to share Radios
       */
      this.appendChild(new CV.UI.Checkbox({
        name : 'allowShare',
        data : {
          label : 'Allow to share',
          checked : true,
          attr : {
            name : 'shareRadio',
            value : 'true'
          }
        }
      })).render(this.optionShare);

      /* 
       * Code snippet
       */
      this.appendChild(new CV.Input({
        name : 'codeClipboard',
        type : 'textarea',
        isArea : true,
        placeholder : 'Embedding code...'
      })).render(this.optionCode);

      this.appendChild(new CV.UI.Button({
        name : 'codeClipboard',
        data : {
          value : 'Copy to clipboard',
          attr : {
            class : 'primary cv-button full'
          }
        }
      })).render(this.optionCode);

      this.pasteAdvice = document.createElement('p');
      this.pasteAdvice.innerHTML = '<i>Paste the code into the HTML of your site.</i>';
      this.optionCode.appendChild(this.pasteAdvice);

      return this;    
    },

    _bindEvents : function _bindEvents(){
      this.closeButton.bind('click', this._overlayDeactivate.bind(this));

      this.shortRadio.bind('changed', this._checkHandler.bind(this));
      this.mediumRadio.bind('changed', this._checkHandler.bind(this));
      this.tallRadio.bind('changed', this._checkHandler.bind(this));

      this.cardView.bind('changed', this._checkHandler.bind(this));
      this.listView.bind('changed', this._checkHandler.bind(this));
      this.changeView.bind('changed', this._checkHandler.bind(this));
      this.showDescription.bind('changed', this._checkHandler.bind(this));

      this.lightTheme.bind('changed', this._checkHandler.bind(this));
      this.darkTheme.bind('changed', this._checkHandler.bind(this));
      this.voiceBackgrond.bind('changed', this._checkHandler.bind(this));

      this.inputAccent.addEventListener('change', this._checkHandler.bind(this));

      this.allowShare.bind('changed', this._checkHandler.bind(this));

    },

    _overlayDeactivate : function _overlayDeactivate(){
      this.deactivate();
    },

    _checkHandler : function _checkHandler(){
      this.embedableIFrame.updateUrl('http://wasd.com.mx/');
      console.log('url cambiada');
    },

    _destroy : function _destroy(){
      Widget.prototype.destroy.call(this);

      return null;
    }

  }
});