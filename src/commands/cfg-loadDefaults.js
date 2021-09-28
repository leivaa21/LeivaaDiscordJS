const defaults = {
    "prefix": "!",
    "welcomeChannel": "undefined",
    "welcomeMsg":"",
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

  import {replace} from 'replace-json-property'
  module.exports = {
      name: 'loadDefaults',
      description: `Set the configs all by default.`,
      async execute(message, args, config, readConfig) {
          if(args[1] != undefined) return message.channel.send(`Use ${config.prefix}config loadDefaults to run this command correctly`);
          replace(__dirname + "/../config.json", "prefix", defaults.prefix);
          replace(__dirname + "/../config.json", "welcomeChannel", defaults.welcomeChannel);
          replace(__dirname + "/../config.json", "welcomeMsg", defaults.welcomeMsg);
          replace(__dirname + "/../config.json", "maxDeleting", defaults.maxDeleting);
          replace(__dirname + "/../config.json", "botLogo", defaults.botLogo);
          replace(__dirname + "/../config.json", "botName", defaults.botName);
          replace(__dirname + "/../config.json", "leivaaLogo", defaults.leivaaLogo);
          replace(__dirname + "/../config.json", "color", defaults.color);
          replace(__dirname + "/../config.json", "colors", defaults.colors);
          readConfig();
          return message.channel.send(`Defaults loaded succesfuly`);
      }
  }