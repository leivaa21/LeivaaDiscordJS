module.exports = {
    name: 'cfg-display',
    description: 'Shows all my actual configs.',
    async execute(message, config, Discord) {
        
        var color;
        for(namecolor in config.colors){
            if(config.colors[namecolor]==config.color) color = namecolor;
        }

        var channelId = undefined;
        const channel = message.guild.channels.cache.find(ch => ch.id === config.welcomeChannel);
        if(channel != undefined) channelId = channel.id;

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS Configs:`)
            .addFields(
                { name: `Prefix`, value: config.prefix},
                { name: `MaxDeleting`, value: config.maxDeleting},
                { name: `welcomeChannel`, value: channelId =! undefined ? `<#${channelId}>` : "undefined"},
                { name: `welcomeMsg`, value: config.welcomeMsg},
                { name: `color`, value: color},
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}