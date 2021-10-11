import embedFormat from '../models/embedFormat'
module.exports = {
    name: 'cfgrr-display',
    description: 'Shows all my actual reaction role configs.',
    async execute(message, config, Discord) {
        
        var channelId = undefined;
        const channel = message.guild.channels.cache.find(ch => ch.id === config.getReactionRole().channel);
        if(channel != undefined) channelId = channel.id;


        let embed = embedFormat(config.getGlobal(), Discord)
            .setTitle(`LeivaaDiscordJS ReactionRole Configs:`)
            .addFields(
                { name: `Active`, value: config.getReactionRole().idMsg != "undefined" ? "Yes" : "No"},
                { name: `Title`, value: config.getReactionRole().title},
                { name: `Message`, value: config.getReactionRole().message},
                { name: `Channel`, value: channelId == undefined ? "undefined" : `<#${channelId}>` },
                )


                
        if(config.getReactionRole().nRoles == 0 ) 
            embed.addFields({ name: `Added Roles`, value: "No one"});

        if(config.getReactionRole().nRoles > 0){
            embed.addFields({ 
                name: `Added Roles (1)`, 
                value: `> Name = <@&${config.getReactionRole().rol1.id}>` 
                    +`\n > Emoji = ${config.getReactionRole().rol1.emoji}`
                    +`\n > Description = ${config.getReactionRole().rol1.description}`
            });
        }
        if(config.getReactionRole().nRoles > 1){
            embed.addFields({ 
                name: `Added Roles (2)`, 
                value: `> Name = <@&${config.getReactionRole().rol2.id}>` 
                    +`\n > Emoji = ${config.getReactionRole().rol2.emoji}`
                    +`\n > Description = ${config.getReactionRole().rol2.description}`
            });
        }
        if(config.getReactionRole().nRoles > 2){
            embed.addFields({ 
                name: `Added Roles (3)`, 
                value: `> Name = <@&${config.getReactionRole().rol3.id}>` 
                    +`\n > Emoji = ${config.getReactionRole().rol3.emoji}`
                    +`\n > Description = ${config.getReactionRole().rol3.description}`
            });
        }
        return message.channel.send(embed);
    }
}