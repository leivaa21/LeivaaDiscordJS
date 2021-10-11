import embedFormat from '../models/embedFormat'

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

        let embed = embedFormat(config, Discord)
            .setTitle(`LeivaaDiscordJS Configs:`)
            .addFields(
                { name: `Prefix`, value: config.prefix},
                { name: `MaxDeleting`, value: config.maxDeleting},
                { name: `welcomeChannel`, value: channelId == undefined ? "undefined" : `<#${channelId}>` },
                { name: `welcomeMsg`, value: config.welcomeMsg},
                { name: `color`, value: color},
            )
            
        return message.channel.send(embed);
    }
}