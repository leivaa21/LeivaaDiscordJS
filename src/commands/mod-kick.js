module.exports = {
    name: 'kick',
    description: `Kick someone from the server.`,
    async execute(message, config) {
        const member = message.mentions.members.first();
        if (member) {
            const kicked = await member.kick();
            if (!kicked) return message.channel.send(`I couldn't kick <@${member.id}>, he's to strong :c`);
            return message.channel.send(`<@${ message.author.id}> kicked ${ kicked.user.username }'s ass out of the server!`);
        } else {
            return message.reply(`You should use \`${ config.prefix }kick {@username}\` to run this command correctly`);
        }
    }
}