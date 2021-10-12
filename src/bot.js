/**
 * Imports
 */
import {} from 'dotenv/config'
import Discord from 'discord.js'
import fs from 'fs'
import Config from './models/config'





/**
 * Load configs and display on cmd the actual configs
 */
const config = new Config(() => {
    console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ]\n"
    +"\x1b[36m| > Config loaded correctly\x1b[0m");
}, () => {
    console.log("[\x1b[33m LeivaaDiscordJS\x1b[0m ]\n"
    +"\x1b[36m| > ReactionRole Config loaded correctly\x1b[0m");
});
    

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
    return DiscordBot.commands.get('welcome').execute(member, Config, Discord);
})



/**
 * Controlling the users chat commands
 */
DiscordBot.on('message', async(message) => {
    console.log(`\x1b[33m${message.author.username}\x1b[0m at\x1b[36m #${message.channel.name} \x1b[0m: ${message.content} \n\x1b[36m| > \x1b[31m MessageID: \x1b[32m ${message.id}\x1b[0m`);
    if (message.content.startsWith(Config.getGlobal().prefix)) {

        const args = message.content.slice(Config.getGlobal().prefix.length).split(/ +/);
        const command = args.shift();

        switch(command.toLowerCase()){

            /**
             * Global Commands (marked as global- on ./commands)
             */

            case 'ping':
                message.reply(`🏓 pong!`).then(msg => msg.delete({ timeout: 3 * 1000 }));
                break;

            case 'poll':
                DiscordBot.commands.get('poll').execute(message, args, Config, Discord)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;

            case 'help':
                DiscordBot.commands.get('help').execute(message, Config, Discord, DiscordBot);
                break;
            
            /**
             * Moderation Commands (marked as mod- on ./commands)
             */
            case 'kick':

                if (!message.member.hasPermission(['KICK_MEMBERS'])) {
                    message.reply(`You dont have permissions to \`kick\` someone`)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }

                DiscordBot.commands.get('kick').execute(message, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;

            case 'ban':

                if (!message.member.hasPermission(['BAN_MEMBERS'])) {
                    message.reply(`You dont have permissions to \`ban\` someone`)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }

                DiscordBot.commands.get('ban').execute(message, args, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;

            case 'clear':

                if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
                    message.reply(`You dont have permissions to \`clear messages\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }

                DiscordBot.commands.get('clear').execute(message, args, Config)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                break;
            
            /**
             * Admin Commands (marked as adm- on ./commands)
             */
            case 'reactionRole':

                if (!message.member.hasPermission(['ADMINISTRATOR'])){
                    message.reply(`To run this command you need more power \`(Just for admins :c)\``)
                        .then(msg => msg.delete({ timeout: 3 * 1000 }));
                    break;
                }

                DiscordBot.commands.get('adm-reactionRole').execute(message, Config, Discord)
                    .then(msg => {msg ? msg.delete({ timeout: 3 * 1000 }): undefined});
                Config.reload();
                break;

            case 'config': 

                /**
                 * All the config command options
                 */
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

/**
 * Reaction Role giving and removing roles 
 */
DiscordBot.on('messageReactionAdd', async(reaction, user) => {
    Config.reload();
    return await DiscordBot.commands.get('reactionRoleAdd').execute(reaction, user, Config.getReactionRole());
});
DiscordBot.on('messageReactionRemove', async(reaction, user) => {
    Config.reload();
    return await DiscordBot.commands.get('reactionRoleRemove').execute(reaction, user, Config.getReactionRole());
});