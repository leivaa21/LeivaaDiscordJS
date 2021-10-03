import {replace} from 'replace-json-property'
module.exports = {
    name: 'maxDeleting',
    description: `Change the max of messages that clear can delete.`,
    async execute(message, args, config) {
        if(!args[1] || args[2]!=undefined) return message.channel.send(`Use ${config.prefix}config maxDeleting {new_max} to run this command correctly`);
        const new_max = args[1];
        replace(__dirname + "/../configs/config.json", "maxDeleting", new_max);
        return message.channel.send(`Max messages succesfuly changed to ${new_max}`);
    }
}