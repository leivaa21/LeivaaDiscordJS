import {} from 'dotenv/config'

import Discord from 'discord.js'

const DiscordBot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');


let config = {
    "prefix": "",
    "CanalBienvenida": "",
    "idInformacion": "",
    "idReglas": "",
    "maxDeleting": 0,
    "logobot": "",
    "nombrebot": "",
    "color": "",
    "leivaaLogo": "",
    "colors": {}
}


function readConfig() {
    fs.readFile(__dirname + '/config.json', 'utf-8', (err, jsonString) => {
        if(err) return console.log(err); 
        try{
            config = JSON.parse(jsonString); 
            console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ] ACTUAL CONFIG\n\x1b[36m| >\x1b[0m Prefix = "+config.prefix+"\n\x1b[36m| >\x1b[0m MaxDeleting = "+config.maxDeleting);
        } catch(err) {
            console.log('[ERROR] Parsing JSON failed! ', err)
        }
    })
}

readConfig();



DiscordBot.login(process.env.discord_token)
DiscordBot.on('ready', () => {
    console.log('[\x1b[33m LeivaaDiscordJS\x1b[0m ]' + '\x1b[32m is logged in\x1b[0m');


});

DiscordBot.commands = new Discord.Collection();

const CommandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
let countCommands = 0;
for (const file of CommandFiles) {
    const command = require(`./commands/${file}`);
    DiscordBot.commands.set(command.name, command);
    countCommands ++;
}
console.log('[\x1b[33m LeivaaDiscordJS\x1b[0m ] ' + '\x1b[33m' + countCommands +'\x1b[0m commands founded and loaded.');

DiscordBot.on('message', async(message) => {
    console.log(message.author.username + ": " + message.content);
    if (message.content.startsWith(config.prefix)) {

        const args = message.content.slice(config.prefix.length).split(/ +/);
        const command = args.shift().toLocaleLowerCase();

        //Comandos generales:

        if (command === 'ping') {
            return message.reply(`🏓 pong!`);
        }
        if (command === 'poll') {
            return DiscordBot.commands.get('poll').execute(message, args, config, Discord);
        }
        if(command === 'help'){
            return DiscordBot.commands.get('help').execute(message, config, Discord, DiscordBot);
        }
        
        //Comandos para el staff
        if (command === 'kick') {
            //Comprobar permisos
            if (!message.member.hasPermission(['KICK_MEMBERS'])) return message.reply('No tienes permisos suficientes para kickear a una persona del servidor.').then(msg => msg.delete({ timeout: 3 * 1000 }));
            DiscordBot.commands.get('kick').execute(message, config);
        }
        if (command === 'ban') {
            if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply(`No tienes permisos suficientes para banear una persona del servidor.`).then(msg => msg.delete({ timeout: 3 * 1000 }));
            DiscordBot.commands.get('ban').execute(message, args, config);
        }
        if (command === 'clear') {
            if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply(`No tienes permisos suficientes para borrar mensajes.`).then(msg => msg.delete({ timeout: 3 * 1000 }));
            DiscordBot.commands.get('clear').execute(message, args, config);
        }
        if (command === 'reactionrole') {
            if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.reply('No puedes utilizar este comando!');
            DiscordBot.commands.get('reactionrole').execute(message, config, Discord, DiscordBot);
        }
        if (command === 'config') {
            if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.reply('No puedes utilizar este comando!');
            
            if( args[0] == 'prefix' )return DiscordBot.commands.get('prefix').execute(message, args, config, readConfig);
            if( args[0] == 'colors' )return DiscordBot.commands.get('colors').execute(message, args, config, Discord);
            if( args[0] == 'setColor' )return DiscordBot.commands.get('setColor').execute(message, args, config, readConfig);
            return DiscordBot.commands.get('config').execute(message, config, Discord, DiscordBot);
        }
    }
})

DiscordBot.commands.get('welcome').execute(config, DiscordBot, Discord);