Class(CV, 'PostDetailLink').inherits(CV.PostDetail)({
    ELEMENT_CLASS : 'cv-post-detail cv-post-detail-link',
    HTML : '\
       <div>\
            <header class="cv-post-detail__header -clearfix"></header>\
            <div class="cv-post-detail__content -abs"></div>\
        </div>\
    ',

    prototype : {
        _reHTTPS : new RegExp("^https:"),
        _isHTTPS : false,

        init : function init(config) {
            CV.PostDetail.prototype.init.call(this, config);
            this.el = this.element[0];
            this.header = this.el.querySelector('header');
            this.content = this.el.querySelector('.cv-post-detail__content');

            this._isHTTPS = this._reHTTPS.test(window.location.protocol);

            this._setup().addCloseButton()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.PostDetailNavigation({
                name : 'navigation',
                className : '-float-right -full-height'
            })).render(this.header);

            this.appendChild(new CV.PostDetailLinkHeader({
                name : 'postDetailHeader',
                className : '-overflow-hidden -full-height'
            })).render(this.header);

            this.appendChild(new CV.PostDetailLinkIframe({
                name : 'iframe',
                className : '-full-height -color-bg-white'
            })).render(this.content);

            this.appendChild(new CV.PostDetailLinkNonCompatible({
                name : 'noncompatible',
                className : '-full-height -color-bg-black -color-white'
            })).render(this.content);

            requestAnimationFrame(function() {
                this.content.classList.add('active');
            }.bind(this));

            return this;
        },

        _bindEvents : function _bindEvents() {
            CV.PostDetail.prototype._bindEvents.call(this);
        },

        /* Update the UI.
         * @argumetn data <required> [PostEntity]
         */
        update : function update(data) {
            this.postDetailHeader.update(data);

            this.iframe.activate().update(location.pathname + data.id);

            // if (this._isProtocolCompatible(data.sourceUrl)) {
            //     this.iframe.activate().update(data.sourceUrl);
            //     this.noncompatible.deactivate();
            // } else {
            //     this.noncompatible.activate().update(data.sourceUrl);
            //     this.iframe.deactivate().update('');
            // }
        },

        updatedPosts : function updatedPosts() {
            // silence
        },

        _isProtocolCompatible : function _isProtocolCompatible(url) {
            if (this._isHTTPS === false) {
                return true;
            }

            if (this._reHTTPS.test(url) === false) {
                return false;
            }

            return true;
        },

        destroy : function destroy() {
            CV.PostDetail.prototype.destroy.call(this);
            return null;
        }
    }
});
