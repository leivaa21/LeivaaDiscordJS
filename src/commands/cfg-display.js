module.exports = {
    name: 'cfg-display',
    description: 'Shows all my actual configs.',
    async execute(message, config, Discord) {
        let welcomeChannelId = false;
        
        if(message.guild.channels.cache.find(ch => ch.name === config.welcomeChannel) != undefined){
            welcomeChannelId = message.guild.channels.cache.find(ch => ch.name === config.welcomeChannel).id;
        }
        
        var color;
        for(namecolor in config.colors){
            if(config.colors[namecolor]==config.color) color = namecolor;
        }

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS Configs:`)
            .addFields(
                { name: `Prefix`, value: config.prefix},
                { name: `MaxDeleting`, value: config.maxDeleting},
                { name: `welcomeChannel`, value: welcomeChannelId ? `<#${welcomeChannelId}>` : "undefined" },
                { name: `welcomeMsg`, value: config.welcomeMsg ? config.welcomeMsg : "undefined" },
                { name: `color`, value: color},
            )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);

        return message.channel.send(embed);
    }
}