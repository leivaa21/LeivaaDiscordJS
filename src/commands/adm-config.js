import embedFormat from '../models/embedFormat';
module.exports = {
    name: 'config',
    description: 'Shows all my configs options.',
    async execute(message, config, Discord, DiscordBot) {

        let embed = embedFormat(config.getGlobal(), Discord)
            .setTitle(`LeivaaDiscordJS Configs Commands:`)
            .addFields(
                { name: `${config.getGlobal().prefix}config loadDefaults`, value: `> ${DiscordBot.commands.get('loadDefaults').description}\n > **Usage**: \`${config.getGlobal().prefix}config loadDefaults\``},
                { name: `${config.getGlobal().prefix}config display`, value: `> ${DiscordBot.commands.get('cfg-display').description}\n > **Usage**: \`${config.getGlobal().prefix}config display\``},
                { name: `${config.getGlobal().prefix}config prefix`, value: `> ${DiscordBot.commands.get('prefix').description}\n > **Usage**: \`${config.getGlobal().prefix}config prefix {new_prefix}\``},
                { name: `${config.getGlobal().prefix}config maxDeleting`, value: `> ${DiscordBot.commands.get('maxDeleting').description}\n > **Usage**: \`${config.getGlobal().prefix}config maxDeleting {Number between 0 and 99}\``},
                { name: `${config.getGlobal().prefix}config colors`, value: `> ${DiscordBot.commands.get('colors').description}\n > **Usage**: \`${config.getGlobal().prefix}config colors\``},
                { name: `${config.getGlobal().prefix}config color`, value: `> ${DiscordBot.commands.get('color').description}\n > **Usage**: \`${config.getGlobal().prefix}config color {new_color}\``},
                { name: `${config.getGlobal().prefix}config welcomeChannel`, value: `> ${DiscordBot.commands.get('welcomeChannel').description}\n > **Usage**: \`${config.getGlobal().prefix}config welcomeChannel {channel_name/#channel}\``},
                { name: `${config.getGlobal().prefix}config welcomeMsg`, value: `> ${DiscordBot.commands.get('welcomeMsg').description}\n > **Usage**: \`${config.getGlobal().prefix}config welcomeMsg {new_msg}\``},
                { name: `${config.getGlobal().prefix}config reactionRole`, value: `> ${DiscordBot.commands.get('cfg-reactionRole').description}\n > **Usage**: \`${config.getGlobal().prefix}config reactionRole\``},
            )

        message.channel.send(embed);
    }
}