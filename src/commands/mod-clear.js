module.exports = {
    name: 'clear',
    description: `Remove some messages from the chat!`,
    async execute(message, args, config) {
        if (!args[0] || isNaN(args[0] || args[0] < 1)) {
            message.reply(`You should \`${config.prefix}clear {Number between 0 and ${config.maxDeleting}}\` to run this command correctly`);
            return;
        }
        else if (args[0] > config.maxDeleting) {
            message.channel.send(`I can't remove more than \`${config.maxDeleting}\` messages.`).then(msg => msg.delete({ timeout: 5 * 1000 }));
            await message.channel.messages.fetch({ limit: config.maxDeleting }).then( async (messages) => {
                await message.channel.bulkDelete(messages).catch(err => console.log(err));
                return message.channel.send(`Cleaned \`${config.maxDeleting}\` messages!`).then(msg => msg.delete({ timeout: 5 * 1000 }));
            });
            
        }
        borrar = args[0] + 1;  
        await message.channel.messages.fetch({ limit: ++args[0]}).then( async (messages) => {
            await message.channel.bulkDelete(messages).catch(err => console.log(err));
                return message.channel.send(`Cleaned \`${--args[0]}\` messages!`).then(msg => msg.delete({ timeout: 5 * 1000 }));
            });
            
        
    }
}