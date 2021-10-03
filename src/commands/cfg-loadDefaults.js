const defaults = {
    "prefix": "!",
    "welcomeChannel": "undefined",
    "welcomeMsg":"undefined",
    "maxDeleting": 20,
    "botLogo": "https://i.imgur.com/sNCtn86.png",
    "botName": "leivaaStdio",
    "leivaaLogo": "https://i.imgur.com/dZWwv1R.png",
    "color": "#FFFFFF",
    "colors": {
      "WHITE": "#FFFFFF",
      "AQUA": "#1ABC9C",
      "PINK": "#E91E63",
      "GREEN": "#2ECC71",
      "GOLD": "#F1C40F",
      "BLUE": "#3498DB",
      "ORANGE": "#E67E22",
      "PURPLE": "#9B59B6",
      "RED": "#E74C3C",
      "YELLOW": "#FFFF00"
    }
  }
  let rrDefaults = {
    "idMsg":"undefined",
    "title": "undefined",
    "channel": "undefined",
    "description": "undefined",
    "nRoles": 0,
    "rol1":{
        "id":"",
        "emoji":"",
        "description":""
    },
    "rol2":{
        "id":"",
        "emoji":"",
        "description":""
    },
    "rol3":{
        "id":"",
        "emoji":"",
        "description":""
    }
}
  
  import {replace} from 'replace-json-property'
  module.exports = {
      name: 'loadDefaults',
      description: `Set the configs all by default.`,
      async execute(message, args, config) {
          if(args[1] != undefined) return message.channel.send(`Use ${config.prefix}config loadDefaults to run this command correctly`);
          replace(__dirname + "/../configs/config.json", "prefix", defaults.prefix);
          replace(__dirname + "/../configs/config.json", "welcomeChannel", defaults.welcomeChannel);
          replace(__dirname + "/../configs/config.json", "welcomeMsg", defaults.welcomeMsg);
          replace(__dirname + "/../configs/config.json", "maxDeleting", defaults.maxDeleting);
          replace(__dirname + "/../configs/config.json", "botLogo", defaults.botLogo);
          replace(__dirname + "/../configs/config.json", "botName", defaults.botName);
          replace(__dirname + "/../configs/config.json", "leivaaLogo", defaults.leivaaLogo);
          replace(__dirname + "/../configs/config.json", "color", defaults.color);
          replace(__dirname + "/../configs/config.json", "colors", defaults.colors);
          
          replace(__dirname + "/../configs/rrConfig.json", "idMsg", rrDefaults.idMsg);
          replace(__dirname + "/../configs/rrConfig.json", "title", rrDefaults.title);
          replace(__dirname + "/../configs/rrConfig.json", "channel", rrDefaults.channel);
          replace(__dirname + "/../configs/rrConfig.json", "description", rrDefaults.description);
          replace(__dirname + "/../configs/rrConfig.json", "nRoles", rrDefaults.nRoles);
          replace(__dirname + "/../configs/rrConfig.json", "rol1", rrDefaults.rol1);
          replace(__dirname + "/../configs/rrConfig.json", "rol2", rrDefaults.rol2);
          replace(__dirname + "/../configs/rrConfig.json", "rol3", rrDefaults.rol3);

          return message.channel.send(`Defaults loaded succesfuly`);
      }
  }