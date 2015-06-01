Class(CV, 'Login').inherits(Widget)({

	ELEMENT_CLASS : 'cv-login',

    HTML : '\
        <div class="cv-login">\
          <div class="close-login">\
            <img src="/img/icons/icon-close.png">\
          </div>\
          <div class="login-content">\
            <img src="/img/cv-logo-login.png">\
            <h2>CrowdVoice.by</h2>\
            <br><br>\
            <div class="form-container"></div>\
          </div>\
        </div>\
    ',

    FORM_SIGNUP : '\
        <h1>It\'s time to raise your voice!</h1>\
        <p>Sign up to CrowdVoice.by and create Voices, post content, follow users, organizations and more!</p>\
        <br>\
        <form action="" method="post" accept-charset="utf-8">\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" name="username" value="user"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" name="name" value="John"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" name="lastname" value="Doe"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" name="profileName" value="John"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" name="email" value="user@crowdvoice.by"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" name="password" value="mysecret"><br>\
              </div>\
            </div>\
            <div class="cv-check">\
              <input type="checkbox" name="isAnonymous" value="true" checked>\
              <span class="label">Is Anonymous?</span>\
            </div>\
            <input type="hidden" name="_csrf" class="form-token" value="">\
            <button class="cv-button primary full">Create User</button>\
        </form>\
        <br>\
        <p>Already have an account? <a href="/login">Sign in!</a></p>\
    ',

    FORM_LOGIN : '\
        <h1>Welcome back! :)</h1>\
        <br>\
        <form action="" method="post" accept-charset="utf-8">\
            <div class="input-pair">\
              <div class="form-field">\
                <div class="cv-input">\
                  <input type="text" name="username" value="" placeholder="USERNAME">\
                </div>\
              </div>\
              <div class="form-field">\
                <div class="cv-input">\
                  <input type="text" name="password" value="" placeholder="PASSWORD">\
                </div>\
              </div>\
            </div>\
            <div class="-col-6">\
              <div class="cv-check">\
                <input type="checkbox">\
                <span class="label">Remember me (?)</span>\
              </div>\
            </div>\
            <div class="-col-6">\
              <a href="#">Forgot your password?</a>\
            </div>\
            <br><br>\
            <input type="hidden" name="_csrf"  class="form-token" value="">\
            <button class="cv-button primary full">Sign In</button>\
        </form>\
        <br>\
        <p>Don\'t have an account yet? <a href="/signup">Sign Up!</a></p>\
    ',

    prototype        : {

        formType    : null,
        formAction  : null,
        formToken   : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            var login = this;
            var closeEl = this.element.find('.close-login');
            var formEl;

            switch(this.formType) {
                case 'signup':
                    var formEl = this.constructor.FORM_SIGNUP;
                    break;
                case 'login':
                    var formEl = this.constructor.FORM_LOGIN;
                    break;
                default:
                    var formEl = 'No form';
            }
            console.log($(formEl).find('form'));
            this.element.find('.form-container').append(formEl);
            this.element.find('form').attr('action', this.formAction);
            this.element.find('.form-token').attr('value', this.formToken);

            setTimeout(function(){
                login.show();
            }, 0);


            closeEl.on('click', function(){
              login.hide();
            });
        },

        show : function(){
            this.element.addClass('active');
            $('body').css('overflow', 'hidden');
        },
        hide : function(){
            this.element.removeClass('active');
            $('body').css('overflow', 'auto');
        }

    }

});










