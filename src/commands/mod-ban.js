module.exports = {
    name: 'ban',
    description: `Put the BanHammer down in someone!.`,
    async execute(message, args, config) {
        const member = message.mentions.members.first();
        let banReason = args.slice(2).join(' ');
        if (!member || !banReason) {
            return message.reply(`You should use \`${ config.prefix }ban {@username} {Reason}\` to run this command correctly`);
        } else {
            const banned = await member.ban({ days: 7, reason: banReason });
            if (!banned) return message.channel.send(`I couldn't ban <@${member.id}>, he's to strong :c`);
            return message.channel.send(`<@${ message.author.id}> hit ${ banned.user.username } with the BanHammer for the reason: \'${banReason}\'`);
        }
    }
}