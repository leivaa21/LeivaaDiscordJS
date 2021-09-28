import {replace} from 'replace-json-property'
module.exports = {
    name: 'welcomeMsg',
    description: `Change the welcome message.`,
    async execute(message, args, config, readConfig) {
        if(!args[1]) return message.channel.send(`Use ${config.prefix}config welcomeMsg {new_msg} to run this command correctly`);
        
        const new_msg = message.content.slice(`${config.prefix}config welcomeMsg`.length);
        replace(__dirname + "/../config.json", "welcomeMsg", new_msg);
        readConfig();
        return message.channel.send(`Welcome message succesfuly changed to " ${new_msg} "`);
    }
}