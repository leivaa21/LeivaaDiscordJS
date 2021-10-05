import {replace} from 'replace-json-property'
module.exports = {
    name: 'cfgrr-setMsg',
    description: `Change the reaction role embed message.`,
    async execute(message, args, config) {
        if(!args[1]) return message.channel.send(`Use ${config.prefix}config reactionRole setMsg {new_msg} to run this command correctly`);
        
        const new_msg = message.content.slice(`${config.prefix}config reactionRole setMsg`.length);
        replace(__dirname + "/../configs/rrConfig.json", "message", new_msg);
        return message.channel.send(`Reaction role embed message succesfuly changed to " ${new_msg} "`);
    }
}