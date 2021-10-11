import embedFormat from '../models/embedFormat'

module.exports = {
    name: 'cfg-display',
    description: 'Shows all my actual configs.',
    async execute(message, config, Discord) {
        
        var color;
        let namecolor;
        for(namecolor in config.getGlobal().colors){
            if(config.getGlobal().colors[namecolor]==config.getGlobal().color) color = namecolor;
        }

        var channelId = undefined;
        const channel = message.guild.channels.cache.find(ch => ch.id === config.getGlobal().welcomeChannel);
        if(channel != undefined) channelId = channel.id;

        let embed = embedFormat(config.getGlobal(), Discord)
            .setTitle(`LeivaaDiscordJS Configs:`)
            .addFields(
                { name: `Prefix`, value: config.getGlobal().prefix},
                { name: `MaxDeleting`, value: config.getGlobal().maxDeleting},
                { name: `welcomeChannel`, value: channelId == undefined ? "undefined" : `<#${channelId}>` },
                { name: `welcomeMsg`, value: config.getGlobal().welcomeMsg},
                { name: `color`, value: color},
            )
            
        return message.channel.send(embed);
    }
}