module.exports = {
    name: 'clear',
    description: `Remove some messages from the chat!`,
    async execute(message, args, config) {
        if (!args[0] || isNaN(args[0] || args[0] < 1)) {
            message.reply(`You should ${config.prefix}clear {Number between 0 and ${config.maxDeleting}} to run this command correctly`);
            return;
        }
        else if (args[0] > config.maxDeleting) {
            message.channel.send(`I can't remove more than ${config.maxDeleting} messages.`);
            await message.channel.messages.fetch({ limit: config.maxDeleting }).then(messages => {
                message.channel.bulkDelete(messages).catch(err => console.log(err));
            });
            return message.channel.send(`Cleaned \'${config.maxDeleting}\' messages!`);
        }
        borrar = args[0] + 1;  
        await message.channel.messages.fetch({ limit: ++args[0]}).then(messages => {
            message.channel.bulkDelete(messages)}).catch(err => {console.log(err)});
        return message.channel.send(`Cleaned \'${--args[0]}\' messages!`).then(msg => msg.delete({ timeout: 2 * 1000 }));
    }
}