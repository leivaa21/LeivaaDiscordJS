import embedFormat from '../models/embedFormat'
module.exports = {
    name: 'welcome',
    description: '',
    async execute(member, config, Discord) {
        const channel = member.guild.channels.cache.find(ch => ch.id === config.welcomeChannel);
        if(channel == undefined) return;
        let embed = embedFormat()
            .setTitle(`Welcome to the server ${member.user.username}!`)
            .setDescription(`<@!${member.user.id}>,` + config.welcomeMsg)
            channel.send(embed);
    }

}