import {replace} from 'replace-json-property'

module.exports = {
    name: 'color',
    description: `Change the color of my embeds.`,
    async execute(message, args, config) {
        if(!args[1] || args[2]!=undefined) 
            return message.channel.send(`Use \`${config.getGlobal().prefix}config color {new_color}\` to run this command correctly`);
        
        for(var color in config.getGlobal().colors){
            if(args[1].toUpperCase() == color){
                config.applyChanges("global", "color", config.getGlobal().colors[color]);
                return message.channel.send(`Color succesfuly changed to \`${color}\``);
            }
        }
        return message.channel.send(`Color not recognized, see \`${config.getGlobal().prefix}config colors\` to see al the posible colors!`);
    }
}