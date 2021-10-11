import embedFormat from '../models/embedFormat'

module.exports = {
    name: 'help',
    description: 'Show all my commands',
    async execute(message, config, Discord, DiscordBot) {
        config.reload();
        let embed =embedFormat(config.getGlobal(), Discord)
            .setTitle(`LeivaaDiscordJS Commands:`)
            .addFields(
                { name: `${config.getGlobal().prefix}ping`, value: `> Just response 🏓 pong! \n > **Usage**: \`${ config.getGlobal().prefix }ping\``},
                { name: `${config.getGlobal().prefix}poll`, value: `> ${DiscordBot.commands.get('poll').description} \n > **Usage**: \`${ config.getGlobal().prefix }poll {Tittle}\``},
                { name: `${config.getGlobal().prefix}clear`, value: `> ${DiscordBot.commands.get('clear').description}\n > **Usage**: \`${config.getGlobal().prefix}clear \`${config.prefix}config maxDeleting {Number between 0 and 99}\``},
                { name: `${config.getGlobal().prefix}kick`, value: `> ${DiscordBot.commands.get('kick').description}\n > **Usage**: \`${ config.getGlobal().prefix }kick {@username}\``},
                { name: `${config.getGlobal().prefix}ban`, value: `> ${DiscordBot.commands.get('ban').description}\n > **Usage**: \`${ config.getGlobal().prefix }ban {@username} {Reason}\``},
                { name: `${config.getGlobal().prefix}config`, value: `> ${DiscordBot.commands.get('config').description} \n > **Usage**: \`${ config.getGlobal().prefix }config\``},
                { name: `${config.getGlobal().prefix}reactionRole`, value: `> ${DiscordBot.commands.get('adm-reactionRole').description} \n > **Usage**: \`${config.getGlobal().prefix}reactionRole\``},
                
                
            )

        return message.channel.send(embed);
    }
}