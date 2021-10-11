import embedFormat from '../models/embedFormat'
module.exports = {
    name: 'welcome',
    description: '',
    async execute(member, config, Discord) {
        const channel = member.guild.channels.cache.find(ch => ch.id === config.getGlobal().welcomeChannel);
        if(channel == undefined) return;
        let embed = embedFormat(config.getGlobal(), Discord)
            .setTitle(`Welcome to the server ${member.user.username}!`)
            .setDescription(`<@!${member.user.id}>,` + config.getGlobal().welcomeMsg)
            channel.send(embed);
    }

}