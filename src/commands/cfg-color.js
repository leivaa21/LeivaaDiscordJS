import {replace} from 'replace-json-property'

module.exports = {
    name: 'color',
    description: `Change the color of my embeds.`,
    async execute(message, args, config) {
        if(!args[1] || args[2]!=undefined) 
            return message.channel.send(`Use \`${config.prefix}config color {new_color}\` to run this command correctly`);
        
        for(var color in config.colors){
            if(args[1].toUpperCase() == color){
                replace(__dirname + "/../configs/config.json", "color", config.colors[color]);
                return message.channel.send(`Color succesfuly changed to \`${color}\``);
            }
        }
        return message.channel.send(`Color not recognized, see \`${config.prefix}config colors\` to see al the posible colors!`);
    }
}