const config = {
  //Bot Owner, can eval and do other stuff
  "ownerID": "336442527408193537",

  //Bot Admin, can develop and restart the bot
  "admins": ["290374730991665154"],

  //Support for the bot, not needed
  "support": ["290374730991665154"],

  //Token of the bot, like the password of the bot
  "token": "no-token-4-u",

  //Default guild settings
  "defaultSettings" : {
    "prefix": "+",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true", 
    "welcomeChannel": "welcome",
    "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
    "welcomeEnabled": "false",
    "muteRole": "muted"
  },


  //Permlevels.
  permLevels: [
    { 
      level: 0,
      name: "User", 
      check: () => true
    },
    { 
      level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { 
      level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { 
      level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
    { 
      level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },
    { 
      level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    { 
      level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }, 
  ]
};

module.exports = config;