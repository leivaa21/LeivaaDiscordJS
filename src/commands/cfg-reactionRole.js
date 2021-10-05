module.exports = {
    name: 'cfg-reactionRole',
    description: 'Shows all reaction role configs options.',
    async execute(message, config, Discord, DiscordBot) {

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS ReactionRole Configs Commands:`)
            .addFields(
                { name: `${config.prefix}config reactionRole display`, value: `> ${DiscordBot.commands.get('cfgrr-display').description}\n > *Usage*: ${config.prefix}config reactionRole display`},
                { name: `${config.prefix}config reactionRole setChannel`, value: `> ${DiscordBot.commands.get('cfgrr-setChannel').description}\n > *Usage*: ${config.prefix}config reactionRole setChannel {new_channel}`},
                { name: `${config.prefix}config reactionRole setTitle`, value: `> ${DiscordBot.commands.get('cfgrr-setTitle').description}\n > *Usage*: ${config.prefix}config reactionRole setTitle {new_title}`},
                { name: `${config.prefix}config reactionRole setMsg`, value: `> ${DiscordBot.commands.get('cfgrr-setMsg').description}\n > *Usage*: ${config.prefix}config reactionRole setMsg {new_msg}`},
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}