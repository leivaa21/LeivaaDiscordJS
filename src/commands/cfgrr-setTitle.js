import {replace} from 'replace-json-property'

module.exports = {
    name: 'cfgrr-setTitle',
    description: `Change the reaction role embed title.`,
    async execute(message, args, config) {
        if(!args[1]) 
            return message.channel.send(`Use \`${config.prefix}config reactionRole setTitle {new_title}\` to run this command correctly`);
        
        const new_title = message.content.slice(`${config.prefix}config reactionRole setTitle `.length);
        replace(__dirname + "/../configs/rrConfig.json", "title", new_title);
        
        return message.channel.send(`Reaction role embed title succesfuly changed to \`${new_title}\``);
    }
}