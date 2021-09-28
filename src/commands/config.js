module.exports = {
    name: 'config',
    description: 'Shows all my configs options.',
    async execute(message, config, Discord, DiscordBot) {

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.nombrebot,config.logobot)
            .setTitle(`LeivaaDiscordJS Configs Commands:`)
            .addFields(
                { name: `${config.prefix}config prefix`, value: `> ${DiscordBot.commands.get('prefix').description}\n > *Usage*: ${config.prefix}config prefix {new_prefix}`},
                { name: `${config.prefix}config colors`, value: `> ${DiscordBot.commands.get('colors').description}\n > *Usage*: ${config.prefix}config colors`},
                { name: `${config.prefix}config setColor`, value: `> ${DiscordBot.commands.get('prefix').description}\n > *Usage*: ${config.prefix}config setColor {new_color}`},
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}