module.exports = {
    name: 'config',
    description: 'Shows all my configs options.',
    async execute(message, config, Discord, DiscordBot) {

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS Configs Commands:`)
            .addFields(
                { name: `${config.prefix}config loadDefaults`, value: `> ${DiscordBot.commands.get('loadDefaults').description}\n > *Usage*: ${config.prefix}config loadDefaults`},
                { name: `${config.prefix}config prefix`, value: `> ${DiscordBot.commands.get('prefix').description}\n > *Usage*: ${config.prefix}config prefix {new_prefix}`},
                { name: `${config.prefix}config maxDeleting`, value: `> ${DiscordBot.commands.get('maxDeleting').description}\n > *Usage*: ${config.prefix}config maxDeleting {new_max}`},
                { name: `${config.prefix}config colors`, value: `> ${DiscordBot.commands.get('colors').description}\n > *Usage*: ${config.prefix}config colors`},
                { name: `${config.prefix}config color`, value: `> ${DiscordBot.commands.get('color').description}\n > *Usage*: ${config.prefix}config color {new_color}`},
                { name: `${config.prefix}config welcomeChannel`, value: `> ${DiscordBot.commands.get('welcomeChannel').description}\n > *Usage*: ${config.prefix}config welcomeChannel {new_channel}`},
                { name: `${config.prefix}config welcomeMsg`, value: `> ${DiscordBot.commands.get('welcomeMsg').description}\n > *Usage*: ${config.prefix}config welcomeMsg {new_msg}`},
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}