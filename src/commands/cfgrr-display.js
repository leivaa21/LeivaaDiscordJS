module.exports = {
    name: 'cfgrr-display',
    description: 'Shows all my actual reaction role configs.',
    async execute(message, config, rrConfig, Discord) {
        
        var channelId = undefined;
        const channel = message.guild.channels.cache.find(ch => ch.id === rrConfig.channel);
        if(channel != undefined) channelId = channel.id;


        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS ReactionRole Configs:`)
            .addFields(
                { name: `Active`, value: rrConfig.idMsg != "undefined" ? "Yes" : "No"},
                { name: `Title`, value: rrConfig.title},
                { name: `Message`, value: rrConfig.message},
                { name: `Channel`, value: channelId == undefined ? "undefined" : `<#${channelId}>` },
                )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);


                
        if(rrConfig.nRoles == 0 ) embed.addFields({ name: `Added Roles`, value: "No one"});
        if(rrConfig.nRoles > 0){
            embed.addFields({ 
                name: `Added Roles (1)`, 
                value: `> Name = <@&${rrConfig.rol1.id}>` 
                    +`\n > Emoji = ${rrConfig.rol1.emoji}`
                    +`\n > Description = ${rrConfig.rol1.description}`
                });
        }
        if(rrConfig.nRoles > 1){
            embed.addFields({ 
                name: `Added Roles (2)`, 
                value: `> Name = <@&${rrConfig.rol2.id}>` 
                    +`\n > Emoji = ${rrConfig.rol2.emoji}`
                    +`\n > Description = ${rrConfig.rol2.description}`
                });
        }
        if(rrConfig.nRoles > 2){
            embed.addFields({ 
                name: `Added Roles (3)`, 
                value: `> Name = <@&${rrConfig.rol3.id}>` 
                    +`\n > Emoji = ${rrConfig.rol3.emoji}`
                    +`\n > Description = ${rrConfig.rol3.description}`
                });
            }
        return message.channel.send(embed);
    }
}