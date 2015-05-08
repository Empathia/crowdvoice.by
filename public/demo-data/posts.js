var posts = [
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
module.exports = posts;