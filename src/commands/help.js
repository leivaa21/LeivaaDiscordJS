module.exports = {
    name: 'help',
    description: 'Show all my commands',
    async execute(message, config, Discord, DiscordBot) {

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.nombrebot,config.logobot)
            .setTitle(`LeivaaDiscordJS Commands:`)
            .addFields(
                { name: `${config.prefix}ping`, value: `> Just response 🏓 pong! \n > *Usage*: ${ config.prefix }ping.`},
                { name: `${config.prefix}poll`, value: `> ${DiscordBot.commands.get('poll').description} \n > *Usage*: ${ config.prefix }poll {Tittle}.`},
                { name: `${config.prefix}clear`, value: `> ${DiscordBot.commands.get('clear').description}\n > *Usage*: ${config.prefix}clear {Number between 0 and ${config.maxDeleting}}.`},
                { name: `${config.prefix}kick`, value: `> ${DiscordBot.commands.get('kick').description}\n > *Usage*: ${ config.prefix }kick {@username}.`},
                { name: `${config.prefix}ban`, value: `> ${DiscordBot.commands.get('ban').description}\n > *Usage*: ${ config.prefix }ban {@username} {Reason}.`},
                { name: `${config.prefix}config`, value: `> ${DiscordBot.commands.get('config').description} \n > *Usage*: ${ config.prefix }config.`},
                
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}