/**
 * Imports
 */
import {} from 'dotenv/config'
import Discord from 'discord.js'
import fs from 'fs'

/**
* Setup the config & function readConfig();
*/
let config = {
    "prefix": "",
    "welcomeChannel": "",
    "welcomeMsg":"",
    "maxDeleting": 0,
    "botLogo": "",
    "botName": "",
    "leivaaLogo": "",
    "color": "",
    "colors": {}
}
/**
 * Function that reads config.json and save it in the previous 
 * variable "config"
 */
function readConfig() {
    fs.readFile(__dirname + '/configs/config.json', 'utf-8', (err, jsonString) => {
        if(err) return console.log(err); 
        
        config = JSON.parse(jsonString) 
        
        var color;
        for(var namecolor in config.colors){
            if(config.colors[namecolor]==config.color) color = namecolor;
        }

        console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ] ACTUAL CONFIG\n"
            +"\x1b[36m| >\x1b[0m Prefix = "+config.prefix+"\n"
            +"\x1b[36m| >\x1b[0m MaxDeleting = "+config.maxDeleting+"\n"
            +"\x1b[36m| >\x1b[0m welcomeChannel = "+config.welcomeChannel+"\n"
            +"\x1b[36m| >\x1b[0m welcomeMsg = "+config.welcomeMsg+"\n"
            +"\x1b[36m| >\x1b[0m color = "+color);
    })
}
readConfig();

/**
 * Setup the reactionRole config & readRrConfig();
 */
let rrConfig = {
    "idMsg": "",
    "title": "",
    "channel": "",
    "message": "",
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

/**
 * Function that reads rrConfig.json and save it in the previous 
 * variable "rrConfig"
 */

function readRrConfig() {
    fs.readFile(__dirname + '/configs/rrConfig.json', 'utf-8', (err, jsonString) => {
        if(err) return console.log(err); 
        
        rrConfig = JSON.parse(jsonString) 
        

        console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ] ACTUAL RRCONFIG\n"
            +"\x1b[36m| >\x1b[0m IdMsg = "+rrConfig.idMsg+"\n"
            +"\x1b[36m| >\x1b[0m Title = "+rrConfig.title+"\n"
            +"\x1b[36m| >\x1b[0m Message = "+rrConfig.message+"\n"
            +"\x1b[36m| >\x1b[0m Channel = "+rrConfig.channel+"\n"
            +"\x1b[36m| >\x1b[0m nRoles = "+rrConfig.nRoles+"\n");
    })
}
readRrConfig();
/**
 * DiscordBot Instance & login
 */
const DiscordBot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
DiscordBot.login(process.env.discord_token)
DiscordBot.on('ready', () => {
    console.log('[\x1b[33m LeivaaDiscordJS\x1b[0m ]' + '\x1b[32m is logged in\x1b[0m');
});

/**
 * Creating the command collection and reading all 
 * the commands of ./commands.
 */
DiscordBot.commands = new Discord.Collection();

const CommandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
let countCommands = 0;
for (const file of CommandFiles) {
    const command = require(`./commands/${file}`);
    DiscordBot.commands.set(command.name, command);
    countCommands ++;
}
console.log('[\x1b[33m LeivaaDiscordJS\x1b[0m ] ' + '\x1b[33m' + countCommands +'\x1b[0m commands founded and loaded.');


/**
 * Welcome command if someone joins the server
 */
DiscordBot.on('guildMemberAdd', async(member) =>{
    DiscordBot.commands.get('welcome').execute(member, config, Discord);
})


/**
 * Controlling the users chat commands
 */
DiscordBot.on('message', async(message) => {
    console.log(message.author.username + ": " + message.content);
    if (message.content.startsWith(config.prefix)) {

        const args = message.content.slice(config.prefix.length).split(/ +/);
        const command = args.shift().toLocaleLowerCase();

        /**
         * Global Commands (marked as global- on ./commands)
         */

        if (command === 'ping') {
            return message.reply(`🏓 pong!`);
        }
        if (command === 'poll') {
            return DiscordBot.commands.get('poll').execute(message, args, config, Discord);
        }
        if(command === 'help'){
            return DiscordBot.commands.get('help').execute(message, config, Discord, DiscordBot);
        }

        /**
         * Moderation Commands (marked as mod- on ./commands)
         */
        if (command === 'kick') {
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

        /**
         * Admin Commands (marked as adm- on ./commands)
         */
        if (command === 'config') {
            if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.reply('No puedes utilizar este comando!');
            
            /**
             * All the config command options
             */
            
            
            if( args[0] == 'display' ) return DiscordBot.commands.get('cfg-display').execute(message, config, Discord);

            if( args[0] == 'loadDefaults' ){
                DiscordBot.commands.get('loadDefaults').execute(message, args, config);
                readConfig(); //Updating the config loaded 
                readRrConfig(); //Updating the rrConfig loaded 
                return;
            } 
            if( args[0] == 'prefix' ){
                DiscordBot.commands.get('prefix').execute(message, args, config);
                readConfig(); //Updating the config loaded 
                return;
            }
            if( args[0] == 'maxDeleting' ){
                DiscordBot.commands.get('maxDeleting').execute(message, args, config);
                readConfig(); //Updating the config loaded 
                return;
            } 
            if( args[0] == 'colors' ){
                DiscordBot.commands.get('colors').execute(message, args, config, Discord);
                readConfig(); //Updating the config loaded 
                return;
            } 
            if( args[0] == 'color' ){
                DiscordBot.commands.get('color').execute(message, args, config);
                readConfig(); //Updating the config loaded 
                return;
            } 
            if( args[0] == 'welcomeChannel' ){
                DiscordBot.commands.get('welcomeChannel').execute(message, args, config);
                readConfig(); //Updating the config loaded 
                return;
            } 
            if( args[0] == 'welcomeMsg' ){
                DiscordBot.commands.get('welcomeMsg').execute(message, args, config);
                readConfig(); //Updating the config loaded 
                return;
            } 
            
            /**
             * All the reaction role config command options
             */

            if(args[0] == 'reactionRole'){

                if(args[1] == 'display'){
                    return DiscordBot.commands.get('cfgrr-display').execute(message, config, rrConfig, Discord);
                    
                }
                if(args[1] == 'setChannel'){
                    DiscordBot.commands.get('cfgrr-setChannel').execute(message, args, config);
                    readRrConfig();
                    return;
                }
                if(args[1] == 'setTitle'){
                    DiscordBot.commands.get('cfgrr-setTitlers').execute(message, args, config);
                    readRrConfig();
                    return;
                }
                if(args[1] == 'setMsg'){
                    DiscordBot.commands.get('cfgrr-setMsg').execute(message, args, config);
                    readRrConfig();
                    return;
                }
                if(args[1] == 'addRole'){
                    DiscordBot.commands.get('cfgrr-addRole').execute();
                    readRrConfig();
                    return;
                }

                return DiscordBot.commands.get('cfg-reactionRole').execute(message, config, Discord, DiscordBot);
                
            }



            return DiscordBot.commands.get('config').execute(message, config, Discord, DiscordBot);
        }
    }
})

