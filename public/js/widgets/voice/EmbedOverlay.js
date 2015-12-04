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
            <p>Widget Height:</p>\
          </div>\
          <div class="cv-embed-overlay__view">\
            <p>Default view:</p>\
          </div>\
          <div class="cv-embed-overlay__theme">\
            <p>Theme</p>\
          </div>\
          <div class="cv-embed-overlay__accent">\
            <p>Pick Accent Color</p>\
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
      var voiceIframe = document.createElement('iframe');
      var iframeAdvice = document.createElement('p');

      voiceIframe.setAttribute('src', 'http://localhost:3000/embed/cersei-lannister/walk-of-atonement/?default_view=cards&change_view=true&description=true&background=true&share=true&theme=dark&accent=4DD5B9');
      iframeAdvice.innerHTML = '<i>Widget Width is set to 100% (min width 320 px)</i>';
      this.iframeInner.appendChild(voiceIframe);
      this.embedWidgetContainer.appendChild(iframeAdvice);

      this.appendChild(new CV.UI.Close({
        name : 'closeButton',
        className : '-clickable -color-white -abs',
        svgClassName : '-s18'
      })).render(this.el);

      /* 
       * Widget Height Radios
       */
      this.appendChild(new CV.UI.Radio({
        name : 'short',
        data : {
          label : 'Short',
          checked : true,
          attr : {
            name : 'heightRadios'
          }
        }
      })).render(this.optionHeight);

      this.shortPixels = document.createElement('i');
      this.shortPixels.innerHTML = '400px';

      this.short.el.querySelector('.ui-radio-label').appendChild(this.shortPixels);

      this.appendChild(new CV.UI.Radio({
        name : 'medium',
        data : {
          label : 'Medium',
          checked : false,
          attr : {
            name : 'heightRadios'
          }
        }
      })).render(this.optionHeight);

      this.mediumPixels = document.createElement('i');
      this.mediumPixels.innerHTML = '500px';

      this.medium.el.querySelector('.ui-radio-label').appendChild(this.mediumPixels);


      this.appendChild(new CV.UI.Radio({
        name : 'tall',
        data : {
          label : 'Tall 650px',
          checked : false,
          attr : {
            name : 'heightRadios'
          }
        }
      })).render(this.optionHeight);

      this.tallPixels = document.createElement('i');
      this.tallPixels.innerHTML = '650px';

      this.tall.el.querySelector('.ui-radio-label').appendChild(this.tallPixels);

      /*
       * Default View Radios
       */
      this.appendChild(new CV.UI.Radio({
        name : 'cardView',
        data : {
          label : 'Cards',
          checked : true,
          attr : {
            name : 'viewRadios'
          }
        }
      })).render(this.optionView);

      this.appendChild(new CV.UI.Radio({
        name : 'listView',
        data : {
          label : 'List',
          checked : false,
          attr : {
            name : 'viewRadios'
          }
        }
      })).render(this.optionView);

      this.appendChild(new CV.UI.Checkbox({
        name : 'changeView',
        data : {
          label : 'Allow users to change view',
          checked : true,
          attr : {
            name : 'viewRadios'
          }
        }
      })).render(this.optionView);

      this.appendChild(new CV.UI.Checkbox({
        name : 'showDescription',
        data : {
          label : 'Show Voice Description',
          checked : false,
          attr : {
            name : 'viewRadios'
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
            name : 'themeRadios'
          }
        }
      })).render(this.optionTheme);

      this.appendChild(new CV.UI.Radio({
        name : 'darkTheme',
        data : {
          label : 'Dark',
          checked : false,
          attr : {
            name : 'themeRadios'
          }
        }
      })).render(this.optionTheme);

      this.appendChild(new CV.UI.Checkbox({
        name : 'voiceBackgrond',
        data : {
          label : 'Include voice background',
          checked : true
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
          checked : true
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
    },

    _overlayDeactivate : function _overlayDeactivate(){
      this.deactivate();
    },

    _destroy : function _destroy(){
      Widget.prototype.destroy.call(this);

      return null;
    }

  }
});