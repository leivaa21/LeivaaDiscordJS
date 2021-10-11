module.exports = {    
    name: 'cfgrr-removeRole',
    description: `Remove a role to the reaction role embed.`,
    async execute(message, args, config) {
        
        if(!args[2]) 
            return message.channel.send(`Use \`${config.getGlobal().prefix}config reactionRole removeRole {rol_name/@rol}\` to run this command correctly`);
        
        if(config.getReactionRole().nRoles == 0)
            return message.channel.send(`No roles added to the reaction role embed!`);
        
        var role;
        const new_role = args[2];
        if(new_role[0] == "<") role = message.guild.roles.cache.find(role => role.id === new_role.slice(3,args[2].length-1));
        else role = message.guild.roles.cache.find(role => role.name === new_role); 
        
        if(role == undefined) {
            return message.channel.send(`Role not found, please \`copy the exact name of the rol or @ it\`!`);
        }

        let rol = {
            "id": "",
            "emoji": "",
            "description": ""
        }
        
        if(config.getReactionRole().nRoles == 1){
            if(role.id == config.getReactionRole().rol1.id)
                config.applyChanges("reactionRole", "rol1", rol);
            else 
                return message.channel.send(`${role} is \`not currently added\` to the reaction role embed!!`);
        }
        
        if(config.getReactionRole().nRoles == 2){
            if(role.id == config.getReactionRole().rol1.id){
                config.applyChanges("reactionRole", "rol1", config.getReactionRole().rol2);
                config.applyChanges("reactionRole", "rol2", rol);
            }
            else if(role.id == config.getReactionRole().rol2.id)
                config.applyChanges("reactionRole", "rol2", rol);
            if(role.id != rrConfig.rol1.id && role.id != config.getReactionRole().rol2.id ) 
                return message.channel.send(`${role} is \`not currently added\` to the reaction role embed!!`);
            
        }
        if(config.getReactionRole().nRoles == 3){
            if(role.id == config.getReactionRole().rol1.id){
                config.applyChanges("reactionRole", "rol1", config.getReactionRole().rol2);
                config.applyChanges("reactionRole", "rol2", config.getReactionRole().rol3);
                config.applyChanges("reactionRole", "rol3", rol);
            }
            if(role.id == config.getReactionRole().rol2.id){
                config.applyChanges("reactionRole", "rol2", config.getReactionRole().rol3);
                config.applyChanges("reactionRole", "rol3", rol);
            }
            if(role.id == config.getReactionRole().rol3.id)
                config.applyChanges("reactionRole", "rol3", rol);
            if(role.id != config.getReactionRole().rol1.id && role.id != config.getReactionRole().rol2.id && role.id != config.getReactionRole().rol3.id ) 
                return message.channel.send(`${role} is \`not currently added\` to the reaction role embed!!`);
        }
        config.applyChanges("reactionRole", "nRoles", --config.getReactionRole().nRoles);
        return message.channel.send(`Role ${role} succesfuly removed! Now I have \`${--config.getReactionRole().nRoles == 0 ? "no one :C" : --config.getReactionRole().nRoles}\` saved for reactionRole embed!`);
    } 
}