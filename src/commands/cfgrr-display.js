module.exports = {
    name: 'cfgrr-display',
    description: 'Shows all my actual reaction role configs.',
    async execute(message, config, rrConfig, Discord) {
        
        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(`LeivaaDiscordJS ReactionRole Configs:`)
            .addFields(
                { name: `Active`, value: rrConfig.idMsg != "undefined" ? "Yes" : "No"},
                { name: `Title`, value: rrConfig.title},
                { name: `Description`, value: rrConfig.description},
                { name: `Channel`, value: rrConfig.channel =! "undefined" ? `<#${rrConfig.channel}>` : "undefined" },
                )
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);


                
        if(rrConfig.nRoles == 0 ) embed.addFields({ name: `Added Roles`, value: "No one"});
        if(rrConfig.nRoles > 0){
            rolName1 = message.guild.roles.cache.find(role => role.id === rrConfig.rol1.id).name;
            embed.addFields({ 
                name: `Added Roles (1)`, 
                value: `> Name = ${rolName1}` 
                    +`\n > Emoji = ${rrConfig.rol1.emoji}`
                    +`\n > Description = ${rrConfig.rol1.description}`
                });
        }
        if(rrConfig.nRoles > 1){
            rolName2 = message.guild.roles.cache.find(role => role.id === rrConfig.rol2.id).name;
            embed.addFields({ 
                name: `Added Roles (2)`, 
                value: `> Name = ${rolName2}` 
                    +`\n > Emoji = ${rrConfig.rol2.emoji}`
                    +`\n > Description = ${rrConfig.rol2.description}`
                });
        }
        if(rrConfig.nRoles > 2){
            rolName3 = message.guild.roles.cache.find(role => role.id === rrConfig.rol3.id).name;
            embed.addFields({ 
                name: `Added Roles (3)`, 
                value: `> Name = ${rolName3}` 
                    +`\n > Emoji = ${rrConfig.rol3.emoji}`
                    +`\n > Description = ${rrConfig.rol3.description}`
                });
            }
        return message.channel.send(embed);
    }
}