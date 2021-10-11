import embedFormat from '../models/embedFormat'
module.exports = {
    name: 'poll',
    description: `Creates a Yes/No Poll!`,
    async execute(message, args, config, Discord) {

        const tickEmoji = '✅';
        const crossEmoji = '❌';

        let pollTitle = args.slice(0).join(' ');
        if (!pollTitle)
            return message.reply(`You should use \`${ config.prefix }poll {Tittle}\` to run this command correctly.`);
            
        let embed = embedFormat(config, Discord)
            .setTitle(pollTitle)
            .setDescription('Vote reacting this message!\n\n' +
                `${tickEmoji} Vote for this!\n` +
                `${crossEmoji} Vote against this!\n`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(tickEmoji);
        messageEmbed.react(crossEmoji);
    }
}