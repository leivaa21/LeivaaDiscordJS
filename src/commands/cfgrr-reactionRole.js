module.exports = {
    name: 'cfgrr-reactionRole',
    description: 'Shows all reaction role configs options.',
    async execute(message, config, Discord, DiscordBot) {

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS ReactionRole Configs Commands:`)
            .addFields(
                { name: `${config.prefix}config reactionRole display`, value: `> ${DiscordBot.commands.get('cfgrr-display').description}\n > *Usage*: ${config.prefix}config reactionRole display`},
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}