import {replace} from 'replace-json-property'
import emojiRegex from 'emoji-regex'

module.exports = {    
    name: 'cfgrr-addRole',
    description: `Add a role to the reaction role embed.`,
    async execute(message, args, config) {
        
        if(config.getReactionRole().nRoles == 3)
            return message.channel.send(`Already have \`3 roles added\`, sorry but for now I can not save more roles`);
        if(!args[4])
            return message.channel.send(`Use \`${config.getGlobal().prefix}config reactionRole addRole {rol_name/@rol} {EmojiForReacting} {Description of role}\` to run this command correctly`);
        
        var role;
        const new_role = args[2];
        if(new_role[0] == "<") role = message.guild.roles.cache.find(role => role.id === new_role.slice(3,args[2].length-1));
        else role = message.guild.roles.cache.find(role => role.name === new_role); 
        
        if(role == undefined)
            return message.channel.send(`Role not found, please \`copy the exact name of the rol or @ it\`!`);


        let emoji = args[3].match(emojiRegex());
        if(emoji == null) return message.channel.send(`Emoji not found, please \`type an standard emoji\`! (custom discord emojis not suported yet!)`);
        emoji = emoji[0];
        
        var descripcion="";
        for(var i = 4 ; i < args.length-1; i++ )   
            descripcion+=args[i]+" "
        descripcion+=args[args.length-1];

        let rol = {
            "id": role.id,
            "emoji": emoji,
            "description": descripcion
        }

        if(config.getReactionRole().nRoles == 0)
            config.applyChanges("reactionRole", "rol1", rol);

        if(config.getReactionRole().nRoles == 1){
            if(rol.id == config.getReactionRole().rol1.id || rol.emoji == config.getReactionRole().rol1.emoji ) 
                return message.channel.send(`You can't neither repeated rol or multiples roles with the same emoji !!`);
                config.applyChanges("reactionRole", "rol2", rol);
        }
        if(config.getReactionRole().nRoles == 2){
            if(rol.id == config.getReactionRole().rol1.id || rol.emoji == config.getReactionRole().rol1.emoji || rol.id == config.getReactionRole().rol2.id || rol.emoji == config.getReactionRole().rol2.emoji) 
                return message.channel.send(`You can't neither repeated rol or multiples roles with the same emoji !!`);
                config.applyChanges("reactionRole", "rol3", rol);
        }
        config.applyChanges("reactionRole", "nRoles", ++config.getReactionRole().nRoles);
        return message.channel.send(`Role ${role} succesfuly added! Now I have \`${config.getReactionRole().nRoles} saved\` for reactionRole embed YAY!`);
    } 
}