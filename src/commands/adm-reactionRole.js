import {replace} from 'replace-json-property'

module.exports = {
    name: 'adm-reactionRole',
    description: '',
    async execute(message, config, rrConfig, Discord) {
        
        const channel = message.guild.channels.cache.find(ch => ch.id === rrConfig.channel);
        if(channel == undefined) 
            return message.channel.send(`Reaction role channel is not setted!`);
        
        if(rrConfig.title === "undefined") 
            return message.channel.send(`Reaction role title is not setted!`);

        if(rrConfig.message === "undefined") 
            return message.channel.send(`Reaction role message is not setted!`);

        if(rrConfig.nRoles == 0) 
            return message.channel.send(`Reaction role embed has no roles added!`);

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(config.botName,config.botLogo)
            .setTitle(rrConfig.title)
            .setDescription(`${rrConfig.message}`)
            .setFooter('Bot developed by Leivaa - https://github.com/leivaa21', config.leivaaLogo);
    
        if(rrConfig.nRoles > 0){
            embed.addFields({ 
                name: `React with ${rrConfig.rol1.emoji} for`, 
                value: `<@&${rrConfig.rol1.id}>: ${rrConfig.rol1.description}`
                });
        }
        if(rrConfig.nRoles > 1){
            embed.addFields({ 
                name: `React with ${rrConfig.rol2.emoji} for`, 
                value: `<@&${rrConfig.rol2.id}>: ${rrConfig.rol2.description}`
                });
        }
        if(rrConfig.nRoles > 2){
            embed.addFields({ 
                name: `React with ${rrConfig.rol3.emoji} for`, 
                value: `<@&${rrConfig.rol3.id}>: ${rrConfig.rol3.description}`
                });
        }    
    
        let messageEmbed = await channel.send(embed);
        
        if(rrConfig.nRoles > 0) 
            messageEmbed.react(rrConfig.rol1.emoji);

        if(rrConfig.nRoles > 1) 
            messageEmbed.react(rrConfig.rol2.emoji);

        if(rrConfig.nRoles > 2) 
            messageEmbed.react(rrConfig.rol3.emoji);

        replace(__dirname + "/../configs/rrConfig.json", "idMsg", messageEmbed.id);

    }
}