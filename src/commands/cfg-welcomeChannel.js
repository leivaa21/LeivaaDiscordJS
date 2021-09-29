import {replace} from 'replace-json-property'
module.exports = {
    name: 'welcomeChannel',
    description: `Change the welcome channel for welcome alerts.`,
    async execute(message, args, config, readConfig) {
        if(!args[1] || args[2]!=undefined) return message.channel.send(`Use ${config.prefix}config welcomeChannel {new_channel} to run this command correctly`);
        const new_channel = args[1];
        const channel = message.guild.channels.cache.find(ch => ch.name === new_channel);
        if(channel == undefined) {
            return message.channel.send(`Channel not found, please copy the exact name of the channel!`);
        }
        replace(__dirname + "/../config.json", "welcomeChannel", channel.id);
        readConfig();
        return message.channel.send(`Welcome channel succesfuly changed to <#${channel.id}> !`);
    }
}