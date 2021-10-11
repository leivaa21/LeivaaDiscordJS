module.exports = {
    name: 'cfgrr-setChannel',
    description: `Change the reaction role embed channel.`,
    async execute(message, args, config) {
        if(!args[2] || args[3]!=undefined)
            return message.channel.send(`Use \`${config.getGlobal().prefix}config reactionRole setChannel {channel_name/#channel}\` to run this command correctly`);
        
        var channel;
        const new_channel = args[2];
        if(new_channel[0] == "<") 
            channel = message.guild.channels.cache.find(ch => ch.id === new_channel.slice(2,args[1].length-1));
        else 
            channel = message.guild.channels.cache.find(ch => ch.name === new_channel); 
        if(channel == undefined)
            return message.channel.send(`Channel not found, please \`copy the exact name of the channel or # it\`!`);
        config.applyChanges("reactionRole", "channel", channel.id);
        return message.channel.send(`Reaction role channel succesfuly changed to <#${channel.id}> !`);
    }
}