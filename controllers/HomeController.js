var HomeController = Class('HomeController')({
  prototype : {
    init : function (){
      this._initRouter();
      return this;
    },

    _initRouter : function() {
      application.router.route('/').get(this.index);
      application.router.route('/inner').get(this.inner);
      application.router.route('/kabinett').get(this.kabinett);
    },

    index : function(req, res) {
      res.render('home/index.html', {
        layout : 'application',

        pageName : 'page-home',

        /* =========================================================================== *
         *  HEADER STATS
         * =========================================================================== */
        globalStats : {
          countries: 36,
          organizations: 148,
          voices: 312,
          posts: 579371,
          people: 22665729
        },

        /* =========================================================================== *
         *  FEATURED VOICES
         * =========================================================================== */
        featuredVoices : [
          {
            url : '/inner',
            tags : [
              {
                name: 'Current Events',
                url: '/topic/current-events'
              },
              {
                name: 'Health',
                url: '/topic/health'
              }
            ],
            image_cover : '/img/sample/covers/feat-00.jpg',
            author : {
              avatar: '/img/sample/avatars/sm/org-00.jpg',
              username: 'guardian',
              url: '/organization-test'
            },
            title: 'Continued Effects of the Fukushima Disaster',
            description: 'On March 11, 2011, a tsunami and earthquake damaged the Fukushima Daiichi power plant in Fukushima, Japan. Subsequent equipment failures led to the release of nuclear material into the surrounding ground and ocean. It is regarded as the biggest nuclear disaster since Chernobyl. Initially, studies conducted by TEPCO, the company operating the plant, concluded that the risks',
            followers : 3296,
            updated_at: '2015-03-30T13:59:47Z',
            gallery : []
          },

          {
            url : '/inner',
            tags : [
              {
                name: 'Conflict',
                url: '/topic/conflict'
              }
            ],
            image_cover : '/img/sample/covers/feat-01.jpg',
            author : {
              avatar: '/img/sample/avatars/sm/org-00.jpg',
              username: 'guardian',
              url: '/organization-test'
            },
            title: 'Ferguson Unrest',
            description: 'An ongoing series of protests and civil disorder began the day after the fatal shooting of Michael Brown on August 9, 2014, in Ferguson, Missouri. The unrest sparked a vigorous debate',
            followers : 288,
            updated_at: '2015-04-23T13:59:47Z',
            gallery : ['/img/sample/covers/feat-00.jpg', '/img/sample/covers/feat-01.jpg', '/img/sample/covers/feat-02.jpg']
          },

          {
            url : '/inner',
            tags : [
              {
                name: 'Conflict',
                url: '/topic/conflict'
              }
            ],
            image_cover : '/img/sample/covers/feat-02.jpg',
            author : {
              avatar: '/img/sample/avatars/sm/org-00.jpg',
              username: 'guardian',
              url: '/organization-test'
            },
            title: 'Civil War in Syria',
            description: 'With thousands of schools destroyed in the conflict, and families being displaced from their homes and communities, maintaining any meaningful form of structured education',
            followers : 763,
            updated_at: '2015-04-22T13:59:47Z',
            gallery : ['/img/sample/covers/feat-00.jpg', '/img/sample/covers/feat-01.jpg', '/img/sample/covers/feat-02.jpg']
          },

          {
            url : '/inner',
            tags : [
              {
                name: 'Politics',
                url: '/topic/politics'
              }
            ],
            image_cover : '/img/sample/covers/feat-00.jpg',
            author : {
              avatar: '/img/sample/avatars/sm/org-00.jpg',
              username: 'guardian',
              url: '/organization-test'
            },
            title: 'U.S Presidential Elections 2016',
            description: 'The United States presidential election of 2016 will be the 58th quadrennial U.S. presidential election and is scheduled for Tuesday, November 8, 2016. Voters in the election will',
            followers : 324,
            updated_at: '2015-04-21T13:59:47Z',
            gallery : []
          },

          {
            url : '/inner',
            tags : [
              {
                name: 'Current Events',
                url: '/topic/current-events'
              }
            ],
            image_cover : '/img/sample/covers/feat-00.jpg',
            author : {
              avatar: '/img/sample/avatars/sm/org-00.jpg',
              username: 'guardian',
              url: '/organization-test'
            },
            title: 'Unemployment in Detroit',
            description: 'The latest extension is the fourth since the recession began, which means some unemployed workers in the state could qualify for up to 99 weeks of benefits',
            followers : 172,
            updated_at: '2015-04-21T13:59:47Z',
            gallery : []
          }
        ],

        /* =========================================================================== *
         *  CATEGORIES
         * =========================================================================== */
        categories : [
          {
            name: 'Poverty & Hunger',
            image_cover: '/img/sample/covers/cat-00.jpg',
            url: '/topic/poverty-and-hunger'
          },
          {
            name: 'Politics',
            image_cover: '/img/sample/covers/cat-01.jpg',
            url: '/topic/politics'
          },
          {
            name: 'Education',
            image_cover: '/img/sample/covers/cat-02.jpg',
            url: '/topic/education'
          },
          {
            name: 'Environment',
            image_cover: '/img/sample/covers/cat-03.jpg',
            url: '/topic/environment'
          },
          {
            name: 'Health',
            image_cover: '/img/sample/covers/cat-04.jpg',
            url: '/topic/health'
          },
          {
            name: 'Conflict',
            image_cover: '/img/sample/covers/cat-05.jpg',
            url: '/topic/conflict'
          },
          {
            name: 'Current Events',
            image_cover: '/img/sample/covers/cat-06.jpg',
            url: '/topic/current-events'
          },
          {
            name: 'Wildlife',
            image_cover: '/img/sample/covers/cat-07.jpg',
            url: '/topic/wildlife'
          },
          {
            name: 'Information',
            image_cover: '/img/sample/covers/cat-08.jpg',
            url: 'topic/information'
          },
          {
            name: 'Freedom of Speech',
            image_cover: '/img/sample/covers/cat-09.jpg',
            url: 'topic/freedom-of-speech'
          },
        ],

        /* =========================================================================== *
         *  MOST ACTIVE ORGANIZATIONS
         * =========================================================================== */
        mostActiveOrganizations : [
          {
            type: 'organization',
            author : {
              profile_url : '/organization-test',
              profile_cover : 'img/sample/covers/org-00.jpg',
              avatar : 'img/sample/avatars/org-00.jpg',
              username : 'OpenGovFoundation',
              full_name : 'OpenGovFoundation',
              description : "Building free technologies to support your ability to participate in gov't & hold it accountable. http://AmericaDecoded.org , MyMadison.io, #OpenGov & #OpenData",
              location : 'London, UK',
              created_at : '2015-02-10T13:59:47Z',
              total_voices : 32,
              collaborators : 12,
              followers : 3541
            }
          },
          {
            type: 'organization',
            author : {
              profile_url : '/organization-test-1',
              profile_cover : 'img/sample/covers/org-01.jpg',
              avatar : 'img/sample/avatars/org-01.jpg',
              username : 'guardian',
              full_name : 'The Guardian',
              description : "Winner of the Pulitzer prize. Top stories, special features, live blogs and more.",
              location : 'London, UK',
              created_at : '2015-02-20T13:59:47Z',
              total_voices : 27,
              collaborators : 6,
              followers : 1215
            }
          },
          {
            type: 'organization',
            author : {
              profile_url : '/organization-test-2',
              profile_cover : 'img/sample/covers/org-02.jpg',
              avatar : 'img/sample/avatars/org-02.jpg',
              username : 'SyriaDeeply',
              full_name : 'Syria Deeply',
              description : "An independent single-topic news site focusing on stories and commentary about the war in Syria. Analysis and breaking news about Syria.",
              location : 'Oxford, UK',
              created_at : '2015-02-28T13:59:47Z',
              total_voices : 25,
              collaborators : 9,
              followers : 2739
            }
          },
          {
            type: 'organization',
            author : {
              profile_url : '/organization-test-3',
              profile_cover : 'img/sample/covers/org-03.jpg',
              avatar : 'img/sample/avatars/org-03.jpg',
              username : 'IPPF',
              full_name : 'International Planned Parenthood Federation',
              description : 'We aim to improve the quality of life of individuals by campaigning for sexual and reproductive health and rights.',
              location : 'London, UK',
              created_at : '2015-01-01T13:59:47Z',
              total_voices : 32,
              collaborators : 12,
              followers : 3541
            }
          },
          {
            type: 'organization',
            author : {
              profile_url : '/organization-test-4',
              profile_cover : 'img/sample/covers/org-04.jpg',
              avatar : 'img/sample/avatars/org-04.jpg',
              username : 'Schoolzilla',
              full_name : 'Schoolzila',
              description : 'Schoolzilla empowers schools to do more with data. Collect and organize all your data to find the insights that matter.',
              location : 'Oackland, CA',
              created_at : '2015-03-01T13:59:47Z',
              total_voices : 27,
              collaborators : 6,
              followers : 1215
            }
          },
          {
            type: 'organization',
            author : {
              profile_url : '/organization-test-5',
              profile_cover : 'img/sample/covers/org-05.jpg',
              avatar : 'img/sample/avatars/org-05.jpg',
              username : 'OXFAM',
              full_name : 'OXFAM Internationl',
              description : 'Our vision is a just world without poverty. A world where people are valued and treated equally enjoying their rights as full citizens.',
              location : 'Oxford, UK',
              created_at : '2015-02-01T13:59:47Z',
              total_voices : 25,
              collaborators : 9,
              followers : 2729
            }
          }
        ]
      });
    },

    inner : function(req, res) {
      res.render('home/inner.html', {
        layout : 'application',

        currentUser : {},

        voiceInfo : {
          id: '',
          title: 'Continued Effects of the Fukushima Disaster',
          description: '<p>On March 11, 2011, a tsunami and earthquake damaged the Fukushima Daiichi power plant in Fukushima, Japan. Subsequent equipment failures led to the release of nuclear material into the surrounding ground and ocean. Initially, studies conducted by TEPCO, the company operating the plant, concluded that the risks posed by the fallout were relatively small, and that radioactive material from the incident had been contained.</p>\
            <p>On July 22, 2013, it came to light that Fukushima Daiichi is still leaking into the Pacific Ocean, and that over 300 metric tons of contaminated water had been released since the disaster, posing a possible threat to ecosystems and public health.</p>',
          latitude: '',
          longitud: '',
          status: 'STATUS_PUBLIC',
          firstPostDate: '',
          lastPostDate: '',
          postCount: 17,
          followersCount: 310,
          createdAt: '2015-03-30T13:59:47Z',
          updatedAt: '2015-03-30T13:59:47Z',
          author : {
            name : 'The Guardian',
            avatar : {
              medium: 'org-01.jpg',
              small : 'org-00.jpg'
            }
          }
        },

        /* =========================================================================== *
         *  POSTS
         * =========================================================================== */
        posts : [
          {
            source_type: 'link',
            source_url: 'http://google.com',
            source_service: 'The Huffington Post',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: 'In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora',
            image_url: '/img/sample/posts/link-00.jpg',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z',
          },

          {
            source_type: 'link',
            source_url: 'http://google.com',
            source_service: 'The Huffington Post',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: '',
            image_url: '/img/sample/posts/link-01.jpg',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z',
          },

          {
            source_type: 'link',
            source_url: 'http://google.com',
            source_service: 'The Huffington Post',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: 'In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora',
            image_url: '',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z',
          },

          {
            source_type: 'video',
            source_url: 'https://www.youtube.com/watch?v=20Whc4WIz-Y',
            source_service: 'youtube',
            title: 'Lorem Ipsum Dolor Sit Amet, Consectetur',
            description: 'Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia.',
            image_url: '/img/sample/posts/video-00.jpg',
            total_reposts: 2,
            total_saves: 1,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'video',
            source_url: 'https://www.youtube.com/watch?v=Opktm709TJo',
            source_service: 'youtube',
            title: 'Lorem Ipsum Dolor Sit Amet, Consectetur',
            description: '',
            image_url: '/img/sample/posts/video-01.jpg',
            total_reposts: 2,
            total_saves: 1,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'video',
            source_url: 'https://www.youtube.com/watch?v=20Whc4WIz-Y',
            source_service: 'youtube',
            title: '',
            description: '',
            image_url: '/img/sample/posts/video-02.jpg',
            total_reposts: 2,
            total_saves: 1,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'link',
            source_url: 'http://google.com',
            source_service: 'The Guardian',
            title: 'Nulla Facilisi. Duis Aliquet Egestas Purus In Blandit. Curabitur',
            description: '',
            image_url: '/img/sample/posts/image-00.jpg',
            total_reposts: 2,
            total_saves: 1,
            created_at: '2015-03-30T13:59:47Z',
          },

          {
            source_type: 'audio',
            source_url: '/img/sample/Halloween_Vocals-Mike_Koenig-517765553.mp3',
            source_service: '',
            audio_duration: '0:33',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: 'Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia.',
            image_url: '/img/sample/posts/image-01.jpg',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'audio',
            source_url: 'http://soundbible.com/grab.php?id=2080&type=mp3',
            source_service: '',
            audio_duration: '0:33',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: 'Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia.',
            image_url: '/img/sample/posts/image-01.jpg',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'audio',
            source_url: 'http://upload.wikimedia.org/wikipedia/commons/1/15/Alice_Arnold_voice.ogg',
            source_service: '',
            audio_duration: '0:15',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: '',
            image_url: '/img/sample/posts/image-02.jpg',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'audio',
            source_url: 'http://upload.wikimedia.org/wikipedia/commons/2/27/Edmund_Yeo_-_voice_-_ch_150127_1828.wav',
            source_service: '',
            audio_duration: '0:29',
            title: 'Donec Congue Lacinia Dui, A Porttitor Lectus',
            description: 'Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia.',
            image_url: '',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'audio',
            source_url: 'http://upload.wikimedia.org/wikipedia/commons/0/06/Dewey-Hagborg.ogg',
            source_service: '',
            audio_duration: '0:47',
            title: '',
            description: '',
            image_url: '',
            total_reposts: 12,
            total_saves: 4,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'image',
            source_url: '',
            source_service: '',
            title: 'In Condimentum Facilisis Porta Sed Nec Diam Eu Diam',
            description: 'Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.',
            image_url: '/img/sample/posts/image-03.jpg',
            total_reposts: 62,
            total_saves: 17,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'image',
            source_url: '',
            source_service: '',
            title: 'In Condimentum Facilisis Porta Sed Nec Diam Eu Diam',
            description: '',
            image_url: '/img/sample/posts/image-04.jpg',
            total_reposts: 62,
            total_saves: 17,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'image',
            source_url: '',
            source_service: '',
            title: '',
            description: '',
            image_url: '/img/sample/posts/image-05.jpg',
            total_reposts: 62,
            total_saves: 17,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'quote',
            source_url: '',
            source_service: '',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
            description: 'Sergio De La Garza, 1978',
            image_url: '',
            total_reposts: 0,
            total_saves: 0,
            created_at: '2015-03-30T13:59:47Z'
          },

          {
            source_type: 'video',
            source_url: 'https://vimeo.com/20729832',
            source_service: 'vimeo',
            title: 'In Pellentesque Faucibus Vestibulum. Nulla At Nulla',
            description: 'Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia.',
            image_url: '/img/sample/posts/video-03.jpg',
            total_reposts: 2,
            total_saves: 1,
            created_at: '2015-03-30T13:59:47Z'
          }
        ]
      });
    },

    kabinett : function(req, res) {
        res.render('test/index.html', {layout: 'application'});
    }
  }
});

module.exports = new HomeController();
