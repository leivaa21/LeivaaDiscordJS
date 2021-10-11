import embedFormat from '../models/embedFormat'
module.exports = {
    name: 'cfg-reactionRole',
    description: 'Shows all reaction role configs options.',
    async execute(message, config, Discord, DiscordBot) {

        let embed = embedFormat(config, Discord)
            .setTitle(`LeivaaDiscordJS ReactionRole Configs Commands:`)
            .addFields(
                { name: `${config.prefix}config reactionRole display`, value: `> ${DiscordBot.commands.get('cfgrr-display').description}\n > **Usage**: \`${config.prefix}config reactionRole display\``},
                { name: `${config.prefix}config reactionRole setChannel`, value: `> ${DiscordBot.commands.get('cfgrr-setChannel').description}\n > **Usage**: \`${config.prefix}config reactionRole setChannel {channel_name/#channel}\``},
                { name: `${config.prefix}config reactionRole setTitle`, value: `> ${DiscordBot.commands.get('cfgrr-setTitle').description}\n > **Usage**: \`${config.prefix}config reactionRole setTitle {new_title}\``},
                { name: `${config.prefix}config reactionRole setMsg`, value: `> ${DiscordBot.commands.get('cfgrr-setMsg').description}\n > **Usage**: \`${config.prefix}config reactionRole setMsg {new_msg}\``},
                { name: `${config.prefix}config reactionRole addRole`, value: `> ${DiscordBot.commands.get('cfgrr-addRole').description}\n > **Usage**: \`${config.prefix}config reactionRole addRole {rol_name/@rol} {EmojiForReacting} {Description of role}\``},
                { name: `${config.prefix}config reactionRole removeRole`, value: `> ${DiscordBot.commands.get('cfgrr-removeRole').description}\n > **Usage**: \`${config.prefix}config reactionRole removeRole {rol_name/@rol}\``},
            )

        return message.channel.send(embed);
    }
}