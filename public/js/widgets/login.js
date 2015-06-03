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
            <div class="form-errors">\
            </div>\
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
                <input type="text" class="username" name="username" value="" placeholder="Username"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" class="name" name="name" value="" placeholder="Name"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" class="lastname" name="lastname" value="" placeholder="Lastname"><br>\
              </div>\
            </div>\
            <div class="form-field -row">\
              <div class="-col-6"><span class="-dim">http://www.crowdvoice.by/@</span></div>\
              <div class="-col-6">\
                <div class="cv-input">\
                  <input type="text" class="profileName" name="profileName" value="" placeholder="Profilename"><br>\
                </div>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" class="email" name="email" value="" placeholder="my@email.com"><br>\
              </div>\
            </div>\
            <div class="form-field">\
              <div class="cv-input">\
                <input type="text" class="password" name="password" value="" placeholder="Password"><br>\
              </div>\
            </div>\
            <div class="cv-check" style="display: none;">\
              <input type="checkbox" class="input-checkbox isAnonymous" name="isAnonymous" value="true" checked>\
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
                  <input type="text" class="username" name="username" value="" placeholder="USERNAME">\
                </div>\
              </div>\
              <div class="form-field">\
                <div class="cv-input">\
                  <input type="text" class="password" name="password" value="" placeholder="PASSWORD">\
                </div>\
              </div>\
            </div>\
            <div class="-col-6">\
              <div class="cv-check">\
                <input type="checkbox" class="input-checkbox" value="false">\
                <span class="label">Remember me (?)</span>\
              </div>\
            </div>\
            <div class="-col-6">\
              <a href="/session/forgot-password">Forgot your password?</a>\
            </div>\
            <br><br>\
            <input type="hidden" name="_csrf"  class="form-token" value="">\
            <button class="cv-button primary full">Sign In</button>\
        </form>\
        <br>\
        <p>Don\'t have an account yet? <a href="/signup">Sign Up!</a></p>\
    ',

    FORM_FORGOT_PASSWORD : '\
      <h1>It\'s ok. It happens.</h1>\
      <p>Please enter the email address you used to sign up and we will send you instructions to reset your password to gain back access to CrowdVoice.by.</p>\
      <br>\
      <form action="" method="post" accept-charset="utf-8">\
        <div class="form-field">\
          <div class="cv-input">\
            <input type="text" class="email" placeholder="YOUR EMAIL">\
          </div>\
        </div>\
        <input type="hidden" name="_csrf" class="form-token" value="">\
        <button class="cv-button primary full">Submit</button>\
      </form>\
    ',

    FORM_RESET_PASSWORD : '\
      <h1>Type in a new password.</h1>\
      <p>This time make sure you choose something you will remember.\
      Actually, you might want to read <a href="#">this article</a>. It will help :)</p>\
      <br>\
      <form action="" method="post" accept-charset="utf-8">\
        <div class="form-field">\
          <div class="cv-input">\
            <input type="text" class="password" placeholder="YOUR PASSWORD">\
          </div>\
        </div>\
        <div class="cv-check">\
          <input type="checkbox">\
          <span class="label">Show your password to make sure you typed it correctly.</span>\
        </div>\
        <br><br>\
        <input type="hidden" name="_csrf" class="form-token" value="">\
        <button class="cv-button primary full">Reset Password</button>\
      </form>\
    ',

    prototype        : {

        formType    : null,
        formAction  : null,
        formToken   : null,
        formEl      : null,
        errorsEl    : null,

        init : function(config){
            Widget.prototype.init.call(this, config);
            var login = this;
            var closeEl = this.element.find('.close-login');
            this.errorsEl = this.element.find('.form-errors');

            var formEl;

            switch(this.formType) {
                case 'signup':
                    var formEl = this.constructor.FORM_SIGNUP;
                    break;
                case 'login':
                    var formEl = this.constructor.FORM_LOGIN;
                    break;
                case 'forgot-password':
                    var formEl = this.constructor.FORM_FORGOT_PASSWORD;
                    break;
                case 'reset-password':
                    var formEl = this.constructor.FORM_RESET_PASSWORD;
                    break;
                default:
                    //¯\_(ツ)_/¯
            }



            this.element.find('.form-container').append(formEl);
            this.element.find('form').attr('action', this.formAction);
            this.element.find('.form-token').attr('value', this.formToken);

            var buttonEl = this.element.find('button');
            this.formEl = this.element.find('form');
            this.checkEl = this.element.find('.input-checkbox');

            var validUsername = false;
            var validProfileName = false;

            if (this.formType === 'signup') {

              this.element.find("input.name, input.lastname").blur(function() {
                  if ($("input.name").val() != "" && $("input.lastname").val() != ""){
                    if ($("input.profileName").val() == ""){
                      var profileName = $("input.name").val() +"_"+ $("input.lastname").val();
                      $("input.profileName").val(profileName.toLowerCase()).change();
                    }
                  }
              });

              this.formEl.find('.username').on('keyup', function(e) {
                $.ajax({
                  type: "POST",
                  url: '/signup/check-username',
                  headers: { 'csrf-token': login.formToken },
                  data: { field : 'username' , value : ($(e.target).val()).trim()},
                  success: function(data) {
                    if (data && data.username === 'unavailable') {
                      login.errorsEl.empty();
                      login.errorsEl.append('<p><b>Username</b> is already taken.</p>')
                      login.errorsEl.show();
                      buttonEl.attr('disabled', true);
                    } else {
                      login.errorsEl.empty();
                      login.errorsEl.hide();
                      buttonEl.attr('disabled', false);
                    }
                  },
                  dataType: 'json',
                });

              });

              this.formEl.find('.profileName').on('propertychange change click keyup input paste', function(e) {
                $.ajax({
                  type: "POST",
                  url: '/signup/check-username',
                  headers: { 'csrf-token': login.formToken },
                  data: { field : 'profileName' , value : ($(e.target).val()).trim()},
                  success: function(data) {
                    if (data && data.profileName === 'unavailable') {
                      login.errorsEl.empty();
                      login.errorsEl.append('<p><b>Profilename</b> is already taken.</p>')
                      login.errorsEl.show();
                      buttonEl.attr('disabled', true);
                    } else {
                      login.errorsEl.empty();
                      login.errorsEl.hide();
                      buttonEl.attr('disabled', false);
                    }
                  },
                  dataType: 'json',
                });

              });

            }

            setTimeout(function(){
                login.show();
            }, 0);


            closeEl.on('click', function(){
              //login.hide();
              window.location.href = '/';
            });

            buttonEl.on("click",function(e){
                var formValidation = login.validate();
                var validForm = formValidation[1];
                var formErrors = formValidation[0];

                if (!validForm){
                  login.errorsEl.empty();
                  login.errorsEl.show();

                  for (var error in formErrors.errors) {
                      var replaceStr = error;
                      var errorStr = formErrors.errors[error].message.replace(replaceStr, '<b>'+replaceStr+'</b>');
                      login.errorsEl.append('<p>' + errorStr + '</p>')
                  }
                  return false;
                  e.preventDefault;
                }else{
                  formEl.submit();
                }

            });

            this.checkEl.on('click', function(){
              this.checked(this.checkEl);
            }.bind(this));

        },

        checked : function(check) {
            if (check[0].checked)
            {
                check.attr('value', 'true');
            }else{
                check.attr('value', 'false');
            }
        },

        validate: function(){
          this.formValidated =  true;
          var checkit, body;

          switch(this.formType) {
              case 'signup':
                checkit = new Checkit({
                  'Username'      : ['required'],
                  'Name'          : 'required',
                  'Lastname'      : 'required',
                  'Profile Name'  : 'required',
                  'Email'         : ['required', 'email'],
                  'Password'      : 'required'
                });

                body = {
                  'Username'      : this.formEl.find('.username').val(),
                  'Name'          : this.formEl.find('.name').val(),
                  'Lastname'      : this.formEl.find('.lastname').val(),
                  'Profile Name'  : this.formEl.find('.profileName').val(),
                  'Email'         : this.formEl.find('.email').val(),
                  'Password'      : this.formEl.find('.password').val(),
                };
                break;

              case 'login':
                checkit = new Checkit({
                    'Username'      : 'required',
                    'Password'      : 'required'
                  });

                  body = {
                    'Username'      : this.formEl.find('.username').val(),
                    'Password'      : this.formEl.find('.password').val(),
                  };
                  break;

              case 'forgot-password':
                checkit = new Checkit({
                    'Email'      : ['required', 'email'],
                  });

                  body = {
                    'Email'      : this.formEl.find('.email').val(),
                  };
                  break;

              case 'forgot-password':
                checkit = new Checkit({
                    'Password'      : 'required',
                  });

                  body = {
                    'Password'      : this.formEl.find('.password').val(),
                  };
                  break;

              default:
                  //¯\_(ツ)_/¯
          }

          return checkit.validateSync(body);

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










