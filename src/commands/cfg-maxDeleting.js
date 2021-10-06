import {replace} from 'replace-json-property'
module.exports = {
    name: 'maxDeleting',
    description: `Change the max of messages that clear can delete.`,
    async execute(message, args, config) {
        if(!args[1] || args[2]!=undefined || args[1] < 0 || args[1] > 99) return message.channel.send(`Use \`${config.prefix}config maxDeleting {Number between 0 and 99}\` to run this command correctly, `);
        const new_max = args[1];
        replace(__dirname + "/../configs/config.json", "maxDeleting", new_max);
        return message.channel.send(`Max messages that I can clean succesfuly changed to \`${new_max}\``);
    }
}