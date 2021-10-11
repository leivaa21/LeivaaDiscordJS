module.exports = {
    name: 'clear',
    description: `Remove some messages from the chat!`,
    async execute(message, args, config) {
        if (!args[0] || isNaN(args[0] || args[0] < 1)) {
                message.delete({ timeout : 3 * 1000 });
            return message.reply(`You should \`${config.getGlobal().prefix}clear {Number between 0 and ${config.getGlobal().maxDeleting}}\` to run this command correctly`);
        }
        else if (args[0] > config.getGlobal().maxDeleting) {
            message.channel.send(`I can't remove more than \`${config.getGlobal().maxDeleting}\` messages.`).then(msg => msg.delete({ timeout: 3 * 1000 }));
            await message.channel.messages.fetch({ limit: ++config.getGlobal().maxDeleting })
                .then( async (messages) => {
                    await message.channel.bulkDelete(messages).catch(err => console.log(err));
                    return message.channel.send(`Cleaned \`${--config.getGlobal().maxDeleting}\` messages!`).then(msg => msg.delete({ timeout: 3 * 1000 }));
                });
            
        }
        else {
            borrar = args[0] + 1;  
            await message.channel.messages.fetch({ limit: ++args[0]})
                .then( async (messages) => {
                    await message.channel.bulkDelete(messages).catch(err => console.log(err));
                    return message.channel.send(`Cleaned \`${--args[0]}\` messages!`).then(msg => msg.delete({ timeout: 3 * 1000 }));
                });
        }
    }
}