/* jshint multistr: true */
Class(CV, 'PostCreatorFromSourcesQueue').inherits(Widget)({

    ELEMENT_CLASS : 'from-sources-content-right',

    HTML : '\
        <div class="-rel">\
            <div class="from-sources-queue-onboarding -color-grey-light -text-center">\
                <p>Add here the posts you want to include in this voice.<br/>You’ll be able to edit their title and description.</p>\
            </div>\
            <div class="from-sources-queue-list -text-center"></div>\
        </div>\
    ',

    prototype : {
        _index : 0,

        init : function init(config)  {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.list = this.el.querySelector('.from-sources-queue-list');
            this.onboarding = this.el.querySelector('.from-sources-queue-onboarding');
        },

        setSearchingState : function setSearchingState() {
            this.hideOnboarding();
            return this;
        },

        showOnboarding : function showOnboarding() {
            this.onboarding.classList.add('active');
            return this;
        },

        hideOnboarding : function hideOnboarding() {
            this.onboarding.classList.remove('active');
            return this;
        },

        addPost : function addPost(postData) {
            this.hideOnboarding();

            this.name = 'post_' + this._index;
            this.appendChild(CV.EditablePost.create(postData)).render(this.list).edit();

            this._index++;
        }
    }
});

