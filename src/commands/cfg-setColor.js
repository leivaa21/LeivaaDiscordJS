import {replace} from 'replace-json-property'
module.exports = {
    name: 'setColor',
    description: `Change the color of my embeds.`,
    async execute(message, args, config, readConfig) {
        if(!args[1] || args[2]!=undefined) return message.channel.send(`Use ${config.prefix}config setColor {new_color} to run this command correctly`);
        for(var color in config.colors){
            console.log(`is ${args[1]} == ${color} ?`);
            if(args[1] == color){
                replace(__dirname + "/../config.json", "color", config.colors[color]);
                readConfig();
            return message.channel.send(`Color succesfuly changed to ${color}`);
            }
        }
        return message.channel.send(`Color not recognized, see ${config.prefix}config colors to see al the posible colors!`);


        
    }
}