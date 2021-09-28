module.exports = {
    name: 'welcome',
    description: '',
    async execute(member, config, Discord) {
        const channel = member.guild.channels.cache.find(ch => ch.name === config.welcomeChannel);
        if(channel == undefined) return;
        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`Welcome to the server ${member.user.username}!`)
            .setDescription(`<@!${member.user.id}>,` + config.welcomeMsg)
            channel.send(embed);
    }

}