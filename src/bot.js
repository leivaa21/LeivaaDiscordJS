/**
 * Imports
 */
import {} from 'dotenv/config'
import Discord from 'discord.js'
import Config from './models/config'
import loadCommands from './utils/loadCommands'


/************************************************************/
/* > Setting Up the Bot                                     */
/**
 * Load configs and display on cmd when the configs are loaded.
 * @see class /models/config.js
 */
new Config(() => {
    console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ]\n"
    +"\x1b[36m| > Config loaded correctly\x1b[0m");
}, () => {
    console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ]\n"
    +"\x1b[36m| > ReactionRole Config loaded correctly\x1b[0m");
});
    

/**
 * DiscordBot Instance & login
 * @see documentation https://discord.js.org/#/docs/main/stable/general/welcome
 */
const DiscordBot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
DiscordBot.login(process.env.discord_token)
DiscordBot.on('ready', () => {
    //Displaying on console when the bot is ready to work
    console.log('[\x1b[33m LeivaaDiscordJS\x1b[0m ]' + '\x1b[32m is logged in\x1b[0m');
});

/**
 * Creating the command collection and reading all 
 * the commands of ./commands.
 * @see documentation https://discord.js.org/#/docs/main/stable/class/ApplicationCommandManager
 * @see function /utils/loadCommands.js
 */
DiscordBot.commands = new Discord.Collection();
let countCommands = loadCommands(DiscordBot);
//Displaying on console how much commands the bot has loaded.
console.log('[\x1b[33m LeivaaDiscordJS\x1b[0m ] ' + '\x1b[33m' + countCommands +'\x1b[0m commands founded and loaded.');
/************************************************************/

/************************************************************/
/* > Bot Automated things                                   */

/**
 * WelcomeMessage (if configured)
 * @see command /commands/auto-welcome.js
 */
DiscordBot.on('guildMemberAdd', async(member) =>{
    return DiscordBot.commands.get('welcome').execute(member, Config, Discord);
})


/**
 * Reaction Role Management (Adding and removing roles)
 * @see command /commands/auto-reactionRoleAdd
 * @see command /commands/auto-reactionRoleRemove
 */

DiscordBot.on('messageReactionAdd', async(reaction, user) => {
    Config.reload();
    return await DiscordBot.commands.get('reactionRoleAdd').execute(reaction, user, Config.getReactionRole());
});
DiscordBot.on('messageReactionRemove', async(reaction, user) => {
    Config.reload();
    return await DiscordBot.commands.get('reactionRoleRemove').execute(reaction, user, Config.getReactionRole());
});

/************************************************************/

/************************************************************/
/* > Controlling the users chat commands                    */

DiscordBot.on('message', async(message) => {
    //Displaying on console the author, channel, content and ID of every msg on the guild. 
    console.log(`\x1b[33m${message.author.username}\x1b[0m at\x1b[36m #${message.channel.name} \x1b[0m: ${message.content} \n\x1b[36m| > \x1b[31m MessageID: \x1b[32m ${message.id}\x1b[0m`);
    
    //filter commands messages from no command messages
    if (message.content.startsWith(Config.getGlobal().prefix)) {
        //get rid of the prefix and separating the content on an array so it's easier to work with it
        const args = message.content.slice(Config.getGlobal().prefix.length).split(/ +/);
        //get the command from the args[0] slot (now args[0] is the first word after the command)
        const command = args.shift();
        //always compare the command on lowercase so its not case sensitive
        switch(command.toLowerCase()){
            /************************************************************/
            /* > Global Commands, everyone can do it, marked as global- */

            //just a command that when someone write "${prefix}ping" the bot will reply with pong!
            case 'ping':
                message.reply(`🏓 pong!`).then(msg => msg.delete({ timeout: 3 * 1000 }));
                break;
            /**
             * Create a simple yes/no poll.
             * @see command /commands/global-poll 
             */
            case 'poll':
                DiscordBot.commands.get('poll').execute(message, args, Config, Discord)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;
            /**
             * Displays a help embed
             * @see command /commands/global-help
             */
            case 'help':
                DiscordBot.commands.get('help').execute(message, Config, Discord, DiscordBot);
                break;
            /************************************************************/

            /************************************************************/
            /* > Mod Commands, require some permissions, marked as mod- */
            
            /**
             * kick someone
             * @see command /commands/mod-kick
             */
            case 'kick':
                //Check if user have permissions to kick
                if (!message.member.hasPermission(['KICK_MEMBERS'])) {
                    message.reply(`You dont have permissions to \`kick\` someone`)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                DiscordBot.commands.get('kick').execute(message, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;

            /**
             * ban someone
             * @see command /commands/mod-ban
             */
            case 'ban':
                //Check if user have permissions to ban
                if (!message.member.hasPermission(['BAN_MEMBERS'])) {
                    message.reply(`You dont have permissions to \`ban\` someone`)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                DiscordBot.commands.get('ban').execute(message, args, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;

            /**
             * Remove n messages on chat
             * @see command /commands/mod-clear
             */
            case 'clear':
                //Check if user have permissions to manage messages
                if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
                    message.reply(`You dont have permissions to \`clear messages\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                DiscordBot.commands.get('clear').execute(message, args, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;
            /************************************************************/

            /************************************************************/
            /* > Admin Commands, require admin, marked as adm-          */

            /**
             * saves the actual config on a json file
             * @see class /models/config.js
             * @see function config::saveConfigs
             * @see command /commands/adm-saveConfig.js
             */
            case 'saveconfig':
                //Check if user is admin
                if (!message.member.hasPermission(['ADMINISTRATOR'])){
                    message.reply(`To run this command you need more power \`(Just for admins :c)\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                DiscordBot.commands.get('adm-saveConfig').execute(message, args, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                Config.reload();
                break;
            /**
             * loads the saved config json file
             * @see class /models/config.js
             * @see function config::loadSaved
             * @see command /commands/adm-loadConfig.js
             */
            case 'loadconfig':
                //Check if user is admin
                if (!message.member.hasPermission(['ADMINISTRATOR'])){
                    message.reply(`To run this command you need more power \`(Just for admins :c)\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                DiscordBot.commands.get('adm-loadConfig').execute(message, args, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                Config.reload();
                break;
            /**
             * Send the reaction role embed and active it if its configured
             * @see command /commands/adm-reactionRole.js
             */
            case 'reactionrole':
                //Check if user is admin
                if (!message.member.hasPermission(['ADMINISTRATOR'])){
                    message.reply(`To run this command you need more power \`(Just for admins :c)\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                DiscordBot.commands.get('adm-reactionRole').execute(message, Config, Discord)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                Config.reload();
                break;
            /**
             * Here start all the configs commands
             * @see class config
             * @see commands /commands/cfg- && /commands/cfgrr-
             */
            case 'config': 

                /**
                 * All the config command options
                 */
                //Check if user is admin
                if (!message.member.hasPermission(['ADMINISTRATOR'])){
                    message.reply(`To run this command you need more power \`(Just for admins :c)\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }
                if(args[0] == undefined) return DiscordBot.commands.get('config').execute(message, Config, Discord, DiscordBot);
                switch(args[0].toLowerCase()){

                    case 'display':
                        DiscordBot.commands.get('cfg-display').execute(message, Config, Discord);
                        break;

                    case 'loaddefaults':
                        await DiscordBot.commands.get('loadDefaults').execute(message, args, Config) //FIX THIS LATTER WITH CONFIG METHOD = RESETCONFIG
                            .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                        break;

                    case 'prefix':
                        await DiscordBot.commands.get('prefix').execute(message, args, Config)
                            .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                        break;

                    case 'maxdeleting':
                        await DiscordBot.commands.get('maxDeleting').execute(message, args, Config)
                            .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                        break;

                    case 'colors':
                        await DiscordBot.commands.get('colors').execute(message, args, Config, Discord)
                            .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                        break;

                    case 'color':
                        await DiscordBot.commands.get('color').execute(message, args, Config)
                            .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined}); 
                        break;

                    case 'welcomechannel':
                        await DiscordBot.commands.get('welcomeChannel').execute(message, args, Config)
                            .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                        break;

                    case 'welcomemsg':
                        await DiscordBot.commands.get('welcomeMsg').execute(message, args, Config).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined}); 
                        break;

                    case 'reactionrole':
                        /**
                         * All the reaction role config command options
                         */
                        if (args[1] == undefined)  DiscordBot.commands.get('cfg-reactionRole').execute(message, Config, Discord, DiscordBot);
                        else switch(args[1].toLowerCase()){

                            case 'display':
                                DiscordBot.commands.get('cfgrr-display').execute(message, Config, Discord);
                                break;
                            case 'setTitle':
                                await DiscordBot.commands.get('cfgrr-seTitle').execute(message, args, Config).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                                break;
                            case 'setchannel':
                                await DiscordBot.commands.get('cfgrr-setChannel').execute(message, args, Config).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                                break;

                            case 'setmsg':
                                await DiscordBot.commands.get('cfgrr-setMsg').execute(message, args, Config).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                                break;

                            case 'addrole':
                                await DiscordBot.commands.get('cfgrr-addRole').execute(message, args, Config, DiscordBot).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                                break;

                            case 'removerole':
                                await DiscordBot.commands.get('cfgrr-removeRole').execute(message, args, Config, DiscordBot).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                                break;

                            default:
                                await DiscordBot.commands.get('cfg-reactionRole').execute(message, Config, Discord, DiscordBot).then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                                break;
                        }
                        
                        break;

                    default: // If args[0] dont match with a registered command
                        DiscordBot.commands.get('config').execute(message, Config, Discord, DiscordBot);
                        break;
                }
                Config.reload();
                break;
        }
        if ( command != 'clear' ) 
            message.delete({ timeout: 3 * 1000 });
        
    }
});

