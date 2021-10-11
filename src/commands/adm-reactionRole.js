import embedFormat from '../models/embedFormat'

module.exports = {
    name: 'adm-reactionRole',
    description: '',
    async execute(message, config, Discord) {
        
        const channel = message.guild.channels.cache.find(ch => ch.id === config.getReactionRole().channel);
        if(channel == undefined) 
            return message.channel.send(`Reaction role channel is not setted!`);
        
        if(config.getReactionRole().title === "undefined") 
            return message.channel.send(`Reaction role title is not setted!`);

        if(config.getReactionRole().message === "undefined") 
            return message.channel.send(`Reaction role message is not setted!`);

        if(config.getReactionRole().nRoles == 0) 
            return message.channel.send(`Reaction role embed has no roles added!`);

        let embed = embedFormat(config, Discord)
            .setTitle(config.getReactionRole().title)
            .setDescription(`${config.getReactionRole().message}`)
    
        if(config.getReactionRole().nRoles > 0){
            embed.addFields({ 
                name: `React with ${config.getReactionRole().rol1.emoji} for`, 
                value: `<@&${config.getReactionRole().rol1.id}>: ${config.getReactionRole().rol1.description}`
                });
        }
        if(config.getReactionRole().nRoles > 1){
            embed.addFields({ 
                name: `React with ${config.getReactionRole().rol2.emoji} for`, 
                value: `<@&${config.getReactionRole().rol2.id}>: ${config.getReactionRole().rol2.description}`
                });
        }
        if(config.getReactionRole().nRoles > 2){
            embed.addFields({ 
                name: `React with ${config.getReactionRole().rol3.emoji} for`, 
                value: `<@&${config.getReactionRole().rol3.id}>: ${config.getReactionRole().rol3.description}`
                });
        }    
    
        let messageEmbed = await channel.send(embed);
        
        if(config.getReactionRole().nRoles > 0) 
            messageEmbed.react(config.getReactionRole().rol1.emoji);

        if(config.getReactionRole().nRoles > 1) 
            messageEmbed.react(config.getReactionRole().rol2.emoji);

        if(config.getReactionRole().nRoles > 2) 
            messageEmbed.react(config.getReactionRole().rol3.emoji);

        config.applyChanges("reactionRole", "idMsg", messageEmbed.id);

    }
}