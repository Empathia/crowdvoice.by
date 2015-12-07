/* globals App */
var Person = require('./../lib/currentPerson');
var API = require('./../lib/api');
var Events = require('./../lib/events');
var inlineStyle = require('./../lib/inline-style');

Class(CV, 'VoiceView').includes(CV.WidgetUtils, CV.VoiceHelper, NodeSupport, CustomEventSupport)({
    STATUS_DRAFT : 'STATUS_DRAFT',
    STATUS_UNLISTED : 'STATUS_UNLISTED',
    STATUS_PUBLISHED : 'STATUS_PUBLISHED',
    STATUS_ARCHIVED : 'STATUS_ARCHIVED',

    TYPE_PUBLIC : 'TYPE_PUBLIC',
    TYPE_CLOSED : 'TYPE_CLOSED',

    prototype : {
        followerCount : 0,
        postCountElement : null,
        followersCountElement : null,
        aboutBoxButtonElement : null,
        scrollableArea : null,

        /* Contains all the years, months and its totals for approved and unapproved posts of the voice - Object */
        postsCount : null,
        postsCountApproved : 0,
        postsCountUnapproved : 0,
        /* Either the voice allows OR the user can create new posts for the current voice - Boolean */
        allowPosting : false,
        /* The user can edit posts on the current voice>? - Boolean */
        allowPostEditing : false,

        _window : null,
        _resizeTimer : null,
        _resizeTime : 250,
        _listenScrollEvent : true,
        _lastScrollTop : 0,
        _scrollTimer : null,
        _scrollTime : 250,
        /* layer offset left to perform hit-test on layer elements
         * sidebar = 60, main-container-padding-left = 40
         */
        _layersOffsetLeft : 70,

        LAYER_CLASSNAME : 'cv-voice-posts-layer__detector',

        /* socket io instance holder */
        _socket : null,

        /* @type {Object} VoiceModel
         */
        data : null,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this._window = window;
            this._body = document.body;
            this.postsCountApproved = this._formatPostsCountObject(this.postsCount.approved);
            this.postsCountUnapproved = this._formatPostsCountObject(this.postsCount.unapproved);
            this.postCount = this._getTotalPostCount(this.postsCountApproved);

            this._setup();
        },

        _setup : function _setup() {
            window.CardHoverWidget.register(document.querySelector('.voice-info__author'), this.data.owner);

            if (this.postCount === 0) {
                this._showOnboarding();
            } else {
                this._appendLayersManager();
                this._checkInitialHash();
                this._bindEvents();
            }

            return this;
        },

        /* Instantiate Widgets that give special behaviour to VoiceView, such as the AutoHide Header, Expandable Sidebar, Voice Footer, etc.
         * @method setupVoiceWidgets <public> [Function]
         * @return [CV.VoiceView]
         */
        setupVoiceWidgets : function setupVoiceWidgets() {
            if (!Person.get()) {
                this.appendChild(new CV.UI.Button({
                    name : 'createVoiceButton',
                    className : 'small primary',
                    data : {value: 'Create Voice'}
                })).render(App.header.buttonActionsWrapper, App.header.buttonActionsWrapper.firstElementChild);

                Events.on(this.createVoiceButton.el, 'click', function() {
                    window.location.href = '/login';
                });
            }

            if (Person.ownerOf('voice', this.data.id)) {
                App.header.removeCreateDropdown();

                this.appendChild(new CV.UI.Button({
                    name : 'editVoiceButton',
                    className : 'small primary',
                    data : {value: 'Edit this Voice'}
                })).render(App.header.buttonActionsWrapper, App.header.buttonActionsWrapper.firstElementChild);

                this._editVoiceButtonClickedRef = this._editVoiceButtonClicked.bind(this);
                Events.on(this.editVoiceButton.el, 'click', this._editVoiceButtonClickedRef);
            }

            // display the create content button if the voice allows posting.
            if (this.allowPosting) {
                this.appendChild(new CV.VoiceAddContent({
                    name : 'voiceAddContent',
                    voice : this.data
                })).render(document.body);
            }

            this.appendChild(new CV.VoiceFooter({
                name : 'voiceFooter',
                voice : this.data,
                allowPosting : this.allowPosting,
                allowPostEditing : this.allowPostEditing,
                voiceScrollableArea : this.scrollableArea,
                postCount : this.postCount,
                followerCount : this.followerCount,
                relatedVoices : this.relatedVoices,
                contributors : this.contributors
            })).render(document.querySelector('.cv-main-header'));

            this.appendChild(new CV.VoiceHeader({
                name : 'voiceHeader',
                element : document.getElementsByClassName('cv-main-header')[0],
                backgroundElement : this.backgroundElement,
                footerVoiceTitle : document.getElementsByClassName('voice-footer-meta-wrapper')[0],
                scrollableArea : this.scrollableArea
            }));

            this.appendChild(new CV.UI.EmbedOverlay({
                name : 'embedOverlay'
            })).render(document.body);

            this.embedOverlay.activate();
            
            if (this.onboarding){
                this.onboarding.setup();
            }

            return this;
        },

        /* Updates DOM Elements that are not widgets such as the backgroundCover and stats.
         * @method updateVoiceInfo <public> [Function]
         * @return [CV.Voice]
         */
        updateVoiceInfo : function updateVoiceInfo() {
            if (this.data.images.big && this.data.images.big.url) {
                var image = document.createElement('img');
                image.className = "voice-background-cover-image";
                image.src = this.data.images.big.url;
                this.backgroundElement.appendChild(image);
            } else {
                this.backgroundElement.className += ' -colored-background';
            }

            return this;
        },

        /* Show the onboarding message.
         * @method _showOnboarding <private>
         */
        _showOnboarding : function _showOnboarding() {
            this.appendChild(new CV.VoiceOboarding({
                name : 'onboarding',
                className : '-fixed -text-center'
            })).render(document.querySelector('.cv-main-content'));

            document.querySelector('.cv-main-content').insertAdjacentHTML('beforeend', '\
                <section class="voice-posts -rel">\
                    <div class="cv-voice-posts-layer first">\
                        <div class="cv-voice-posts-layer__posts"></div>\
                    </div>\
                </section>');

            this.appendChild(new CV.VoiceAboutBox({
                name : 'voiceAboutBox',
                description : this.data.description
            })).render(document.querySelector('.cv-voice-posts-layer__posts'));

            inlineStyle(this.voiceAboutBox.el, {
                top: '20px',
                left: '20px'
            });

            this.showAboutBoxRef = this.showAboutBoxButtonHandler.bind(this);
            Events.on(this.aboutBoxButtonElement, 'click', this.showAboutBoxRef);

            this._deactivateButtonRef = this._deactivateButton.bind(this);
            CV.VoiceAboutBox.bind('activate', this._deactivateButtonRef);

            this._activateButtonRef = this._activateButton.bind(this);
            CV.VoiceAboutBox.bind('deactivate', this._activateButtonRef);

            CV.VoiceAboutBox.bind('deactivate', function() {
                localStorage['cvby__voice' + this.data.id + '__about-read'] = true;
            }.bind(this));

            if (!localStorage['cvby__voice' + this.data.id + '__about-read']) {
                this.voiceAboutBox.activate();
            }
        },

        /* Checks if we have provided the information required before
         * appendind the VoicePostLayersManager Class. This method should be
         * called only once, right now it's being called by the init method.
         * @method _appendLayersManager <private>
         * @return undefined
         */
        _appendLayersManager : function _appendLayersManager() {
            if (!this.data.firstPostDate || !this.data.lastPostDate) {
                return console.warn('VoicePostLayersManager required firstPostDate or lastPostDate properties NOT to empty strings');
            }

            this.appendChild(new CV.VoicePostLayersVoiceAbstract({
                name : 'voicePostLayersManager',
                id : this.data.id,
                registry : CV.PostsRegistry,
                description : this.data.description,
                postsCount : this.postsCountApproved,
                scrollableArea : this.scrollableArea,
                allowPostEditing : this.allowPostEditing,
                _socket : this._socket
            })).render(document.querySelector('.cv-main-content'));

            this.voicePostLayersManager.setup();

            return this;
        },

        /* Checks the window hash to determinate which posts to requests for initial rendering.
         * If the hash does not match the format 'YYYY-MM' it will default to newest month, requesting the latest posts.
         * If necessary, it should scroll to the specific month to load, disabling the scroll-sniffing during the scrollTo animation.
         * This method should be run only once from init.
         * @method _checkInitialHash <private> [Function]
         */
        _checkInitialHash : function _checkInitialHash() {
            var hash = window.location.hash.replace(/^#!/, '');
            var matches = hash.match(/(^\d{4}-\d{2})(\/\w+)?/);

            if (!hash || !matches) {
                return this.voicePostLayersManager.loadDefaultLayer();
            }

            var month = matches[1];
            // var postId = matches[2];

            if (month && /^\d{4}-\d{2}/.test(month)) {
                // if is the very first layer, do not scrollTo, just load it
                if (month === this.voicePostLayersManager._layers[0].dateString) {
                    return this.voicePostLayersManager.loadDefaultLayer();
                }

                // otherwise, animate the scrolling
                this.voicePostLayersManager._jumpToHandlerRef({
                    dateString: month
                });

                return;
            }

            this.voicePostLayersManager.loadDefaultLayer();
        },

        _bindEvents : function _bindEvents() {
            this._scrollHandlerRef = this._scrollHandler.bind(this);
            Events.on(this.scrollableArea, 'scroll', this._scrollHandlerRef);

            this._resizeHandlerRef = this._resizeHandler.bind(this);
            Events.on(this._window, 'resize', this._resizeHandlerRef);

            this.showAboutBoxRef = this.showAboutBoxButtonHandler.bind(this);
            Events.on(this.aboutBoxButtonElement, 'click', this.showAboutBoxRef);

            this._deactivateButtonRef = this._deactivateButton.bind(this);
            CV.VoiceAboutBox.bind('activate', this._deactivateButtonRef);

            this._activateButtonRef = this._activateButton.bind(this);
            CV.VoiceAboutBox.bind('deactivate', this._activateButtonRef);

            this.layerLoadedRef = this.layerLoadedHandler.bind(this);
            this.voicePostLayersManager.bind('layerLoaded', this.layerLoadedRef);

            this.layerManagerReadyRef = this._layerManagerReadyHandler.bind(this);
            this.voicePostLayersManager.bind('ready', this.layerManagerReadyRef);

            this.bind('post:display:detail', function (ev) {
                this.displayGallery(ev);
            }.bind(this));

            this.bind('post:moderate:delete', this._postDelete.bind(this));
        },

        _editVoiceButtonClicked : function _editVoiceButtonClicked() {
            App.showCreateVoiceModal({
                voiceEntity : this.data,
                ownerEntity: Person.get()
            });
        },

        /* Listens the `post:moderate:delete` event bubbling up.
         * Deletes an specific published Post record.
         * @method _postDelete <private> [Function]
         * @return undefined
         */
        _postDelete : function _postDelete(ev) {
            ev.stopPropagation();

            if (Person.ownerOf('voice', ev.data.parent.voice.id) === false) {
                throw new Error('Not autorized to perform this action.');
            }

            API.postDelete({
                profileName : App.Voice.data.owner.profileName,
                voiceSlug : App.Voice.data.slug,
                postId : ev.data.parent.id
            }, function(err, res) {
                console.log(err);
                console.log(res);

                if (err) {
                    return;
                }

                var layer = ev.data.parent.parent;
                layer.removePost(ev.data.parent);
            }.bind(this));
        },

        /* Renders the PostDetail Overlay
         */
        displayGallery : function displayGallery(ev) {
            if (this.postDetailController) {
                this.postDetailController = this.postDetailController.destroy();
            }

            if (ev.data.approved) {
                this.postDetailController = new CV.PostDetailController({
                    socket : this._socket,
                    postData : ev.data,
                    registry : CV.PostsRegistry,
                    requestPostsSocketEventName : 'approvedMonthPosts',
                    responsePostsSocketEventName : 'getApprovedMonthPosts'
                });
            }

            if (ev.data.approved === false) {
                this.postDetailController = new CV.PostDetailControllerUnapproved({
                    socket : this._socket,
                    data : ev.data
                });
            }

            this.postDetailController.postDetailWidget.bind('deactivate', function() {
                this.postDetailController = this.postDetailController.destroy();
            }.bind(this));
        },

        loadLayer : function loadLayer(dateString, scrollDirection) {
            this._listenScrollEvent = false;
            this.voicePostLayersManager._beforeRequest(dateString, scrollDirection);
            this._listenScrollEvent = true;
        },

        /* Handle the scrollableArea scroll event.
         * @method _scrollHandler <private> [Function]
         */
        _scrollHandler : function _scrollHandler() {
            var st = this.voicePostLayersManager.getScrollTop();
            var scrollingUpwards = (st < this._lastScrollTop);
            var y = 0;
            var el;

            this.voiceFooter.el.style.pointerEvents = 'none';
            this.voiceHeader.el.style.pointerEvents = 'none';
            if (this.voiceAddContent) {
                this.voiceAddContent.el.style.pointerEvents = 'none';
            }

            if (!this._listenScrollEvent) { return; }

            if (!scrollingUpwards) {
                y = (this.voicePostLayersManager._windowInnerHeight - 1);

                this.voicePostLayersManager.getLayers().forEach(function(layer) {
                    var indicators = layer.getIndicators();
                    if (indicators.length) {
                        indicators.forEach(function(indicator) {
                            indicator.removeIndex();
                        });
                    }
                });
            } else {
                this.voicePostLayersManager.getLayers().forEach(function(layer) {
                    var indicators = layer.getIndicators();
                    if (indicators.length) {
                        indicators.forEach(function(indicator) {
                            indicator.addIndex();
                        });
                    }
                });
            }

            el = document.elementFromPoint(this._layersOffsetLeft, y);

            if (el.classList.contains(this.LAYER_CLASSNAME)) {
                if (el.dataset.date !== this.voicePostLayersManager._currentMonthString) {
                    this.loadLayer(el.dataset.date, scrollingUpwards);
                }
            }

            this._lastScrollTop = st;

            if (this._scrollTimer) {
                this._window.clearTimeout(this._scrollTimer);
            }

            this._scrollTimer = this._window.setTimeout(function() {
                this.voiceFooter.el.style.pointerEvents = '';
                this.voiceHeader.el.style.pointerEvents = '';
                if (this.voiceAddContent) {
                    this.voiceAddContent.el.style.pointerEvents = '';
                }
                this.voicePostLayersManager.loadImagesVisibleOnViewport();
            }.bind(this), this._scrollTime);
        },

        /* Handle the window resize event.
         * @method _resizeHandler <private> [Function]
         */
        _resizeHandler : function _resizeHandler() {
            var _this = this;

            if (this._resizeTimer) {
                this._window.clearTimeout(this._resizeTimer);
            }

            this._resizeTimer = this._window.setTimeout(function() {
                _this.voicePostLayersManager.update();
            }, this._resizeTime);
        },

        _deactivateButton : function _deactivateButton() {
            this.aboutBoxButtonElement.style.display = 'none';
        },

        _activateButton : function _activateButton() {
            this.aboutBoxButtonElement.style.display = '';
        },

        showAboutBoxButtonHandler : function showAboutBoxButtonHandler() {
            CV.VoiceView.dispatch('voiceAboutBox:show');
        },

        /* Initialize child widgets that depends on layerManager to be loaded with content.
         * @method _layerManagerReadyHandler <private> [Function]
         */
        _layerManagerReadyHandler : function _layerManagerReareldnaHdy(data) {
            var timestamp = data.layer.getIndicators()[0].getTimestamp();

            this.voiceFooter.setTimelineInitialDate(timestamp);
            this.voiceFooter.createJumpToDateBubble(this.postsCountApproved);

            this.voicePostLayersManager.unbind('ready', this.layerManagerReadyRef);
            this.layerManagerReadyRef = null;
        },

        layerLoadedHandler : function layerLoadedHandler(data) {
            this.voiceFooter.updateTimelineVars();
            this.voiceFooter.updateTimelineDatesMenu(data.dateString);
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);

            window.CardHoverWidget.unregister(document.querySelector('.voice-info__author'));

            Events.off(this.scrollableArea, 'scroll', this._scrollHandlerRef);
            this._scrollHandlerRef = null;

            Events.off(this.aboutBoxButtonElement, 'click', this.showAboutBoxRef);
            this.showAboutBoxRef = null;

            Events.off(this._window, 'resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;

            if (this._resizeTimer) {
                this._window.clearTimeout(this._resizeTimer);
            }

            if (this.editVoiceButton) {
                Events.off(this.editVoiceButton.el, 'click', this._editVoiceButtonClickedRef);
                this._editVoiceButtonClickedRef = null;
            }

            return null;
        }
    }
});
