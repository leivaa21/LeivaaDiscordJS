import {replace} from 'replace-json-property'

module.exports = {    
    name: 'cfgrr-removeRole',
    description: `Remove a role to the reaction role embed.`,
    async execute(message, args, config, rrConfig) {
        
        if(!args[2]) 
            return message.channel.send(`Use \`${config.prefix}config reactionRole removeRole {rol_name/@rol}\` to run this command correctly`);
        
        if(rrConfig.nRoles == 0)
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
        
        if(rrConfig.nRoles == 1){
            if(role.id == rrConfig.rol1.id)
                replace(__dirname + "/../configs/rrConfig.json", "rol1", rol);
            else 
                return message.channel.send(`${role} is \`not currently added\` to the reaction role embed!!`);
        }
        
        if(rrConfig.nRoles == 2){
            if(role.id == rrConfig.rol1.id){
                replace(__dirname + "/../configs/rrConfig.json", "rol1", rrConfig.rol2);
                replace(__dirname + "/../configs/rrConfig.json", "rol2", rol);
            }
            else if(role.id == rrConfig.rol2.id)
                replace(__dirname + "/../configs/rrConfig.json", "rol2", rol);
            if(role.id != rrConfig.rol1.id && role.id != rrConfig.rol2.id ) 
                return message.channel.send(`${role} is \`not currently added\` to the reaction role embed!!`);
            
        }
        if(rrConfig.nRoles == 3){
            if(role.id == rrConfig.rol1.id){
                replace(__dirname + "/../configs/rrConfig.json", "rol1", rrConfig.rol2);
                replace(__dirname + "/../configs/rrConfig.json", "rol2", rrConfig.rol3);
                replace(__dirname + "/../configs/rrConfig.json", "rol3", rol);
            }
            if(role.id == rrConfig.rol2.id){
                replace(__dirname + "/../configs/rrConfig.json", "rol2", rrConfig.rol3);
                replace(__dirname + "/../configs/rrConfig.json", "rol3", rol);
            }
            if(role.id == rrConfig.rol3.id)
                replace(__dirname + "/../configs/rrConfig.json", "rol3", rol);
            if(role.id != rrConfig.rol1.id && role.id != rrConfig.rol2.id && role.id != rrConfig.rol3.id ) 
                return message.channel.send(`${role} is \`not currently added\` to the reaction role embed!!`);
        }
        replace(__dirname + "/../configs/rrConfig.json", "nRoles", --rrConfig.nRoles);
        return message.channel.send(`Role ${role} succesfuly removed! Now I have \`${rrConfig.nRoles == 0 ? "no one :C" : rrConfig.nRoles}\` saved for reactionRole embed!`);
    } 
}