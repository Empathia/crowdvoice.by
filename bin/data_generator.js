var application = require('neonode-core');

// Load aws-sdk and S3
var AWS = require('aws-sdk');
global.amazonS3 = new AWS.S3(CONFIG.s3);

// Load image processors
global.gm = require('gm').subClass({imageMagick: true});
global.sharp = require('sharp');

var os = require('os');

var cpuLength = 2;

var casual = require('casual');

CONFIG.database.logQueries = true;

var data = {
  users : {},
  entities : {},
  organizations : {},
  voices : {},
  topics : {}
};

async.series([function(next) {
  var users = [
    {
      username : 'tyrion',
      email    : 'tyrion@example.com',
      password : '12345678'
    },
    {
      username : 'cersei',
      email    : 'cersei@example.com',
      password : '12345678'
    },
    {
      username : 'jamie',
      email    : 'jamie@example.com',
      password : '12345678'
    },
    {
      username : 'daenerys',
      email    : 'daenerys@example.com',
      password : '12345678'
    },
    {
      username : 'jon',
      email    : 'jon@example.com',
      password : '12345678'
    },
    {
      username : 'arya',
      email    : 'arya@example.com',
      password : '12345678'
    },
    {
      username : 'eddard',
      email    : 'eddard@example.com',
      password : '12345678'
    },
    {
      username : 'stannis',
      email    : 'stannis@example.com',
      password : '12345678'
    },
    {
      username : 'robert',
      email    : 'robert@example.com',
      password : '12345678'
    },
    {
      username : 'joffrey',
      email    : 'joffrey@example.com',
      password : '12345678'
    }
  ];

  async.each(users, function(user, nextUser) {
    var userInstance = new User(user);

    userInstance.save(function(err, result) {
      if (err) {
        return nextUser(err);
      }

      userInstance.token = null;

      userInstance.save(function(err, result) {
        if (err) {
          return nextUser(err);
        }

        data.users[userInstance.username] = userInstance;

        nextUser();
      });
    });
  }, next);
}, function(next) {
  // Entities

  var entities = [
    {
      data : {
        type        : 'person',
        name        : 'Tyrion',
        lastname    : 'Lannister',
        profileName : 'tyrion-lannister',
        isAnonymous : false
      },
      user : data.users.tyrion,
      image : path.join(process.cwd(), '/public/generator/users/tyrion.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/tyrion-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Cersei',
        lastname    : 'Lannister',
        profileName : 'cersei-lannister',
        isAnonymous : false
      },
      user : data.users.cersei,
      image : path.join(process.cwd(), '/public/generator/users/cersei.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/cersei-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Jamie',
        lastname    : 'Lannister',
        profileName : 'jamie-lannister',
        isAnonymous : false
      },
      user : data.users.jamie,
      image : path.join(process.cwd(), '/public/generator/users/jamie.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/jamie-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Daenerys',
        lastname    : 'Targaryen',
        profileName : 'daenerys-targaryen',
        isAnonymous : false
      },
      user : data.users.daenerys,
      image : path.join(process.cwd(), '/public/generator/users/daenerys.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/daenerys-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Jon',
        lastname    : 'Snow',
        profileName : 'jon-snow',
        isAnonymous : false
      },
      user : data.users.jon,
      image : path.join(process.cwd(), '/public/generator/users/jon.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/jon-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Arya',
        lastname    : 'Stark',
        profileName : 'arya-stark',
        isAnonymous : false
      },
      user : data.users.arya,
      image : path.join(process.cwd(), '/public/generator/users/arya.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/arya-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Eddard',
        lastname    : 'Stark',
        profileName : 'eddard-stark',
        isAnonymous : false
      },
      user : data.users.eddard,
      image : path.join(process.cwd(), '/public/generator/users/eddard.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/eddard-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Stannis',
        lastname    : 'Baratheon',
        profileName : 'stannis-baratheon',
        isAnonymous : false
      },
      user : data.users.stannis,
      image : path.join(process.cwd(), '/public/generator/users/stannis.png'),
      background : path.join(process.cwd(), '/public/generator/users/stannis-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Robert',
        lastname    : 'Baratheon',
        profileName : 'robert-baratheon',
        isAnonymous : false
      },
      user : data.users.robert,
      image : path.join(process.cwd(), '/public/generator/users/robert.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/robert-background.jpg')
    },
    {
      data : {
        type        : 'person',
        name        : 'Joffrey',
        lastname    : 'Baratheon',
        profileName : 'joffrey-baratheon',
        isAnonymous : false
      },
      user : data.users.joffrey,
      image : path.join(process.cwd(), '/public/generator/users/joffrey.jpg'),
      background : path.join(process.cwd(), '/public/generator/users/joffrey-background.jpg')
    }
  ];

  async.eachLimit(entities, cpuLength, function(entity, nextEntity) {
    var entityInstance = new Entity(entity.data);

    entityInstance.save(function(err, result) {
      if (err) {
        return nextEntity(err);
      }
      // console.log(entity.image)
      entityInstance.uploadImage('image', entity.image, function(err) {
        if (err) {
          return nextEntity(err);
        }

        entityInstance.uploadImage('background', entity.background, function(err) {
          if (err) {
            return nextEntity(err);
          }

          entityInstance.save(function(err, result) {
            if (err) {
              return nextEntity(err);
            }

            entity.user.entityId = entityInstance.id;

            entity.user.save(function(err, result) {
              if (err) {
                return nextEntity(err);
              }

              var shadowEntity = new Entity({
                type : 'person',
                name : 'Anonymous',
                lastname : null,
                profileName : 'anonymous_' + hashids.encode(entityInstance.id + new Date().getTime() + Math.round(Math.random() * 1000)),
                isAnonymous : true
              });

              shadowEntity.save(function(err, result) {
                if (err) {
                  return nextEntity(err);
                }

                entityInstance.setOwnershipTo(shadowEntity, function(err, result) {
                  if (err) {
                    return nextEntity(err);
                  }

                  data.entities[entityInstance.profileName] = entityInstance;

                  nextEntity();
                });
              });
            });
          });
        });
      });
    });
  }, next);
}, function(next) {

  // Organizations

  var organizations = [
    {
      data : {
        type        : 'organization',
        name        : 'House Stark',
        lastname    : null,
        profileName : 'house-stark',
        isAnonymous : false
      },
      owner : data.entities['eddard-stark'],
      members : [data.entities['arya-stark']],
      image : path.join(process.cwd(), '/public/generator/organizations/house-stark.jpg'),
      background : path.join(process.cwd(), '/public/generator/organizations/house-stark-background.jpg')
    },
    {
      data : {
        type        : 'organization',
        name        : 'House Lannister',
        lastname    : null,
        profileName : 'house-lannister',
        isAnonymous : false
      },
      owner : data.entities['cersei-lannister'],
      members : [data.entities['jamie-lannister'], data.entities['tyrion-lannister']],
      image : path.join(process.cwd(), '/public/generator/organizations/house-lannister.png'),
      background : path.join(process.cwd(), '/public/generator/organizations/house-lannister-background.jpg')
    },
    {
      data : {
        type        : 'organization',
        name        : 'House Targaryen',
        lastname    : null,
        profileName : 'house-targaryen',
        isAnonymous : false
      },
      owner : data.entities['daenerys-targaryen'],
      members : [],
      image : path.join(process.cwd(), '/public/generator/organizations/house-targaryen.jpg'),
      background : path.join(process.cwd(), '/public/generator/organizations/house-targaryen-background.jpg')
    },
    {
      data : {
        type        : 'organization',
        name        : 'House Baratheon',
        lastname    : null,
        profileName : 'house-baratheon',
        isAnonymous : false
      },
      owner : data.entities['robert-baratheon'],
      members : [data.entities['stannis-baratheon']],
      image : path.join(process.cwd(), '/public/generator/organizations/house-baratheon.JPG'),
      background : path.join(process.cwd(), '/public/generator/organizations/house-baratheon-background.png')
    }
  ];

  async.eachLimit(organizations, cpuLength, function(organization, nextOrganization) {
    var entityInstance = new Entity(organization.data);

    entityInstance.save(function(err, result) {
      if (err) {
        return nextOrganization(err);
      }

      entityInstance.uploadImage('image', organization.image, function(err) {
        if (err) {
          return nextOrganization(err);
        }

        entityInstance.uploadImage('background', organization.background, function(err) {
          if (err) {
            return nextOrganization(err);
          }

          entityInstance.save(function(err, result) {
            if (err) {
              return nextOrganization(err);
            }

            data.organizations[entityInstance.profileName] = entityInstance;

            // Set owner
            organization.owner.ownOrganization(entityInstance, function(err, result) {
              if (err) {
                return nextOrganization(err);
              }

              // Set members
              async.each(organization.members, function(member, nextMember) {
                entityInstance.addMember(member, nextMember);
              }, nextOrganization);
            });
          });
        })
      });
    });
  }, next);
}, function(next) {

  // Topics
  var topics = [
    {
      data : {
        name : 'Human Rights',
        slug : 'human-rights'
      },
      image : path.join(process.cwd(), '/public/generator/topics/health.png')
    },
    {
      data : {
        name : 'Politics',
        slug : 'politics'
      },
      image : path.join(process.cwd(), '/public/generator/topics/health.png')
    },
    {
      data : {
        name : 'Education',
        slug : 'education'
      },
      image : path.join(process.cwd(), '/public/generator/topics/health.png')
    },
    {
      data : {
        name : 'Health',
        slug : 'health'
      },
      image : path.join(process.cwd(), '/public/generator/topics/health.png')
    },
    {
      data : {
        name : 'Environment',
        slug : 'environment'
      },
      image : path.join(process.cwd(), '/public/generator/topics/health.png')
    },
    {
      data : {
        name : 'Privacy',
        slug : 'privacy'
      },
      image : path.join(process.cwd(), '/public/generator/topics/health.png')
    }
  ];


  async.each(topics, function(topic, done) {
    var topicInstance = new Topic({
      name : topic.data.name,
      slug : topic.data.slug
    });

    topicInstance.save(function(err, result) {
      if (err) {
        return done(err);
      }

      topicInstance.uploadImage('image', topic.image, function(err) {
        if (err) {
          return done(err);
        }

        data.topics[topicInstance.slug] = topicInstance;

        topicInstance.save(done);
      });
    });
  }, next);
}, function(next) {
  console.log('Voices')
  // Voices
  var voices = [

    // Tyrion
    {
      data : {
        title         : 'The Battle of the Blackwater',
        description   : 'The Battle of the Blackwater is the largest battle in the War of the Five Kings. The battle is fought between forces loyal to Stannis Baratheon and those loyal to Joffrey Baratheon. Stannis\'s army is on the verge of winning a decisive victory by defeating the rather large garrison of King\'s Landing, but is taken by surprise and all but annihilated by the joint forces of Tywin Lannister and the Tyrells.',
        ownerId       : data.entities['tyrion-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Mouth of the Blackwater Rush'
      },
      image : path.join(process.cwd(), '/public/generator/voices/blackwater-background.jpg'),
      slug  : 'blackwater-battle',
      topics : ['politics', 'environment']
    },
    {
      data : {
        title         : 'Second Trial by Combat',
        description   : 'The Second Trial by Combat of Tyrion Lannister is an event in the War of the Five Kings. As a result of the farce of a trial Tyrion Lannister is put through, he demands trial by combat to defend his innocence and ruin his father\'s plans to exile him to the Wall.',
        ownerId       : data.entities['tyrion-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Kings Landing'
      },
      image : path.join(process.cwd(), '/public/generator/voices/second-trial-by-combat.jpg'),
      slug  : 'second-trial-by-combat',
      topics : ['human-rights']
    },
    {
      data : {
        title         : 'War of the Five Kings',
        description   : 'The War of the Five Kings is a large, multi-theater conflict fought in the Seven Kingdoms from 298 AC until 300 AC, though some hostilities have resumed as a new claimant to the Iron Throne has arisen as well as a new King of the Iron Islands. As the name implies, over the course of the war five men claim the title of king: Joffrey Baratheon, Stannis Baratheon, and Renly Baratheon all claim the Iron Throne, whilst the separatists Robb Stark and Balon Greyjoy attempt to secede their lands from the rule of the Iron Throne, with Robb claiming the titles of King in the North and King of the Trident and Balon claiming to be King of the Isles and the North.',
        ownerId       : data.entities['tyrion-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_CLOSED,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Westeros'
      },
      image : path.join(process.cwd(), '/public/generator/voices/5kings-background.jpg'),
      slug  : 'war-of-the-5-kings',
      topics : ['politics']
    },
    {
      data : {
        title         : 'Valyrian roads',
        description   : 'Valyrian roads are broad stone highways built when the Valyrian Freehold dominated Essos. They are straight and usually ran from one economic center to another, allowing swift transport of goods.[1] They are also known as dragon roads.',
        ownerId       : data.entities['tyrion-lannister'].id,
        status        : Voice.STATUS_DRAFT,
        type          : Voice.TYPE_CLOSED,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Valyria'
      },
      image : path.join(process.cwd(), '/public/generator/voices/valyrian-roads.png'),
      slug  : 'valyrian-roads',
      topics : ['politics', 'environment', 'education']
    },
    {
      data : {
        title         : 'The Second Siege of Meereen',
        description   : 'Yunkai and her allies march on Meereen in order to cast down Queen Daenerys Targaryen and reinstall the government of the Great Masters as well as slavery.',
        ownerId       : data.entities['tyrion-lannister'].id,
        status        : Voice.STATUS_UNLISTED,
        type          : Voice.TYPE_CLOSED,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Valyria'
      },
      image : path.join(process.cwd(), '/public/generator/voices/siege-to-mereen.png'),
      slug  : 'meereen-siege',
      topics : ['politics', 'human-rights', 'environment', 'privacy']
    },

    // Cersei
    {
      data : {
        title         : 'Walk of atonement',
        description   : 'A walk of atonement[1] is a punishment in the Seven Kingdoms usually reserved to punish, humiliate and shame a woman publicly for either adultery or whoring. The custom is usually performed as both a punishment and a way to degrade a woman and rob her of her pride and power.',
        ownerId       : data.entities['cersei-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Kings Landing'
      },
      image : path.join(process.cwd(), '/public/generator/voices/walk-of-shame.jpg'),
      slug  : 'walk-of-atonement',
      topics : ['human-rights']
    },
    {
      data : {
        title         : 'The dead of Jon Arryn',
        description   : 'Lord Jon Arryn was the head of House Arryn, whose titles included Lord of the Eyrie, Defender of the Vale, and Warden of the East. He served as Hand of the King to Robert Baratheon from 283 AC until his unexpected death in 298 AC.',
        ownerId       : data.entities['cersei-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_CLOSED,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Kings Landing'
      },
      image : path.join(process.cwd(), '/public/generator/voices/dead-of-arryn.jpg'),
      slug  : 'dead-of-arryn',
      topics : ['politics', 'health']
    },

    // Jamie
    {
      data : {
        title         : 'Robert\'s Rebellion',
        description   : 'Robert\'s Rebellion, also known as the War of the Usurper,[1] was a rebellion against House Targaryen, primarily instigated by Eddard Stark, Jon Arryn, and Robert Baratheon, for whom it is named. It lasted "close to a year"[2] and resulted in the end of the Targaryen dynasty in the Seven Kingdoms and the beginning of Robert Baratheon\'s reign.',
        ownerId       : data.entities['jamie-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Kings Landing'
      },
      image : path.join(process.cwd(), '/public/generator/voices/roberts-rebelion.jpg'),
      slug  : 'roberts-rebelion',
      topics : ['politics']
    },

    // Daenerys
    {
      data : {
        title         : 'Siege of Meereen',
        description   : 'The siege of Meereen occurs in 299 AC when Daenerys Targaryen marches on Meereen, the last and the largest of the greatest slaver cities of Slaver\'s Bay.',
        ownerId       : data.entities['daenerys-targaryen'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Essos'
      },
      image : path.join(process.cwd(), '/public/generator/voices/road-to-meereen.jpg'),
      slug  : 'meereen',
      topics : ['politics', 'human-rights', 'education']
    },
    {
      data : {
        title         : 'A Dance with Dragons',
        description   : 'Dany struggles as ruler of Meereen, mainly due to the constant threats surrounding her. A portion of Meereen\'s former slaving families who call themselves the Sons of the Harpy fight a shadow war with her followers, attacking lone freedmen or Unsullied in the black of night and drawing a harpy nearby with the man\'s blood. The sons have also scrawled graffiti on the walls of Meereen in blood promising a death to the families of any who serve the Dragon Queen.',
        ownerId       : data.entities['daenerys-targaryen'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Meereen'
      },
      image : path.join(process.cwd(), '/public/generator/voices/dance-dragons.jpg'),
      slug  : 'a-dance-with-dragons',
      topics : ['environment']
    },

    // Jon
    {
      data : {
        title         : 'Battle of Castle Black',
        description   : 'The Battle of Castle Black takes place during the War of the Five Kings at Castle Black along the Wall in the North. The free folk or wildling masses under the command of the King-Beyond-the-Wall, Mance Rayder, attack the Night\'s Watch, who are originally under the command of a blacksmith, Donal Noye, and later under the command of a steward, Jon Snow. The Night\'s Watch is also joined by a host under the command of the King in the Narrow Sea, Stannis Baratheon.',
        ownerId       : data.entities['jon-snow'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Castle Black'
      },
      image : path.join(process.cwd(), '/public/generator/voices/castle-black.jpg'),
      slug  : 'battle-of-castle-black',
      topics : ['politics']
    },
    {
      data : {
        title         : 'White Walkers',
        description   : 'The White Walkers are a mythological race mentioned in ancient legends and stories from the time of the First Men and the Children of the Forest.',
        ownerId       : data.entities['jon-snow'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Beyond the wall'
      },
      image : path.join(process.cwd(), '/public/generator/voices/white-walkers.png'),
      slug  : 'white-walkers',
      topics : ['health']
    }
  ];

  async.eachLimit(voices, cpuLength, function(voice, nextVoice) {
    var voiceInstance = new Voice(voice.data);

    voiceInstance.save(function(err, result) {
      if (err) {
        return nextVoice(err);
      }

      voiceInstance.uploadImage('image', voice.image, function(err) {
        if (err) {
          return nextVoice(err);
        }

        voiceInstance.save(function(err, result) {
          if (err) {
            return nextVoice(err);
          }

          var slug = new Slug({
            voiceId : voiceInstance.id,
            url : voice.slug
          });

          slug.save(function(err, result) {
            if (err) {
              return nextVoice(err);
            }

            async.each(voice.topics, function(topic, nextTopic) {
              var voiceTopic = new VoiceTopic({
                voiceId : voiceInstance.id,
                topicId : data.topics[topic].id
              });

              voiceTopic.save(nextTopic);
            }, function(err) {
              if (err) {
                return nextVoice(err);
              }

              data.voices[slug.url] = voiceInstance;
              nextVoice();
            });
          });
        });
      });
    });
  }, next);
}, function(next) {

  // Voices by organizations
  var voices = [
    {
      data : {
        title         : 'Winterfell',
        description   : 'Winterfell is the seat of House Bolton (formerly House Stark). It is a very large castle located at the center of the North, from where the head of House Stark rules over his people. A small Godswood is enclosed within the walls. It is the capital of the North under King Robb Stark.',
        ownerId       : data.organizations['house-stark'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Winterfell'
      },
      image : path.join(process.cwd(), '/public/generator/voices/winterfell-background.jpg'),
      slug  : 'winterfell',
      topics : ['human-rights']
    },
    {
      data : {
        title         : 'Bran the Builder',
        description   : 'Brandon Stark, also known as Brandon the Builder and Bran the Builder, was the legendary founder[1] of House Stark who is said to have lived during the Age of Heroes.',
        ownerId       : data.organizations['house-stark'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'The Wall'
      },
      image : path.join(process.cwd(), '/public/generator/voices/bran-background.jpg'),
      slug  : 'bran-the-builder',
      topics : ['education', 'politics']
    },
    {
      data : {
        title         : 'Casterly Rock',
        description   : 'Casterly Rock, nicknamed the Rock, is a fortress and the seat of House Lannister. The capital of the Westerlands, it overlooks the harbor of Lannisport and the Sunset Sea. Nearby strongholds include Kayce and Feastfires to the west, Sarsfield to the north, and Cornfield and Clegane\'s Keep to the south.',
        ownerId       : data.organizations['house-lannister'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'Casterly Rock'
      },
      image : path.join(process.cwd(), '/public/generator/voices/casterly-rock.jpg'),
      slug  : 'casterly-rock',
      topics : ['health']
    },
    {
      data : {
        title         : 'King\'s Landing',
        description   : 'King\'s Landing is the capital of the Seven Kingdoms. It is located on the east coast of Westeros in the Crownlands, overlooking Blackwater Bay. It is the site of the Iron Throne and the Red Keep, the seat of the King of the Andals and the First Men. ',
        ownerId       : data.organizations['house-baratheon'].id,
        status        : Voice.STATUS_PUBLISHED,
        type          : Voice.TYPE_PUBLIC,
        latitude      : '4.815',
        longitude     : '162.342',
        locationName  : 'King\'s Landing'
      },
      image : path.join(process.cwd(), '/public/generator/voices/kings-landing.jpg'),
      slug  : 'kings-landing',
      topics : ['politics', 'human-rights', 'health']
    }
  ];

  async.eachLimit(voices, cpuLength, function(voice, nextVoice) {
    var voiceInstance = new Voice(voice.data);

    voiceInstance.save(function(err, result) {
      if (err) {
        return nextVoice(err);
      }

      voiceInstance.uploadImage('image', voice.image, function(err) {
        if (err) {
          return nextVoice(err);
        }

        voiceInstance.save(function(err, result) {
          if (err) {
            return nextVoice(err);
          }

          var slug = new Slug({
            voiceId : voiceInstance.id,
            url : voice.slug
          });

          slug.save(function(err, result) {
            if (err) {
              return nextVoice(err);
            }

            async.each(voice.topics, function(topic, nextTopic) {
              var voiceTopic = new VoiceTopic({
                voiceId : voiceInstance.id,
                topicId : data.topics[topic].id
              });

              voiceTopic.save(nextTopic);
            }, function(err) {
              if (err) {
                return nextVoice(err);
              }

              data.voices[slug.url] = voiceInstance;
              nextVoice();
            });
          });
        });
      });
    });
  }, next);

}, function(next) {

  // FeaturedVoices
  var featured = [
    data.voices.winterfell,
    data.voices.meereen,
    data.voices['second-trial-by-combat'],
    data.voices['blackwater-battle'],
    data.voices['meereen-siege'],
    data.voices['battle-of-castle-black'],
    data.voices['walk-of-atonement'],
    data.voices['kings-landing'],
    data.voices['valyrian-roads']
  ];

  async.each(featured, function(voice, nextFeatured) {
    var featuredVoice = new FeaturedVoice({
      voiceId : voice.id,
      position : featured.indexOf(voice) || 0
    });

    featuredVoice.save(nextFeatured);
  }, next);
}, function(next) {

  // Follow persons
  async.series([function(done) {
    data.entities['tyrion-lannister'].followEntity(data.entities['jamie-lannister'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followEntity(data.entities['jamie-lannister'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followEntity(data.entities['cersei-lannister'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followEntity(data.entities['tyrion-lannister'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followEntity(data.entities['joffrey-baratheon'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followEntity(data.entities['robert-baratheon'], done);
  }, function(done) {
    data.entities['daenerys-targaryen'].followEntity(data.entities['tyrion-lannister'], done);
  }, function(done) {
    data.entities['jon-snow'].followEntity(data.entities['arya-stark'], done);
  }, function(done) {
    data.entities['jon-snow'].followEntity(data.entities['eddard-stark'], done);
  }, function(done) {
    data.entities['arya-stark'].followEntity(data.entities['jon-snow'], done);
  }, function(done) {
    data.entities['arya-stark'].followEntity(data.entities['eddard-stark'], done);
  }, function(done) {
    data.entities['eddard-stark'].followEntity(data.entities['arya-stark'], done);
  }, function(done) {
    data.entities['robert-baratheon'].followEntity(data.entities['cersei-lannister'], done);
  }, function(done) {
    data.entities['robert-baratheon'].followEntity(data.entities['jamie-lannister'], done);
  }, function(done) {
    data.entities['joffrey-baratheon'].followEntity(data.entities['cersei-lannister'], done);
  }, function(done) {
    data.entities['joffrey-baratheon'].followEntity(data.entities['jamie-lannister'], done);
  }], next);
}, function(next) {

  // Follow Voices and organizations

  async.series([function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['walk-of-atonement'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices.meereen, done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['dead-of-arryn'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['casterly-rock'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['kings-landing'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['battle-of-castle-black'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['white-walkers'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['winterfell'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['bran-the-builder'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['roberts-rebelion'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followVoice(data.voices['meereen'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followVoice(data.voices['casterly-rock'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followVoice(data.voices['roberts-rebelion'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followVoice(data.voices['winterfell'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followVoice(data.voices['blackwater-battle'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followVoice(data.voices['war-of-the-5-kings'], done);
  }, function(done)  {
    data.entities['cersei-lannister'].followVoice(data.voices['valyrian-roads'], done);
  }, function(done) {
    data.entities['cersei-lannister'].followVoice(data.voices['second-trial-by-combat'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['blackwater-battle'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['war-of-the-5-kings'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['valyrian-roads'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['meereen-siege'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['second-trial-by-combat'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['casterly-rock'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['kings-landing'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['winterfell'], done);
  }, function(done) {
    data.entities['jamie-lannister'].followVoice(data.voices['dead-of-arryn'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followEntity(data.organizations['house-stark'], done);
  }, function(done) {
    data.entities['tyrion-lannister'].followEntity(data.organizations['house-lannister'], done);
  }], next);
}, function(next) {

  // Threads And Messages

  async.series([function(done) {
    MessageThread.findOrCreate({
      senderPerson : data.entities['tyrion-lannister'],
      senderEntity : data.entities['tyrion-lannister'],
      receiverEntity : data.entities['jon-snow']
    }, function(err, thread) {
      if (err) {
        return done(err);
      }

      async.series([function(doneMessage) {
        thread.createMessage({
          senderPersonId : data.entities['tyrion-lannister'].id,
          message : 'Look at me and tell me what you see.'
        }, doneMessage);
      }, function(doneMessage) {
        thread.createMessage({
          senderPersonId : data.entities['jon-snow'].id,
          message : 'Is this a trick?'
        }, doneMessage);
      }, function(doneMessage) {
        thread.createMessage({
          senderPersonId : data.entities['tyrion-lannister'].id,
          message : 'What you see is a dwarf. If I had been born a peasant, they might have left me out in the woods to die. Alas, I was born a Lannister of Casterly Rock. Things are expected of me. My father was the Hand of the King for twenty years. '
        }, doneMessage);
      }, function(doneMessage) {
        thread.createMessage({
          senderPersonId : data.entities['jon-snow'].id,
          message : 'Until your brother killed that king.'
        }, doneMessage);
      }, function(doneMessage) {
        thread.createMessage({
          senderPersonId : data.entities['tyrion-lannister'].id,
          message : 'Yes. Until my brother killed him. Life is full of these little ironies. My sister married the new king, and my repulsive nephew will be king after him. I must do my part for the honor of my house; wouldn\'t you agree? But how? Well, my brother has his sword, and I have my mind. And a mind needs books like a sword needs a whetstone. That\'s why I read so much, Jon Snow. '
        }, doneMessage);
      }], done);
    })
  }], next);
}, function(next) {

  // Posts
  Voice.all(function(err, voices) {

    async.eachLimit(voices, 1, function(voice, done) {
      var year = 2015;
      var month = 5;

      var count = 0;
      var youtubes = [
        'https://www.youtube.com/watch?v=tHX55Bxnc-A',
        'https://www.youtube.com/watch?v=kNSv7DF5QrY',
        'https://www.youtube.com/watch?v=EH5E2dJx91E',
        'https://www.youtube.com/watch?v=tHX55Bxnc-A',
        'https://www.youtube.com/watch?v=f4RGU2jXQiE'
      ];

      async.timesLimit(250, cpuLength, function(id, nextPost) {
        var post =  new Post();

        var type = casual['random_element'](['image', 'video', 'link']);

        post.title = casual.title;
        post.description = casual.description;

        post.sourceType = type;

        if (type === 'video') {
          post.sourceService = 'youtube';
          post.sourceUrl = casual['random_element'](youtubes) + '?' + casual.random;
        } else {
          post.sourceService = 'link';
          post.sourceUrl = casual.url  + '?' + casual.random;
        }

        post.approved = casual['random_element']([true, false]);

        var date =  new Date(year + '-' + month + '-' + casual.integer(from = 1, to = 28));
        post.createdAt = date;
        post.updatedAt = date;
        post.publishedAt = date;

        post.voiceId = voice.id;
        post.ownerId = voice.ownerId;
        count++;

        if (count === 50) {
          month--;
          count = 0;
        }

        if (month === 0) {
          month = 12;
          year--;
        }

        var width = casual.integer(from = 200, to = 350);
        var height = casual.integer(from = 100, to = 400);

        if (type === 'video') {
          width = 350;
          hegith = 197;
        };

        var url = 'http://lorempixel.com/' + width + '/' + height + '/';

        post.save(function(err, postRes) {
          if (err) {
            return nextPost(err);
          }

          post.uploadImage('image', url, function() {

            post.save(function(err, result) {
              nextPost(err, post);
            });
          });
        });

      }, function(err, posts) {
        if (err) {
          return done(err);
        }
        done();
      });

    }, next);
  });

}], function(err) {
  if (err) {
    logger.error(err);
    console.error(data);
  }

  process.exit(0);
});
