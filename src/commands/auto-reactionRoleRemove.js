module.exports = {
    name: 'reactionRoleRemove',
    description: '',
    async execute(reaction, user, rrConfig) {
        
        if (user.bot) return;
        
        const channel = reaction.message.guild.channels.cache.find(ch => ch.id === rrConfig.channel);
        if(channel == undefined ) return;
        
        const msg = await channel.messages.fetch(rrConfig.idMsg);
        if(msg != reaction.message) return;
        
        if(rrConfig.nRoles > 0){  
            if (reaction._emoji.name == rrConfig.rol1.emoji )
                await reaction.message.guild.members.cache.get(user.id).roles.remove(rrConfig.rol1.id);
        }
        if(rrConfig.nRoles > 1){
            if (reaction._emoji.name == rrConfig.rol2.emoji)
                await reaction.message.guild.members.cache.get(user.id).roles.remove(rrConfig.rol2.id);
               
        }
        if(rrConfig.nRoles > 2){
            if (reaction._emoji.name == rrConfig.rol3.emoji)
                await reaction.message.guild.members.cache.get(user.id).roles.remove(rrConfig.rol3.id);
        }    
    }
}