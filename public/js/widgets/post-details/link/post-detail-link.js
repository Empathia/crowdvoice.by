Class(CV, 'PostDetailLink').inherits(CV.PostDetail)({
    ELEMENT_CLASS : 'cv-post-detail cv-post-detail-link',
    HTML : '\
       <div>\
            <header class="cv-post-detail__header -clearfix"></header>\
            <div class="cv-post-detail__content -abs"></div>\
        </div>\
    ',

    prototype : {
        _posts : null,
        _ids : null,
        _currentIndex : null,

        init : function init(config) {
            CV.PostDetail.prototype.init.call(this, config);
            this.el = this.element[0];
            this.header = this.el.querySelector('header');
            this.content = this.el.querySelector('.cv-post-detail__content');

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
            this.content.classList.add('active');
            this.iframe.update('').update(data.sourceUrl);
        },

        destroy : function destroy() {
            CV.PostDetail.prototype.destroy.call(this);
            return null;
        }
    }
});